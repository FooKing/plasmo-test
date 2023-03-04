import React, { useState } from 'react';
import testData from './test.json';
import testData2 from './test2.json';
import { copyFromClipboard, prettyPrintJson, writeToClipboard } from "~Utils/Utils";
const JsonReplacer = () => {
  const [leftJson, setLeftJson] = useState(null);
  const [rightJson, setRightJson] = useState(null);

  const handleLoadTest = () => {
    setLeftJson(testData);
  }
  const handleLoadTest2 = async () => {
    setRightJson(testData2);
  }

  const handleFromClipboard = async () => {

  }
  const handleToClipboard = async (isLeft) => {
    if(isLeft){
      await writeToClipboard(JSON.stringify(leftJson));
    }
    else {
      await writeToClipboard(JSON.stringify(rightJson));
    }
  }



  function handleReplaceLeft() {
    if (leftJson && rightJson) {
      const newPlan = {
        ...leftJson.plan,
        leadId: rightJson.plan.leadId ?? leftJson.plan.leadId,
        email: rightJson.plan.email ?? leftJson.plan.email,
        accountId: rightJson.plan.accountId ?? leftJson.plan.accountId,
        planId: rightJson.plan.planId ?? leftJson.plan.planId
      };
      const newLeftJson = {
        ...leftJson,
        plan: newPlan
      };
      setLeftJson(newLeftJson);
    }
  }

  function handleReplaceRight() {
    if (leftJson && rightJson) {
      const newPlan = {
        ...rightJson.plan,
        leadId: leftJson.plan.leadId ?? rightJson.plan.leadId,
        email: leftJson.plan.email ?? rightJson.plan.email,
        accountId: leftJson.plan.accountId ?? rightJson.plan.accountId,
        planId: leftJson.plan.planId ?? rightJson.plan.planId
      };
      const newRightJson = {
        ...rightJson,
        plan: newPlan
      };
      setRightJson(newRightJson);
    }
  }


  return(
    <div className="jsonReplacerContainer">
      <div className="jsonReplacerHeader">
        <div className="btn-group grp-left">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={handleLoadTest}>Get 2D</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={handleFromClipboard}>From Clipboard</button>
        </div>
        <div className="btn-group grp-right">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={handleReplaceLeft}> ← </button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={handleReplaceRight}> → </button>
        </div>
        <div className="btn-group grp-right">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={handleLoadTest2}>Get 2D</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={handleFromClipboard}>From clipboard</button>
        </div>
      </div>
      <div className="jsonReplacerContents ">
        <div className="jsonReplacerContent mockup-code">
          <pre dangerouslySetInnerHTML={{__html: prettyPrintJson.toHtml(leftJson)}}></pre>
        </div>
        <div className="jsonReplacerContent mockup-code">
          <pre dangerouslySetInnerHTML={{__html: prettyPrintJson.toHtml(rightJson)}}></pre>
        </div>
      </div>
      <div className="jsonReplacerHeader">
        <div className="btn-group grp-left">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={handleLoadTest}>Load Json</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={() => handleToClipboard(true)}>To Clipboard</button>

        </div>
        <div className="btn-group grp-right">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={handleLoadTest2}>Load Json</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={() => handleToClipboard(false)}>To Clipboard</button>

        </div>
      </div>
    </div>
  );
}

export default JsonReplacer;
