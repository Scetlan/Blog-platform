// import { Action, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
  articlesCount: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

function isError(action) {
  return action.type.endsWith('rejected');
}

export const fetchArticles = createAsyncThunk('fetch/fetchArticles', async function (page, { rejectWithValue }) {
  let skipArticles;
  if (page === 1) skipArticles = 0;
  else skipArticles = (page - 1) * 5;
  let options;
  if (window.localStorage.getItem('token')) {
    options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    };
  }
  const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${skipArticles}`, options);
  if (!response.ok) return rejectWithValue('Server Error!');
  const data = await response.json();
  return data;
});

export const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = [];
        state.articlesCount = action.payload.articlesCount;
        state.articles.push(...action.payload.articles);
        state.loading = false;
      })
      .addMatcher(isError, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = fetchSlice.actions;

export default fetchSlice.reducer;