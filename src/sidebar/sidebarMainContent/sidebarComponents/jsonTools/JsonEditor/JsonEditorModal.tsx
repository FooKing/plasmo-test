import React, { useState, useEffect } from 'react';
import JsonViewer from "~sidebar/sidebarMainContent/sidebarComponents/jsonTools/JsonEditor/JsonViewer";
import JsonReplacer from "~sidebar/sidebarMainContent/sidebarComponents/jsonTools/JsonEditor/JsonReplacer";

interface Props {
  hidden: boolean;
  onHiddenChange: (hidden: boolean) => void;
}

export default function JsonEditorModal(props: Props) {
  const { hidden, onHiddenChange } = props;
  const [activeTab, setActiveTab] = useState('viewer');

  function handleHidePanel() {
    onHiddenChange(true);
  }

  function handleTabClick(tabName: string) {
    setActiveTab(tabName);
  }

  return (
    <div>
      <div className={`jsonEditorPanel ${hidden ? 'hidden' : ''}`}>
        <label className="btn btn-sm btn-circle absolute right-3 top-3" onClick={handleHidePanel}>✕</label>
        <div className="tabs jsonEditTabs">
          <h1 className={`tab tab-bordered jsonEditTab ${activeTab === 'viewer' ? 'tab-active' : ''}`} onClick={() => handleTabClick('viewer')}> Viewer </h1>
          <h1 className={`tab tab-bordered jsonEditTab ${activeTab === 'replace' ? 'tab-active' : ''}`} onClick={() => handleTabClick('replace')}> Replace </h1>
          <h1 className={`tab tab-bordered jsonEditTab ${activeTab === 'editor' ? 'tab-active' : ''}`} onClick={() => handleTabClick('editor')}> Editor </h1>
        </div>
        <div className="jsonContentContainer">
          <div className={`tabContent ${activeTab === 'viewer' ? 'active' : ''}`}>
            <JsonViewer edit={false}/>
          </div>
          <div className={`tabContent ${activeTab === 'replace' ? 'active' : ''}`}>
            <JsonReplacer/>
          </div>
          <div className={`tabContent ${activeTab === 'editor' ? 'active' : ''}`}>
            <JsonViewer edit={true}/>
          </div>
        </div>
      </div>
    </div>
  );
}


