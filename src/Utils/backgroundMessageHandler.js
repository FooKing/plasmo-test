import * as utils from "./Utils"
import {commandMap} from "./consoleCommandMap"
import { writeToClipboard } from "./Utils";
export const fetchData = async (request, sender, sendResponse) => {
  try {
    const response = await fetch(request.url);
    const jsonResponse = await response.json();
    sendResponse({ jsonResponse });
  } catch(err) {
    console.error(err);
    sendResponse({ err });
  }
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

export const BG_get2DJson = async (request, sender, sendResponse) => {
  try {  let queryOptions = { active: true, lastFocusedWindow: true };
    let currentTab = await chrome.tabs.query(queryOptions);
    let currentTabId = currentTab[0].id;
    let functionToCall = commandMap.get(request.functionName)
    console.log(request.functionName)
    let outerResult = await chrome.scripting.executeScript({
      target: { tabId: currentTabId },
      world: chrome.scripting.ExecutionWorld.MAIN,
      args: request.arguments,
      func: functionToCall,
    });
    if (!outerResult) throw new Error("Missing 2d JSON result");
    console.log(outerResult[0].result);
    await writeToClipboard(outerResult[0].result);
  } catch(err) {
    console.error(err);
  }
};

export const BG_get3DJson = async (request, sender, sendResponse) => {
  try {  let queryOptions = { active: true, lastFocusedWindow: true };
    let currentTab = await chrome.tabs.query(queryOptions);
    let currentTabId = currentTab[0].id;
    let functionToCall = commandMap.get(request.functionName)
    console.log(request.functionName)
    let outerResult = await chrome.scripting.executeScript({
      target: { tabId: currentTabId },
      world: chrome.scripting.ExecutionWorld.MAIN,
      args: request.arguments,
      func: functionToCall,
    });
    if (!outerResult) throw new Error("Missing 3d JSON result");
    console.log(outerResult[0].result);
    await writeToClipboard(outerResult[0].result);
  } catch(err) {
    console.error(err);
  }
};

export function handleInjectionCallback(results){
  console.log(results)
}