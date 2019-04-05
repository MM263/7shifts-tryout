# 7shifts Tryout

`npm install` - to install Jest
`npm run test` - to run tests

---

There is a thing, that I think I could do better in terms of pure optimization - we right now we are mapping an array and then we are reducing it. There is no need to loop through an array twice, the best option would be to reduce it right away and run `parseInt` on each number right there, but we would sacrifice our ability to display all numbers that disobey rule 4.

To solve it I would offer displaying only the first offending number in the error that we throw and if we do that our function would look like this:

```js
const add = numbers => {
  if (typeof numbers !== "string") {
    throw new Error(">:( It's not a string, friend!");
  }

  if (numbers.length === 0) {
    return 0;
  }

  const result = numbers
    .replace(/\/\/.*\n/g, "")
    .replace(/\n/g, "")
    .split(getDelimiter(numbers))
    .reduce((agg, number) => {
      const parsedNumber = parseInt(number);

      if (parsedNumber < 0) {
        throw new Error(`>:( There is a negative number: ${parsedNumber}`);
      }

      return parsedNumber > 1000 ? agg : agg + parsedNumber;
    }, 0);

  return result;
};
```
