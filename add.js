const getDelimiter = numbers => {
  if (numbers.substring(0, 2) !== "//") {
    return ",";
  }

  const delimiters = numbers.match(/(?<=\/\/)(.*)(?=\n)/g)[0];
  const regexDelimiter = new RegExp(
    delimiters
      .match(/(.)\1*/g)
      .map(delimiter => delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
      .join("|"),
    "g"
  );

  return regexDelimiter;
};

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

module.exports = { add, getDelimiter };
