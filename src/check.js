var getMessage = function(a, b) {
  var result = '';

  switch (typeof a) {
    case 'boolean':
      result = a ? 'Я попал в ' + b : 'Я никуда не попал';
      break;

    case 'number':
      result = 'Я прыгнул на ' + a * 100 + ' сантиметров';
      break;

    case 'object':
      if (Array.isArray(a) && Array.isArray(b)) {
        var distancePath = a.reduce(function(previousValue, currentValue, i) {
          return previousValue + currentValue * b[i];
        }, 0);

        result = 'Я прошёл ' + distancePath + ' метров';
      } else if (Array.isArray(a)) {
        var numberOfSteps = a.reduce(function(previousValue, currentValue) {
          return previousValue + currentValue;
        }, 0);

        result = 'Я прошёл ' + numberOfSteps + ' шагов';
      }

      break;
  }

  return result;
}
