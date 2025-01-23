import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../helpers/httpRequests";

export interface Tag {
  tagId: string;
  name: string;
}

interface TagState {
  tags: Tag[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TagState = {
  tags: [],
  isLoading: false,
  error: null
}

export const fetchTagData = createAsyncThunk("tag/fetchTagData", async (token : string | undefined) => {
  try {
    const response = await getRequest(`/tag/all`, {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    const content = await response.json();
    return content.data;
  } catch (err) {
    console.log("Error:", err);
  }
});

export const tagSlice = createSlice({
  name: "tag",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTagData.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.tags = action.payload.tags;
      })
      .addCase(fetchTagData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch Tag";
      });
  }
});

export const {  } = tagSlice.actions;

export default tagSlice.reducer;