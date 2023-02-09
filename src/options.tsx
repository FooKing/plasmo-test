import { useState } from "react"
import "./style.css"
import { useStorage } from "@plasmohq/storage/dist/hook";
import { themes } from "./options/themes";
function OptionsIndex() {
  const [theme, setTheme] = useStorage("theme", "light")



  function saveTheme(event) {
    setTheme(event.target.value).then(r => console.log("theme Updated"));
  }

  return (
    <html lang={"en"} data-theme={theme}>
    <div className="optionsPanel">
      <h1 className="optionsTitle">
        Options
    </h1>
    <h2 className="optionsThemeHeading"> Theme Settings </h2>
      <div className="divider"></div>
      <select onChange={saveTheme} value={theme} className="select select-primary w-full max-w-xs" title={"Set Theme"}>
        <option disabled>Select a Theme</option>
        {themes.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>

  </div>
    </html>
)
}

export default OptionsIndex