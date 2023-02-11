import React, { useState } from "react";
import {copyFromClipboard} from "~Utils/Utils";

export default function JsonTools() {

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
  async function handleLoadJson() {
    let clipText = await copyFromClipboard();
    let command = "";
    let argsArray = [];
    if (clipText.startsWith("https://feeder")) {
      command = (`set2DJsonByUrl("${clipText}")`);
      argsArray[0] = clipText;
    }
    else{
      const preparedJSON = JSON.stringify(clipText)
      command = (`set2DJson`);
      argsArray[0] = preparedJSON;
    }
        chrome.runtime.sendMessage({
          type: "injectConsoleCommand",
          functionName: command,
          args: argsArray,
        })
  }




  return (
    <div className="jsonContainer">
      <button className="btn btn-sm btn-primary" onClick={handleLoadJson}>Load Plan Json</button>
    </div>
  );
}