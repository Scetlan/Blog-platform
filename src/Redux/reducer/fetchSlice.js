import { createSlice } from '@reduxjs/toolkit';
import { createNewArticle, deleteArticle, editArticle, editProfile, favoritedArticle, fetchArticles, getArticle, logIn, registerNewUser } from '../api/Api';

const initialState = {
  articles: [],
  article: null,
  articlesCount: 0,
  currentPage: 1,
  loading: false,
  isError: null,
  user: null,
  login: false,
};

function isError(action) {
  return action.type.endsWith('rejected');
}

export const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    setPage(state, action) {
      state.articles = [];
      state.currentPage = action.payload;
    },
    logOut(state) {
      state.login = false;
      window.localStorage.clear();
      state.user = null;
    },
    clearError(state) {
      state.isError = null;
    },
    clearArticle(state) {
      state.article = null;
      state.articles = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        window.localStorage.setItem('token', action.payload.user.token);
        state.login = true;
        state.loading = false;
      })
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articlesCount = action.payload.articlesCount;
        state.articles = [];
        state.articles.push(...action.payload.articles);
        state.loading = false;
      })
      .addCase(getArticle.pending, (state) => {
        state.article = null;
        state.loading = true;
        state.isError = null;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.article = { ...action.payload };
        state.loading = false;
      })
      .addCase(registerNewUser.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })

      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.isError = null;
        state.user = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        window.localStorage.setItem('token', action.payload.user.token);
        state.login = true;
        state.loading = false;
      })
      .addCase(createNewArticle.pending, (state) => {
        state.loading = true;
        state.isError = null;
        state.article = null;
      })
      .addCase(createNewArticle.fulfilled, (state, action) => {
        state.article = action.payload.article;
        state.loading = false;
      })
      .addCase(editArticle.pending, (state) => {
        state.loading = true;
        state.isError = null;
        state.article = null;
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.articles = [];
        state.article = action.payload.article;
        state.loading = false;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.articles = [];
        state.article = null;
        state.loading = false;
      })
      .addCase(favoritedArticle.pending, (state) => {
        state.isError = null;
      })
      .addCase(favoritedArticle.fulfilled, (state, action) => {
        // eslint-disable-next-line max-len
        state.articles = state.articles.map((article) => (article.slug === action.payload.article.slug ? action.payload.article : article));
        if (state.article) state.article = action.payload.article;
        state.loading = false;
      })
      .addMatcher(isError, (state, action) => {
        state.loading = false;
        state.isError = action.payload;
      });
  },
});

export const {
  setPage, logOut, clearError, clearArticle,
} = fetchSlice.actions;

export default fetchSlice.reducer;
