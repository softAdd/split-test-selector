/**
 * @param {Number} visit
 * @param {Array} percentages
 * @return {Number} index
 */

class PercentFactory {
  create(percent, index) {
    return {
      percent,
      currentUsers: 0,
      index
    }
  }
}

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

function sumElems(arr) {
  return arr.reduce((result, value) => result + value);
}

function splitTestSelector(visit, percentages) {
  const percentagesOverall = sumElems(percentages);
  const usersOnePass = percentagesOverall / NOD(percentages);
  let currentUser = visit > usersOnePass ? visit % usersOnePass : visit;

  if (currentUser === 0) {
    currentUser = usersOnePass;
  }

  const percentFactory = new PercentFactory()

  let sortedPercentages = percentages
    .map((percent, index) => percentFactory.create(percent, index))
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

  // return a higher percentage if it first visitor
  if (currentUser === 1) {
    return sortedPercentages[0].index;
  }
  // first distribution (n - 1), where 'n' is number of user sought
  const initialDistribution = currentUser - 1;
  let currentSharePercentage = percentagesOverall / initialDistribution
  let usersRemain = initialDistribution

  for (let percentageValue of sortedPercentages) {
    percentageValue.currentUsers = Math.floor(percentageValue.percent / currentSharePercentage)
    usersRemain -= percentageValue.currentUsers
  }

  if (usersRemain > 0) {
    sortedPercentages[0].currentUsers += usersRemain
  }
  // second distribution (n), where 'n' is number of user sought
  currentSharePercentage = percentagesOverall / currentUser
  let increaseIndex = 0;
  
  for (let percentageValue of sortedPercentages) {
    let { currentUsers, percent, index } = percentageValue

    const currentPercentage = currentUsers * currentSharePercentage
    if (currentPercentage + currentSharePercentage <= percent) {
      increaseIndex = index
    }
  }

  return sortedPercentages[increaseIndex].index;
}

// const variants = [33.333, 33.333, 33.333];
// console.log(splitTestSelector(2, variants));

module.exports = splitTestSelector