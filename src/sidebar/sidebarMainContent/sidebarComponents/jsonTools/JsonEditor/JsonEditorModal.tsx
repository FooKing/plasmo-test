import React, { useState } from 'react';
import { copyFromClipboard } from '~Utils/Utils';

interface JsonEditorDataProps {
  data: Record<string, any>;
}

interface Props {
  hidden: boolean;
}

function JsonEditorData(props: JsonEditorDataProps) {
  const { data } = props;

  const [nodeState, setNodeState] = useState<{ [key: string]: boolean }>(() => {
    const initialState: { [key: string]: boolean } = {};

    function traverse(obj: any, path: string[] = []) {
      if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach((key) => traverse(obj[key], path.concat(key)));
      } else {
        initialState[path.join('.')] = false;
      }
    }

    traverse(data);

    return initialState;
  });

  const toggleNode = (key: string) => { 
    setNodeState((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };
  const renderNode = (key: string, value: any, depth: number, isOpen: boolean, toggleOpen: () => void) => {
    const indent = `${depth * 20}px`;

    if (typeof value === 'object' && value !== null) {
      const hasChildren = Object.keys(value).length > 0;
      const arrowStyle = {
        display: hasChildren ? 'inline-block' : 'none',
        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 0.15s ease-out',
        width: '1em',
        height: '1em',
      };

      return (
        <li key={key} style={{ paddingLeft: indent }}>
          <label htmlFor={key} onClick={hasChildren ? toggleOpen : undefined} style={{ cursor: hasChildren ? 'pointer' : 'default', display: 'flex', alignItems: 'center' }}>
            <span style={arrowStyle}>{hasChildren ? '>' : ''}</span>
            <span style={{ marginLeft: '0.5em' }}>{key}</span>
          </label>
          {!isOpen && <ul />}
          {isOpen && (
            <ul>
              {Object.entries(value).map(([subkey, subvalue]) =>
                renderNode(subkey, subvalue, depth + 1, nodeState[subkey] ?? true, () => toggleNode(subkey))
              )}
            </ul>
          )}
        </li>
      );
    }

    return (
      <li key={key} style={{ paddingLeft: indent }}>
        <label htmlFor={key} style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: '20px' }} />
          <span style={{ marginLeft: '0.5em' }}>{key}: </span>
          <span>{String(value)}</span>
        </label>
      </li>
    );
  };

  return (
    <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
      {Object.entries(data).map(([key, value]) =>
        renderNode(key, value, 0, nodeState[key] ?? false, () => toggleNode(key))
      )}
    </ul>
  );
}

export default function JsonEditorModal(props: Props) {
  const [jsonData, setJsonData] = useState<Record<string, any> | null>(null);
  const { hidden } = props;

  const handleLoadJson = async () => {
    try {
      const json = await copyFromClipboard();
      const parsed = JSON.parse(json);

      setJsonData(parsed);
    } catch (err) {
      console.error(`Error parsing clipboard JSON data: ${err.message}`);
    }
  };


  return (
    <div>
      <button className="btn btn-sm btn-wide btn-primary" onClick={handleLoadJson}>
        Load Plan Json
      </button>
      <div className={`jsonEditorPanel ${hidden ? '' : 'hidden'}`}>
        <div className="tabs">
          <a className="tab tab-bordered">
            Replace
          </a>
          <a className="tab tab-bordered">Drag Elements</a>
        </div>
        <div className="tab1Content">
          {jsonData && <JsonEditorData data={jsonData} />}
          {!jsonData && <div>Click "Load Plan Json" to load JSON data from the clipboard.</div>}
        </div>
        <button className="closeButton" >
          X
        </button>
      </div>
    </div>
  );
}