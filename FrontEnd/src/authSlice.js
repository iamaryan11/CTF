import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "./utils/axiosClient";

// ----------------------------------------------------------------------
// NEW THUNKS
// ----------------------------------------------------------------------

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (verificationData, { rejectWithValue }) => {
    try {
      // Calls the new backend endpoint for OTP verification
      const response = await axiosClient.post(
        "/user/verify-otp",
        verificationData
      );
      // Backend returns user data and token on successful verification/login
      return response.data; 
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);


// ----------------------------------------------------------------------
// EXISTING THUNKS (NO CHANGES REQUIRED)
// ----------------------------------------------------------------------

export const adminRegister = createAsyncThunk(
  "auth/adminRegister",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("user/adminRegister", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (emailData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        "/user/forgot-password",
        emailData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        "/user/reset-password",
        resetData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/signup", userData);
      // Returning response.data.user might be incorrect if the backend returns {message, userId}
      // Ensure your backend returns {message, userId} and update this to return response.data
      return response.data; 
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/login", credentials);
      return response.data.user;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get("/user/check"); 
      return data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(null);
      }
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosClient.post("/user/logout");
      return null;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,

    forgotPasswordMessage: null,
    resetPasswordMessage: null,
    adminRegisterMessage: null,
    
    // NEW: State for OTP verification
    isVerificationPending: false, 
    verificationSuccess: false,   
    verificationMessage: null,    
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },

    clearPasswordMessages: (state) => {
      state.forgotPasswordMessage = null;
      state.resetPasswordMessage = null;
      state.error = null;
    },

    clearAdminRegisterMessage: (state) => {
      state.adminRegisterMessage = null;
      state.error = null;
    },
    
    // NEW: Reducer to clear OTP verification state
    clearVerificationState: (state) => {
        state.verificationSuccess = false;
        state.verificationMessage = null;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
    
      // ----------------------------------
      // NEW: OTP Verification Reducers
      // ----------------------------------
      .addCase(verifyOtp.pending, (state) => {
        state.isVerificationPending = true;
        state.error = null;
        state.verificationSuccess = false;
        state.verificationMessage = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isVerificationPending = false;
        state.isAuthenticated = true; // User is verified and logged in
        state.user = action.payload.user; // Update user state with logged-in user data
        state.verificationSuccess = true;
        state.verificationMessage = action.payload.message;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isVerificationPending = false;
        state.isAuthenticated = false;
        state.user = null;
        state.verificationSuccess = false;
        state.verificationMessage = null;
        state.error = action.payload?.message || "OTP verification failed.";
      })
      
      // ----------------------------------
      // EXISTING REDUCERS
      // ----------------------------------

      .addCase(adminRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.adminRegisterMessage = null;
      })
      .addCase(adminRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.adminRegisterMessage = action.payload;
        state.error = null;
      })
      .addCase(adminRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Admin registration failed.";
        state.adminRegisterMessage = null;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // User is registered but NOT authenticated until OTP is verified
        state.isAuthenticated = false; 
        state.user = null; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || null;
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Logout failed";
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotPasswordMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotPasswordMessage =
          action.payload?.message || "OTP sent successfully.";
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.forgotPasswordMessage = null;
        state.error = action.payload?.message || "Failed to send OTP.";
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetPasswordMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPasswordMessage =
          action.payload?.message || "Password reset successfully.";
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.resetPasswordMessage = null;
        state.error = action.payload?.message || "Failed to reset password.";
      });
  },
});

export const {
  clearAuthError,
  clearPasswordMessages,
  clearAdminRegisterMessage,
  clearVerificationState, // Exporting the new reducer
} = authSlice.actions;

export default authSlice.reducer;