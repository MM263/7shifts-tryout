const add = numbers => {
  if (typeof numbers !== "string") {
    throw new Error(">:( It's not a string, friend!");
  }

  if (numbers.length === 0) {
    return 0;
  }

  let delimiter = ",";

  if (numbers.substring(0, 2) === "//") {
    delimiter = numbers.match(/(?<=\/\/)(.*)(?=\n)/g)[0];
  }

  const result = numbers
    .replace(/\/\/.*\n/g, "")
    .replace(/\n/g, "")
    .split(delimiter)
    .map(number => parseInt(number));

  if (result.some(number => number < 0)) {
    throw new Error(
      `>:( There are some negative numbers: ${result.filter(item => item < 1)}`
    );
  }

  return result.reduce(
    (agg, number) => (number > 1000 ? agg : agg + number),
    0
  );
};

module.exports = add;
