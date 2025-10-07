// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.use(cors());

app.use(express.json());

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name 
        && user["job"] === job
    );
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const hardDeleteUser = (id) => {
  const before = users.users_list.length;
  users.users_list = users["users_list"].filter( user => user.id !== id);
  return users.users_list.length < before;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  if (name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name, job);    
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const genId = () => Math.random().toString(36).substring(2, 8);
  const userToAdd = {id: genId(), ...req.body};
  const newUser = addUser(userToAdd);
  res.status(201).json(newUser);;
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const removed = hardDeleteUser(id);
    if (removed) return res.sendStatus(204); // success, no content
    return res.sendStatus(404); //not found
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
