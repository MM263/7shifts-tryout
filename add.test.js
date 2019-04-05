const add = require("./add");

test("throws error if you provide a non-string variable", () => {
  const executeAdd = arg => () => {
    add(arg);
  };

  expect(executeAdd()).toThrow();
  expect(executeAdd(1337)).toThrow();
  expect(executeAdd([1, 3, 3, 7])).toThrow();
  expect(executeAdd({})).toThrow();
});

test("throws error if there are negative numbers", () => {
  expect(() => {
    add("1,-2,-3,4");
  }).toThrowError(">:( There are some negative numbers: -2,-3");
});

test("returns 0 if string is empty", () => {
  expect(add("")).toBe(0);
});

test("newlines are ignored", () => {
  expect(add("1,\n3,3\n,7")).toBe(14);
});

test("returns sum of numbers in a string", () => {
  expect(add("1,2")).toBe(3);
  expect(add("1,3,3,7")).toBe(14);
});

test("supports custom delimiters", () => {
  expect(add("//@\n1@3@3@7")).toBe(14);
  expect(add("//$\n1$3$3$7")).toBe(14);
});

test("ignores numbers more than 1000", () => {
  expect(add("1000,1001")).toBe(1000);
});

test("supports arbitrary length custom delimiters", () => {
  expect(add("//$$$$$$$$$\n1$$$$$$$$$3$$$$$$$$$3$$$$$$$$$7")).toBe(14);
});

test("supports multiple delimiters", () => {
  expect(add("//$#%&^\n1$3#3^7")).toBe(14);
});

test("supports multiple custom delimiters of arbitrary length", () => {
  expect(add("//$$$^^^^%%\n1$$$3^^^^3%%7")).toBe(14);
});
