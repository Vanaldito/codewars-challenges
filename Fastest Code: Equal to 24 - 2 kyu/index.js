function equalTo24(a, b, c, d, e) {
  const validRPN = calculateRPN([], [a, b, c, d, e]);

  if (validRPN === null) {
    return "It's not possible!";
  }

  const stack = [];

  for (const item of validRPN) {
    if (typeof item === "number") {
      stack.push(item.toString());
      continue;
    }

    const number1 = stack.pop();
    const number2 = stack.pop();

    switch (item) {
      case "+":
        stack.push(`(${number1}+${number2})`);
        break;
      case "-":
        stack.push(`(${number1}-${number2})`);
        break;
      case "*":
        stack.push(`(${number1}*${number2})`);
        break;
      case "/":
        stack.push(`(${number1}/${number2})`);
        break;
    }
  }

  const result = stack.pop();
  return result.substring(1, result.length - 1);
}

const operators = ["+", "-", "*", "/"];

function calculateRPNResult(expression) {
  const stack = [];

  for (const item of expression) {
    if (typeof item === "number") {
      stack.push(item);
      continue;
    }

    const number1 = stack.pop();
    const number2 = stack.pop();

    switch (item) {
      case "+":
        stack.push(number1 + number2);
        break;
      case "-":
        stack.push(number1 - number2);
        break;
      case "*":
        stack.push(number1 * number2);
        break;
      case "/":
        stack.push(number1 / number2);
        break;
    }
  }

  return stack.pop();
}

function calculateRPN(expression, missingNumbers) {
  let result;

  const amountOfNumbers = expression.filter(
    item => typeof item === "number"
  ).length;
  const amountOfOperators = expression.filter(
    item => typeof item === "string"
  ).length;

  if (
    missingNumbers.length === 0 &&
    amountOfNumbers - 1 === amountOfOperators
  ) {
    if (calculateRPNResult(expression) === 24) {
      return expression;
    }

    return null;
  }

  if (amountOfNumbers - 1 <= amountOfOperators) {
    for (let i = 0; i < missingNumbers.length; i++) {
      const number = missingNumbers[i];

      result = calculateRPN(
        [...expression, number],
        [...missingNumbers.slice(0, i), ...missingNumbers.slice(i + 1)]
      );

      if (result) return result;
    }

    return null;
  }

  for (let i = 0; i < missingNumbers.length; i++) {
    const number = missingNumbers[i];

    result = calculateRPN(
      [...expression, number],
      [...missingNumbers.slice(0, i), ...missingNumbers.slice(i + 1)]
    );

    if (result) return result;
  }

  for (const operator of operators) {
    result = calculateRPN([...expression, operator], missingNumbers);

    if (result) return result;
  }

  return null;
}

console.time("Running Time");

console.log(equalTo24(1, 9, 2, 2, 3));
console.log(equalTo24(1, 9, 2, 3, 5));

console.timeEnd("Running Time");
