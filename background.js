var allowedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

var contextID = -1;
chrome.input.ime.onFocus.addListener(function(context) {
  contextID = context.contextID;
});
chrome.input.ime.onBlur.addListener(function(context) {
  contextID = -1;
});

function isModdedEvent(keyData) {
  return (
    keyData.ctrlKey || keyData.shiftKey || keyData.altKey || keyData.metaKey
  );
}

chrome.input.ime.onKeyEvent.addListener(function(engineID, keyData) {
  if (
    // If event has modifier key
    isModdedEvent(keyData) ||
    // Or it's not an allowed key
    !allowedKeys.includes(keyData.code)
  ) {
    // Skip it
    return true;
  }

  // Else, let IME do it's work
  return false;
});
