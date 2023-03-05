import React, { useState } from 'react';
import testData from './test.json';
import { copyFromClipboard, prettyPrintJson, writeToClipboard } from "~Utils/Utils";

const JsonViewer = ({ edit }) => {
  const [jsonData, setJsonData] = useState(null);
  const [updatedJson, setUpdatedJson] = useState(null);

  const handleLoadTest = () => {
    setJsonData(testData);
    setUpdatedJson(null);

  }
  const handleLoadTest2 = async () => {
    let res = await fetch('https://dummyjson.com/products');
    let data = await res.json();
    setJsonData(data);
    setUpdatedJson(null);

  }
  const handleFromClipboard = async () => {
    try {
      const res = await copyFromClipboard()
      if (res) {
        setJsonData(JSON.parse(res));
        setUpdatedJson(null);
      }
    } catch (error) {
      setJsonData("Invalid Json");
    }
  }

  function handleJsonValidate() {
    try {
      if (jsonData) {
        JSON.stringify(jsonData);
        alert('JSON is valid!');
      } else {
        alert('Please enter some JSON first');
      }
    } catch (error) {
      alert('Invalid JSON');
    }
  }

  const handleEditJson = (e) => {
    const newJsonData = e.target.innerText;
    setUpdatedJson(newJsonData);
  }

  async function handleToClipboard() {
    if(updatedJson) {
      await writeToClipboard(updatedJson);
    } else {
      await writeToClipboard(JSON.stringify(jsonData,null,2));
    }
  }

  return (
    <div className="jsonViewerContainer">
      <div className="jsonReplacerHeader">
        <div className="btn-group">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={handleLoadTest}>Get 2D</button>
          <button title="Get the current pages 3d Json" className="btn btn-sm" onClick={handleLoadTest2}>Get 3D</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={handleFromClipboard}>From Clipboard</button>
        </div>
      </div>
      <div className="jsonViewerContent mockup-code">
        {jsonData && (
          <pre spellCheck={false} contentEditable={edit} dangerouslySetInnerHTML={{ __html: prettyPrintJson.toHtml(jsonData) }}
               onInput={handleEditJson} >
          </pre>

        )}
      </div>
      <div className="jsonReplacerHeader">
        <div className="btn-group">
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={handleJsonValidate}>Validate</button>
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={handleLoadTest}>Load Plan</button>
          <button title="Get the current pages 3d Json" className="btn btn-sm" onClick={handleToClipboard}>To Clipboard</button>
        </div>
      </div>
    </div>
  );
}

export default JsonViewer;
