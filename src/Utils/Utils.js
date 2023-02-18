//Verify Link and open url - setting currentTab will open in the current tab, otherwise it will open in a new tab.
export async function openURL(url, tabId, newTab) {
  try {
    let response = await fetch(url)
    if (response.status === 200) {
      if (newTab){
        await chrome.tabs.create({ url: url })
      } else {
        await chrome.tabs.update(tabId, { url: url });
      }
    } else {
      throw new Error(`Failed to fetch URL: ${url}`)
    }
  } catch (error) {
    throw error;
  }
}

//Copy from clipboard and return text, has to happen in a content script.
export async function copyFromClipboard() {
    return await navigator.clipboard.readText();
}

//Write into clipboard, has to happen in a content script.
export async function writeToClipboard(stringToWrite) {
    if (!stringToWrite) {
      console.log("Missing string to write to clipboard");
      return;
    }
    await navigator.clipboard.writeText(stringToWrite);
  }


