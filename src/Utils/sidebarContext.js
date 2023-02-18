import { createContext } from 'react';

export const FeedbackContext = createContext({
  feedbackText: '',
  setFeedbackText: (text) => {},
});