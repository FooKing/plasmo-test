import React, { useState } from 'react';
import testData from './test.json';
import { copyFromClipboard, prettyPrintJson, writeToClipboard } from "~Utils/Utils";
const JsonViewer = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleLoadTest = () => {
    setJsonData(testData);
  }
  const handleLoadTest2 = async () => {
    let res = await fetch('https://dummyjson.com/products');
    let data = await res.json();
    setJsonData(data);
  }

  const handleFromClipboard = async () => {
    try {
      let res = await copyFromClipboard()
      if (res) {
        let parsed = JSON.parse(res);
        setJsonData(parsed);
      }
    }catch (error) {
      setJsonData("Invalid Json");
    }
  }


  return(
    <div className="jsonViewerContainer">
      <div className="jsonViewerContent mockup-code">
        {jsonData && (
          <pre dangerouslySetInnerHTML={{__html: prettyPrintJson.toHtml(jsonData)}}></pre>
        )}
        </div>
      <div className="jsonViewerFooter">
        <div className="btn-group">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={handleLoadTest}>Get 2D</button>
          <button title="Get the current pages 3d Json" className="btn btn-sm" onClick={handleLoadTest2}>Get 3D</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={handleFromClipboard}>From Clipboard</button>
        </div>
      </div>
    </div>
  );
}

export default JsonViewer;
