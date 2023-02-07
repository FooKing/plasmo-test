import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import { CountButton } from "~features/count-button"

import "~base.css"

export const config: PlasmoCSConfig = {
  matches: ["*://*/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  async function TestCopy() {
    let clipboardTxt = await navigator.clipboard.readText();
    console.log(clipboardTxt);
  }

  return (
    <div className="collapse">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
        Click me to show/hide content
      </div>
      <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
        <p>hello</p>
        <button className="btn btn-sm btn-primary" onClick={TestCopy}>Woo</button>
      </div>
      <select className="select w-full max-w-xs">
        <option disabled selected>Pick your favorite Simpson</option>
        <option>Homer</option>
        <option>Marge</option>
        <option>Bart</option>
        <option>Lisa</option>
        <option>Maggie</option>
      </select>
    </div>
  )
}

export default PlasmoOverlay
