import React, { useState } from "react";

export default function Bolt() {
  const [selectedTab, setSelectedTab] = useState("tab1");

  return (
    <div className="boltContainer">
      <div className="tabs boltTabList">
        <a className={`tab boltTabItem tab-bordered ${selectedTab === "frontendTab" ? "active" : ""}`} onClick={() => setSelectedTab("tab1")}>Frontend</a>
        <a className={`tab boltTabItem tab-bordered ${selectedTab === "runDeckTab" ? "active" : ""}`} onClick={() => setSelectedTab("tab2")}>Rundeck</a>
        <a className={`tab boltTabItem tab-bordered ${selectedTab === "jenkinsTab" ? "active" : ""}`} onClick={() => setSelectedTab("tab3")}>Jenkins</a>
      </div>
      <div className="boltContentPanel">
        {selectedTab === "frontendTab" && <div>
          Frontend Content
        </div>}
        {selectedTab === "runDeckTab" && <div>
          Rundeck content
        </div>}
        {selectedTab === "jenkinsTab" && <div>
          Jenkins content
        </div>}
      </div>
    </div>
  );
}