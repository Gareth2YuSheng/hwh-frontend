import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRequest } from "../helpers/httpRequests";

export interface Thread {
  threadId: string;
  title: string;
  content: string;
  commentCount: number;
  authorId: string;
  author: string;
  tagId: string;
  tagName: string;
  createdAt: string;
  updatedAt: string;
  imageURL: string;
}

interface ThreadsState {
  threads: Thread[];
  totalThreads: number;
  isLoading: boolean;
  error: string | null;
  thread: Thread | null;
}

const initialState: ThreadsState = {
  threads: [],
  totalThreads: 0,
  isLoading: false,
  error: null,
  thread: null
}

export const fetchThreadData = createAsyncThunk("thread/fetchThreadData", async ({ token, page, count, tagId, search }: 
  { token: string | undefined, page: number, count: number, tagId: string, search: string }) => {
  let url = `/thread/all?count=${count}&page=${page}`;
  if (tagId != "") {
    url += `&tagId=${tagId}`;
  }
  if (search != "") {
    url += `&search=${search}`;
  }
  try {
    const response = await getRequest(url, {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    const content = await response.json();
    return content.data;
  } catch (err) {
    console.log("Error:", err);
  }
});

export const fetchThreadDetails = createAsyncThunk("thread/fetchThreadDetails", async ({ token, threadId }: 
  { token: string | undefined, threadId: string | undefined }) => {
  try {
    const response = await getRequest(`/thread/${threadId}/details`, {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    const content = await response.json();
    return content.data;
  } catch (err) {
    console.log("Error:", err);
  }
});

export const threadSlice = createSlice({
  name: "thread",
  initialState: initialState,
  reducers: {
    selectThread: (state, action:PayloadAction<{ index: number; }>) => {
      state.thread = state.threads[action.payload.index];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchThreadData.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.threads = action.payload.threads;
        state.totalThreads = action.payload.threadCount;
      })
      .addCase(fetchThreadData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch Threads";
      })
      .addCase(fetchThreadDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchThreadDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch thread details";
      })
      .addCase(fetchThreadDetails.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.thread = action.payload.thread;
      });
  }
});

export const { selectThread } = threadSlice.actions;

export default threadSlice.reducer;