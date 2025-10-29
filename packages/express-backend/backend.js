// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js"

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  if (name != undefined && job != undefined) {
    userServices
      .findUserByNameAndJob(name, job)
      .then((result) => (res.send(result)))
      .catch((error) => {
        res.status(500).send(error.name);
      });
  } else {
    userServices
      .getUsers(name, job)
      .then((result) => (res.send(result)))
      .catch((error) => {
        res.status(500).send(error.message);
      });
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userServices
    .findUserById(id)
    .then((result) => {
      if (result) res.send(result);
      else res.status(404).send("Resource not found.");
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.post("/users", (req, res) => {
  const genId = () => Math.random().toString(36).substring(2, 8);
  const userToAdd = {id: genId(), ...req.body};
  userServices
    .addUser(userToAdd)
    .then((result) => res.status(201).json(result))
    .catch((error) => {
      res.status(500).send(error.name);
    });
});



app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    userServices 
      .deleteUserById(id)
      .then((result)=> {
        if (result) res.sendStatus(204);
        else res.sendStatus(404);
      })
      .catch((error) => {
        res.status(500).send(error.name);
      });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
