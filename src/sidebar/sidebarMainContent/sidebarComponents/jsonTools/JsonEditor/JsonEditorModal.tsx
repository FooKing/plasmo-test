import React, { useState, useEffect } from 'react';
import { copyFromClipboard } from '~Utils/Utils';
import JsonViewer from "~sidebar/sidebarMainContent/sidebarComponents/jsonTools/JsonEditor/JsonViewer";

interface Props {
  hidden: boolean;
  onHiddenChange: (hidden: boolean) => void;
}

export default function JsonEditorModal(props: Props) {
  const { hidden, onHiddenChange } = props;

  function handleHidePanel() {
    onHiddenChange(true);
  }

  return (
    <div>
      <div className={`jsonEditorPanel ${hidden ? 'hidden' : ''}`}>
        <label className="btn btn-sm btn-circle absolute right-3 top-3" onClick={handleHidePanel}>✕</label>
        <div className="tabs jsonEditTabs">
          <a className="tab tab-bordered jsonEditTab tab-active"> Viewer </a>
          <a className="tab tab-bordered jsonEditTab"> Replace </a>
          <a className="tab tab-bordered jsonEditTab"> Editor </a>
        </div>
        <div className="tab1Content">
          <JsonViewer/>
        </div>
      </div>
    </div>
  );
}
