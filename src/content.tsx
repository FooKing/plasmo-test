import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import SidebarNav from "~sidebar/sidebarNav";
import {useStorage} from "@plasmohq/storage/dist/hook";

export const config: PlasmoCSConfig = {
  matches: ["*://*/*"]
}
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const Sidebar = () => {
  const [theme, setTheme] = useStorage("theme");
  async function TestCopy() {
    let clipboardTxt = await navigator.clipboard.readText();
    console.log(clipboardTxt);
  }

  return (
    <html lang="en" data-theme={theme}>
      <div className="sidebarMainContainer">
        <SidebarNav/>
        <div className="sidebarContentContainer">
          <button className={"btn btn-primary"}>rdfnfresfdfdsfsdsdfdsffdsdns</button> 
        </div>
      </div>
    </html>
  )
}

export default Sidebar
