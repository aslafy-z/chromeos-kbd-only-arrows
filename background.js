var contextId = -1;
chrome.input.ime.onFocus.addListener(function(context) {
  contextId = context.contextID;
});

var allowedKeys = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
];

chrome.input.ime.onKeyEvent.addListener(function(engineID, keyData) {
  if (keyData.type == 'keydown' && allowedKeys.includes(keyData.code)) {
    chrome.input.ime.sendKeyEvents({'contextID': contextId, 'keyData': [keyData]});
  }

  return true;
});
