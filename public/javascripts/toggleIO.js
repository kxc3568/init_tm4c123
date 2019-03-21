function toggleIO(value, id) {
  value = parseInt(value, 10);
  var toggleElement = document.getElementById(id);
  if (value == 0) {
    toggleElement.classList.remove('input');
    toggleElement.classList.add('output');
    toggleElement.value = 1;
    console.log('1');
  } else if (value == 1) {
    toggleElement.classList.remove('output');
    toggleElement.classList.add('none');
    toggleElement.value = 2;
    console.log('2');
  } else if (value == 2) {
    toggleElement.classList.remove('none');
    toggleElement.classList.add('input');
    toggleElement.value = 0;
    console.log('0');
  }
}
