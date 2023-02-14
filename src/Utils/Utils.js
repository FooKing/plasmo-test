//  Verify Link and open in new tab
export function openInNewTab(url) {
  fetch(url)
    .then(response => {
      if (response.status === 200) {
        chrome.tabs.create({
          url: url,
        })
      } else {
        console.error(response.status);
        sendResponse({ success: false });
      }
    })
    .catch(error => {
      console.error(error);
      sendResponse({ success: false });
    });
  return true;
}

//Verify Link and open in the current tab.
export function openInCurrentTab(url, tabId) {
  try {
    fetch(url)
      .then(response => {
        if (response.status === 200) {
          console.log("valid Url");
          chrome.tabs.update({
            url: url,
          });
        } else {
          console.error(response.status);
          sendResponse({ success: false });
        }
      });
  } catch (error) {
    console.error(error);
    sendResponse({ success: false });
  }
  return true;
}

//Copy from clipboard and return text
export async function copyFromClipboard() {
  return await navigator.clipboard.readText();
}

//Write into clipboard
export async function writeToClipboard(stringToWrite) {
  await navigator.clipboard.writeText(stringToWrite).then(r => {
    return r
  });
}

