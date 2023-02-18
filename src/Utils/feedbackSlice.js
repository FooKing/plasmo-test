import { createSlice } from "@reduxjs/toolkit";

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbackText: "",
  },
  reducers: {
    setFeedbackText: (state, action) => {
      state.feedbackText = action.payload;
    },
  },
});

export const { setFeedbackText } = feedbackSlice.actions;

export const selectFeedbackText = (state) => state.feedback.feedbackText;

export default feedbackSlice.reducer;
