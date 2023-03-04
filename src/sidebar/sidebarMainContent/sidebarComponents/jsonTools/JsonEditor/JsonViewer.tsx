import React, { useState } from 'react';
import testData from './test.json';
import { copyFromClipboard } from "~Utils/Utils";
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

  const prettyPrintJson = {
    toHtml: (thing) => {
      const htmlEntities = (string) => {
        return string
          .replace(/&/g,   '&amp;')
          .replace(/\\"/g, '&bsol;&quot;')
          .replace(/</g,   '&lt;')
          .replace(/>/g,   '&gt;');
      };
      const replacer = (match, p1, p2, p3, p4) => {
        const part =       { indent: p1, key: p2, value: p3, end: p4 };
        const key =        '<code  class=json-key>';
        const val =        '<code class=json-value>';
        const bool =       '<code class=json-boolean>';
        const str =        '<code class=json-string>';
        const isBool =     ['true', 'false'].includes(part.value);
        const valSpan =    /^"/.test(part.value) ? str : isBool ? bool : val;
        const findName =   /"([\w]+)": |(.*): /;
        const indentHtml = part.indent || '';
        const keyName =    part.key && part.key.replace(findName, '$1$2');
        const keyHtml =    part.key ? key + keyName + '</span>: ' : '';
        const valueHtml =  part.value ? valSpan + part.value + '</span>' : '';
        const endHtml =    part.end || '';
        return indentHtml + keyHtml + valueHtml + endHtml;
      };
      const jsonLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([{}[\],]*)?$/mg;
      return htmlEntities(JSON.stringify(thing, null, 3))
        .replace(jsonLine, replacer);
    }
  };

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
