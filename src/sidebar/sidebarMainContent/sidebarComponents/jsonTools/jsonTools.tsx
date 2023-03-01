import { copyFromClipboard, openURL, writeToClipboard } from "~Utils/Utils";
import {FeedbackContext} from "~Utils/sidebarContext";
import JsonEditorModal from "~sidebar/sidebarMainContent/sidebarComponents/jsonTools/JsonEditor/JsonEditorModal";
import { useContext, useState } from "react";
import ReactDOM from "react-dom";

export default function JsonTools() {
  const { setFeedbackText } = useContext(FeedbackContext);
    const [isJsonEditorVisible, setIsJsonEditorVisible] = useState(true);
  async function handleLoadJson() {
    let clipText = await copyFromClipboard();
    if (!clipText) {
      setFeedbackText("failed to get clipboard");
      return;
    }
    let command;
    let argsArray = [];
    if (clipText.startsWith("https://feeder")) {
      command = "set2DJsonByURL";
      argsArray[0] = clipText;
    }
    else{
      command = (`set2DJson`);
      argsArray[0] = clipText;
    }
        await chrome.runtime.sendMessage({
          type: "BG_injectConsoleCommand",
          functionName: command,
          arguments: argsArray,
        })
  }

  async function handleGetPlanImages() {
    try{
    let clipText = await copyFromClipboard();
    if (!clipText) {
      console.log("failed to get clipboard");
      return;
    }
    if(clipText.startsWith("https://feeder")) {
      const parts = clipText.split("/");
      const domain = parts[2]; // should output the feederURL.
      const orderNumberPart = parts[5]; // should output order number with all extra details.
      const orderNumberSplit = orderNumberPart.split("-");
      const orderNumber = orderNumberSplit[0]; // should output clean order number
      const feederPlanImageUrl = `https://${domain}/plan/image/get?planId=${orderNumber}&imageType=PREVIEW_IMAGE&debug=true`;
      console.log(`https://${domain}/plan/image/get?planId=${orderNumber}&imageType=PREVIEW_IMAGE&debug=true`);
      await openURL(`https://${domain}/plan/image/get?planId=${orderNumber}&imageType=PREVIEW_IMAGE&debug=true`,"", true);

    }
    else {
      setFeedbackText("Not a valid plan link");
    }
}catch (error) {
      setFeedbackText(error.message);
  }}

  async function handleGet2DJson() {
    let command ="get2DJson"
    let response = await chrome.runtime.sendMessage({
      type: "BG_get2DJson",
      functionName: command,
    })
    if (response){
      let stringJson = JSON.stringify(response);
      await writeToClipboard(stringJson);
    }
    else{
      setFeedbackText("No 2d Json");
    }
  }

  async function handleGet3DJson() {
    let command ="get3DJson"
    let response = await chrome.runtime.sendMessage({
      type: "BG_get3DJson",
      functionName: command,
    })
    if (response){
    await writeToClipboard(response);
  }
    else{
      console.warn("No 3D Json")
      setFeedbackText("No 3d Json");
    }
  }


  async function handleTestFetch() {
    let command = "get2DJson"
    let response = await chrome.runtime.sendMessage({
      type: "BG_savePlanJson",
      functionName: command,
    })
    if (response){
      console.log(response)
    }

  }

  function handleJsonEditorPanel() {
    setIsJsonEditorVisible(!isJsonEditorVisible);
  }

  return (
    <div className="jsonContainer">
      <JsonEditorModal hidden={!isJsonEditorVisible} />
      <button className="btn btn-sm btn-wide btn-primary" onClick={handleLoadJson}>Load Plan Json</button>
      <button className="btn btn-sm btn-wide btn-primary" onClick={handleGet2DJson}>Get 2D Json</button>
      <button className="btn btn-sm btn-wide btn-primary" onClick={handleGet3DJson}>Get 3D Json</button>
      <button className="btn btn-sm btn-wide btn-primary" onClick={handleGetPlanImages}>Get Plan Images</button>
      <button className="btn btn-sm btn-wide btn-primary" onClick={handleTestFetch}>Test Fetch</button>
      <button className="btn btn-sm btn-wide btn-primary" onClick={handleJsonEditorPanel}>Test Fetch</button>
    </div>
  );
}

