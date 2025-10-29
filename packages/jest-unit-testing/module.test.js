// module.test.js
import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
    let expected = true;
    let got = mut.containsNumbers("0");
    expect(got).toBe(expected);

    expected = false;
    got = mut.containsNumbers("");
    expect(got).toBe(expected);

    expected = false;
    got = mut.containsNumbers(" ");
    expect(got).toBe(expected);

    expected = false;
    got = mut.containsNumbers("hi");
    expect(got).toBe(expected);

    expected = true;
    got = mut.containsNumbers("hi4");
    expect(got).toBe(expected);
})

test('Testing div -- success', () => {
    let expected = 10;
    let got = mut.div(10,1);
    expect(got).toBe(expected);

    expected = -10;
    got = mut.div(10,-1);
    expect(got).toBe(expected);

    expected = 0;
    got = mut.div(0,10);
    expect(got).toBe(expected);

    expected = Infinity;
    got = mut.div(10,0);
    expect(got).toBe(expected);
})