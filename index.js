function NOD(arr) {
  return arr.reduce(function (x, y) {
    while (true) {
      if (y === 0)
        return x;

      if (!(x %= y))
        return y;

      if (!(y %= x))
        return x;
    }
  });
}


/**
 * @param {Number} visit
 * @param {Array} percentages
 * @return {Number} index
 */
module.exports = function splitTestSelector(visit, percentages) {
  if (visit < 1) {
    throw new Error("visit can't be < 1")
  }

  const min = Math.min(...percentages.filter(v => v !== 0));
  if (min === Infinity) {
    throw new Error('wrong percentages')
  }

  const sum = percentages.reduce((result, value) => result + value);

  const usersOnePass = sum / NOD(percentages);
  const currentUser = (visit - 1) % usersOnePass;
  const weights = percentages.map(percent => percent / min);
  const scores = [...weights];

  let i = 0;
  while (true) {
    const max = Math.max(...scores);
    if (0 < max) {
      const index = scores.findIndex(score => max === score);
      if (i === currentUser) {
        return index;
      }
      scores[index]--;
      i++;
    } else {
      weights.forEach((weight, index) => scores[index] += weight);
    }
    if (sum < i) {
      throw new Error('Havy cycle');
    }
  }
}
