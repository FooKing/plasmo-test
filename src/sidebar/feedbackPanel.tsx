import react, { useState } from "react";
import { useStorage } from "@plasmohq/storage/dist/hook";
const  FeedbackPanel  = ({feedbackText}) => {


  return (
    <div className="feedbackPanelContainer">
      <div className="feedbackTextContainer">
        <p className="feedbackText"> {feedbackText} </p>
      </div>

    </div>
  )

}

export default FeedbackPanel