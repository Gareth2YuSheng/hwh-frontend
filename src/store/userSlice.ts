import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../helpers/httpRequests";

export interface User {
  userId: string;
  username: string;
  role: string;
  createdAt: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null
}

export const fetchUserData = createAsyncThunk("user/fetchUserData", async (token: string) => {
  try {
    // const response = await fetch(`http://localhost:8080/account/user`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${token}`
    //   }
    // });
    const response = await getRequest(`/account/user`, {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    const content = await response.json();
    return content.data.user;
  } catch (err) {
    console.log("Error:", err);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        // state.isLoading = true;
        // console.log("Getting user data pending");
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        // state.isLoading = false;
        // console.log("Getting user data fulfilled");
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        // state.isLoading = false;
        // state.error = action.error.message || "Failed to fetch habits";
        // console.log("Getting user data rejected");
      });
  }
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;