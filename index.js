/**
 * @param {Number} visit
 * @param {Array} percentages
 * @return {Number} index
 */

class PercentFactory {
  constructor() {
    this.getAvailableIndex = this.getAvailableIndex.bind(this);
  }

  getAvailableIndex(percentages, usersOnePass, percentagesOverall) {
    let index = 0;
    const userShare = percentagesOverall / usersOnePass;
    console.log(userShare)
    console.log(percentages)

    for (let value of percentages) {
      const updatedPercentage = value.currentUsers * userShare;
      if (updatedPercentage < value.percent && (updatedPercentage + userShare) <= value.percent) {
        index = value.index;
        break;
      }
    }
    console.log(percentages)

    // for (let value of percentages) {
    //   if (value.currentPercentage + userShare > value.percent) {
    //     continue;
    //   } else {
    //     index = value.index;
    //     return index;
    //   }
    // }
    return index;
  }

  create(percent, index) {
    return {
      percent,
      currentUsers: 0,
      currentPercentage: 0,
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

  const percentFactory = new PercentFactory(percentagesOverall)

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

  let selectedVariant = 0;
  // return a higher percentage if it first visitor
  if (currentUser === 1) {
    return sortedPercentages[selectedVariant].index;
  }
  // user and percentage distribution
  const initialDistribution = currentUser - 1;
  const userShare = percentagesOverall / initialDistribution;
  let usersRemain = initialDistribution;
  console.log(userShare)
  // console.log(userShare)
  for (let i = 0; i < sortedPercentages.length; i++) {
    const value = sortedPercentages[i];
    const currentUsersLimit = usersOnePass * (value.percent / percentagesOverall);
    let usersRequired = initialDistribution * (value.percent / percentagesOverall);
    usersRequired = Math.ceil(usersRequired)
    if (usersRequired > currentUsersLimit) {
      // 
    }
    console.log(usersRequired)
  }
  // remain user distribution

  console.log(sortedPercentages)

  // for (let i = 0; i < sortedPercentages.length; i++) {

  //   let usersRequired = initialDistribution * (sortedPercentages[i].percent / percentagesOverall)
  //   console.log(usersRequired)
  //   if (i === 0) {
  //     usersRequired = Math.ceil(usersRequired)
  //   } else {
  //     usersRequired = Math.floor(usersRequired)
  //   }

  //   if (usersRemain <= usersRequired) {
  //     sortedPercentages[i].currentUsers = usersRemain
  //     sortedPercentages[i].currentPercentage = userShare * sortedPercentages[i].currentUsers
  //     usersRemain -= usersRequired
  //     break;
  //   } else {
  //     sortedPercentages[i].currentUsers = usersRequired
  //     sortedPercentages[i].currentPercentage = userShare * sortedPercentages[i].currentUsers
  //     usersRemain -= usersRequired
  //   }
  // }
  // if (usersRemain !== 0) {
  //   sortedPercentages[0].currentUsers += usersRemain
  //   sortedPercentages[0].currentPercentage += userShare * usersRemain
  // }

  // return percentFactory.getAvailableIndex(sortedPercentages, usersOnePass, percentagesOverall)
  return 0
}

// console.log(splitTestSelector(4, [50, 25, 25]))
splitTestSelector(4, [50, 25, 25])

// module.exports = splitTestSelector