function copyText(lang) {
  let textToCopy, range, selection;
  if (lang == 0) {
    textToCopy = document.getElementById('init_code_arm');
  } else {
    textToCopy = document.getElementById('init_code_c')
  }
  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(textToCopy);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(textToCopy);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  document.execCommand('copy');
}
