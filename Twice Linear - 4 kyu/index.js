function dblLinear(n) {
  const byTwo = [1];
  const byThree = [1];

  const sequence = [1];

  while (sequence.length <= n) {
    const generatedByTwo = byTwo[0] * 2 + 1;
    const generatedByThree = byThree[0] * 3 + 1;

    const newElement = Math.min(generatedByTwo, generatedByThree);

    if (newElement === generatedByTwo) {
      byTwo.shift();
    } else {
      byThree.shift();
    }

    byTwo.push(newElement);
    byThree.push(newElement);

    if (newElement !== sequence[sequence.length - 1]) {
      sequence.push(newElement);
    }
  }

  return sequence[n];
}

console.clear();

// console.log(dblLinear(20));

console.log(dblLinear(10) === 22);
console.log(dblLinear(20) === 57);
console.log(dblLinear(30) === 91);
console.log(dblLinear(50) === 175);
console.log(dblLinear(100) === 447);
