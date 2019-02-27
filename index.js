/**
 * @param {Number} visit
 * @param {Array} percentages
 * @return {Number} index
 */
export default function splitTestSelector(visit, percentages) {
  //sort percentages
  let exchange;
  for (let i = 0; i < percentages.length; i++) {
    for (let j = 0; j < percentages.length; j++) {
      if (percentages[i] > percentages[j]) {
        exchange = percentages[i];
        percentages[i] = percentages[j];
        percentages[j] = exchange;
      }
    }
  }
  function NOD (arr) {
    return Array.prototype.reduce.call( arr, function ( x, y ) {
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
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }


  let percentagesOverall = sumElems(percentages);
  let usersOnePass = percentagesOverall/NOD(percentages);
  let currentLap = Math.ceil(visit / usersOnePass);
  let currentUser = usersOnePass - ((usersOnePass * currentLap) - visit);

  //надо найти максимального пользователя, которого можно вычесть из текущего, чтобы можно было добавить к следующему 60 20 20 - 3 максимум для 60 и 1 - максимум для 20
  //похоже на правду:
  let index = 0;
  for (let i = 0; i < percentages.length; i++) {
    currentUser -= Math.ceil(usersOnePass * percentages[i]/percentagesOverall);
    if (currentUser <= 0) { //возможно нужно поделить на === и <
      index = i;
      break;
    }
  }

  //не проходит тест из-за того, что ждет на выход несортированный массив.
  //может можно переназначить значения индексов на соответствующие после сортировки (например массив индексов запонять во время сортировки).

  return index;
}