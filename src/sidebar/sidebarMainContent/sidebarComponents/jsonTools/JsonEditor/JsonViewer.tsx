import { re } from "mathjs";

export default function JsonViewer() {


  return(
    <div className="jsonViewerContainer">
      <div className="jsonViewerContent">
        This is the Content
      </div>
      <div className="jsonViewerFooter">
        <div className="btn-group">
          <button className="btn btn-sm">Get 2D Json</button>
          <button className="btn btn-sm">Get 3D Json</button>
          <button className="btn btn-sm">From Clipboard</button>
        </div>
      </div>
    </div>
  )
}