import * as utils from "./Utils"
import {commandMap} from "./consoleCommandMap"
export const fetchData = (request, sender, sendResponse) => {
  fetch(request.url)
    .then(response => response.json())
    .then(data => {
      sendResponse({ data });
    })
    .catch(error => {
      console.error(error);
      sendResponse({ error });
    });
};


export const openInNewTab = ((request, sender, sendResponse) => {
  utils.openInNewTab(request.url)
})
export const openInCurrentTab = ((request, sender, sendResponse) => {
  utils.openInCurrentTab(request.url, request.tabId)
})
export const openOptionsPage = (request, sender, sendResponse) => {
  chrome.runtime.openOptionsPage();
}

export const injectConsoleCommand = async (request, sender, sendResponse) => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let currentTab = await chrome.tabs.query(queryOptions);
  let currentTabId = currentTab[0].id;
  let functionToCall = commandMap.get(request.functionName)
  console.log(currentTabId);
  console.log(request.arguments[0]);
  console.log(request.functionName)
  await chrome.scripting.executeScript({
    target: { tabId: currentTabId },
    world: chrome.scripting.ExecutionWorld.MAIN,
    args: request.arguments,
    func: functionToCall,
  });
};

// func: scriptFuncs[request.methodName],