import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "./utils/axiosClient";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));




export const fetchChallenges = createAsyncThunk(
  "questions/fetchChallenges",
  async (_, thunkAPI) => {
    try {

      await delay(1500); 
      const sortedChallenges = initialChallenges.sort(
        (a, b) => a.questionNumber - b.questionNumber
      );
      return sortedChallenges;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to load assignments.",
      });
    }
  }
);

export const solveChallenge = createAsyncThunk(
    "questions/solveChallenge",
    async ({ id, submittedFlag }, thunkAPI) => {
        try {

            const res = await axiosClient.post(`/submit-flag/${id}`, { submittedFlag }); 


            if (res.data.success) {
                return {
                    questionNumber: id,

                    points: res.data.newScore, 
                };
            } else {

                return thunkAPI.rejectWithValue({
                    message: res.data.message || "INCORRECT FLAG: Try again.",
                });
            }
        } catch (error) {

            return thunkAPI.rejectWithValue({
                message: error.response?.data?.message || "Submission failed.",
            });
        }
    }
);



const initialState = {
  challenges: [],
  loading: false,
  error: null,

  lastCompleted: 1,
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {

    clearQuestionError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchChallenges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChallenges.fulfilled, (state, action) => {
        state.loading = false;
        state.challenges = action.payload;

        const completedNumbers = action.payload
          .filter((c) => c.status === "Completed")
          .map((c) => c.questionNumber);

        state.lastCompleted =
          completedNumbers.length > 0 ? Math.max(...completedNumbers) : 0;
      })
      .addCase(fetchChallenges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load assignments.";
      })


      .addCase(solveChallenge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(solveChallenge.fulfilled, (state, action) => {
        state.loading = false;
        const { questionNumber } = action.payload;

        const challenge = state.challenges.find(
          (c) => c.questionNumber === questionNumber
        );
        if (challenge) {
          challenge.status = "Completed";
        }

        state.lastCompleted = Math.max(state.lastCompleted, questionNumber);
      })
      .addCase(solveChallenge.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message ||
          action.error.message ||
          "Unknown challenge submission error.";
      });
  },
});

export const { clearQuestionError } = questionSlice.actions;

export default questionSlice.reducer;