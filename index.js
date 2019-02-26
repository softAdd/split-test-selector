/**
 * @param {Number} visit
 * @param {Array} percentages
 * @return {Number} index
 */
export default function splitTestSelector(visit, percentages) {
  //const seq = (visit - 1) % percentages.length
    // меньшее число, на которое делится на a и b без остатка
    function NOK (arr) {
      let a = Math.abs(arr[0]);
      for (let i = 1; i < arr.length; i++) {
        let b = Math.abs(arr[i]);
        let c = a;
        while (a && b) {
          a > b ? a %= b : b %= a;
        }
        a = Math.abs(c * arr[i] / (a + b))
      }
      return a;
    }
  
    // большее число, которое делит a и b
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

    let nod = NOD(percentages);
    for (let i = 0; i < percentages.length; i++) {
      percentages[i] /= nod;
    }

    let usersOnePass = sumElems(percentages);
    let currentLap = Math.ceil(visit / usersOnePass);
    let currentUser = usersOnePass - ((usersOnePass * currentLap) - visit);

    //самая сложная часть:
    //todo: sort mas from higher

    let index = 0;
    for (let i = 0; i < percentages.length; i++) {
      if (currentUser < percentages[i]) {
        index = i;
        break;
      }
      if (currentUser > percentages[i]) {
        currentUser -= percentages[i];
        continue;
      }
      if (currentUser === percentages[i]) {
        index = i;
        break;
      }
    }
    return index;
}