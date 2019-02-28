/**
 * @param {Number} visit
 * @param {Array} percentages
 * @return {Number} index
 */

function NOD (arr) {
  return arr.reduce(function ( x, y ) {
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

function sumElems (arr) {
  return arr.reduce((result, value) => result + value);
}

export default function splitTestSelector(visit, percentages) {
  //sort percentages
  let values = percentages
  .map((percent, index) => ({
    percent,
    index
  }))
  .sort((a, b) => {
    if (a.percent === b.percent) {
      return a.index - b.index
    }
    if (a.percent < b.percent) {
      return 1
    } else {
      return -1
    }
  });

  let percentagesOverall = sumElems(percentages);
  let usersOnePass = percentagesOverall/NOD(percentages);
  let currentLap = Math.ceil(visit / usersOnePass);
  let currentUser = usersOnePass - ((usersOnePass * currentLap) - visit);
  
  for (let value of values) {
    currentUser -= Math.ceil(usersOnePass * value.percent/percentagesOverall);
    if (currentUser <= 0) {
      return value.index;
    }
  }

  return 0;
}