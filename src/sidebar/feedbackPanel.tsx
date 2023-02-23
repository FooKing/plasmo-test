const FeedbackPanel = ({ feedbackText, feedbackProgress }) => {

  return (
    <div className="feedbackPanelContainer">
      <div className="feedbackTextContainer">
        <p>{feedbackText}</p>
      </div>
      <div className="feedbackProgressContainer">
        <div className="radial-progress text-primary" style={{"--value": feedbackProgress, "--size": "3rem", "--thickness": "2px"}}>{feedbackProgress}%</div>
      </div>
    </div>
  );
};

export default FeedbackPanel;