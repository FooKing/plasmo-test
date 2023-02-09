export {}
console.log('background loaded');

chrome.runtime.onMessage.addListener(function(message) {
  switch (message.action) {
    case "openOptionsPage":
      openOptionsPage();
      break;
    default:
      break;
  }
});

function openOptionsPage(){
  chrome.runtime.openOptionsPage();
}