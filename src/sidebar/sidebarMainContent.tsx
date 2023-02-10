
import SidebarMenuItem from "~sidebar/sidebarMainContent/sidebarMenuItem";
import SidebarNav from "~sidebar/sidebarNav";
import Bolt from "~sidebar/sidebarMainContent/sidebarComponents/bolt/Bolt";
const  sidebarContent  = () => {
  function openOptions() {
    chrome.runtime.sendMessage({"action": "openOptionsPage"});
  }


  return (
  <div className="sidebarMainContentContainer">
    <SidebarMenuItem displayName={"Bolt"} component={<Bolt/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Json Tools"} component={<SidebarNav/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Colour Picker"} component={<SidebarNav/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Console Commands"} component={<SidebarNav/>} ></SidebarMenuItem>

  </div>
)

}

export default sidebarContent