
function getMessage(a, b) {
if ( typeof a === 'boolean'){
  if (a === true){
      return 'Я попал в ' + b;
  } else {
      return 'Я никуда не попал';
  }
}
else if ( typeof a === 'number'){
      return 'Я прыгнул на ' + a*100 + ' сантиметров';
}
else if ( typeof a === 'object', typeof b != 'object'){
  var arrayNumber = 0;
  for (var i = 0; i < a.length; i++) {
    arrayNumber += a[i];
  }
      return 'Я прошёл '+ arrayNumber + ' шагов';
}
else if ( typeof a === 'object', typeof b === 'object'){
  var arrayMultiplication = 0;
  for (var i = 0; i < a.length; i++) {
    arrayMultiplication += a[i] * b[i];
  }
      return 'Я прошёл ' + arrayMultiplication + ' метров';
}
}
getMessage();
