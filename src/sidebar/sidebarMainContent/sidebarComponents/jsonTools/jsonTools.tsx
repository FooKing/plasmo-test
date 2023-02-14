import React, { useState } from "react";
import {copyFromClipboard} from "~Utils/Utils";
import { openInNewTab } from "~Utils/backgroundMessageHandler";

export default function JsonTools() {

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
  async function handleLoadJson() {
    let clipText = await copyFromClipboard();
    let command = "";
    let argsArray = [];
    if (clipText.startsWith("https://feeder")) {
      command = "set2DJsonByURL";
      argsArray[0] = clipText;
    }
    else{
      command = (`set2DJson`);
      argsArray[0] = clipText;
    }
        chrome.runtime.sendMessage({
          type: "injectConsoleCommand",
          functionName: command,
          arguments: argsArray,
        })
  };

  async function handleGetPlanImages() {
    let clipText = await copyFromClipboard();
    console.log(clipText);
    if(clipText.startsWith("https://feeder")) {
      const parts = clipText.split("/");
      const domain = parts[2]; // should output the feederURL.
      const orderNumberPart = parts[5]; // should output order number with all extra details.
      const orderNumberSplit = orderNumberPart.split("-");
      const orderNumber = orderNumberSplit[0]; // should output clean order number
      const feederPlanImageUrl = `https://${domain}/plan/image/get?planId=${orderNumber}&imageType=PREVIEW_IMAGE&debug=true`;
      console.log(`https://${domain}/plan/image/get?planId=${orderNumber}&imageType=PREVIEW_IMAGE&debug=true`);
      openInNewTab(feederPlanImageUrl);
    }
    else {
      console.log("Not a feeder link")
    }
  };


  async function handleGetJson() {
    let command ="get2DJson"
    await chrome.runtime.sendMessage({
      type: "injectConsoleCommandWithReturn",
      functionName: command,
    })
  };

  async function handleCorniceLoad() {
    let command ="showCornice"
    await chrome.runtime.sendMessage({
      type: "injectConsoleCommandWithReturn",
      functionName: command,
    })
  }
  async function handlePelmetLoad() {
    let command ="showPelmet"
    await chrome.runtime.sendMessage({
      type: "injectConsoleCommandWithReturn",
      functionName: command,
    })
  }
  async function handlePlinthLoad() {
    let command ="showPlinth"
    await chrome.runtime.sendMessage({
      type: "injectConsoleCommandWithReturn",
      functionName: command,
    })
  }

  return (
    <div className="jsonContainer">
      <button className="btn btn-sm btn-wide btn-primary" onClick={handleCorniceLoad}>Show Cornice</button>
      <button className="btn btn-sm btn-wide btn-primary" onClick={handlePelmetLoad}>Show Pelmet</button>
      <button className="btn btn-sm btn-wide btn-primary" onClick={handlePlinthLoad}>Show Plinth</button>
{/*      <button className="btn btn-sm btn-wide btn-primary" onClick={handleLoadJson}>Load Plan Json</button>
      <button className="btn btn-sm btn-wide btn-primary" onClick={handleGetJson}>Get 2D Json</button>
      <button className="btn btn-sm btn-wide btn-primary" onClick={handleGetPlanImages}>Get Plan Images</button>*/}
    </div>
  );
}