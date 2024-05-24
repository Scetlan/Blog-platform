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

// export const fetchArticles = createAsyncThunk('fetch/fetchArticles', async (page, { rejectWithValue }) => {
//   let skipArticles;
//   if (page === 1) skipArticles = 0;
//   else skipArticles = (page - 1) * 5;
//   let options;
//   if (window.localStorage.getItem('token')) {
//     options = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Token ${window.localStorage.getItem('token')}`,
//       },
//     };
//   }
//   const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${skipArticles}`, options);
//   if (!response.ok) return rejectWithValue('Server Error!');
//   const data = await response.json();
//   return data;
// });

// export const getArticle = createAsyncThunk('fetch/getArticle', async (slug, { rejectWithValue }) => {
//   let options;
//   if (window.localStorage.getItem('token')) {
//     options = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Token ${window.localStorage.getItem('token')}`,
//       },
//     };
//   }

//   const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, options);
//   if (!response.ok) return rejectWithValue('Server Error!');
//   const data = await response.json();
//   return data.article;
// });

// export const registerNewUser = createAsyncThunk('fetch/registerNewUser', async ({ username, email, password }, { rejectWithValue }) => {
//   const user = { username, email, password };
//   const response = await fetch('https://blog.kata.academy/api/users', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ user }),
//   });
//   const data = await response.json();
//   if (!response.ok) {
//     if ('username' in data.errors || 'email' in data.errors) return rejectWithValue(data.errors);
//     return rejectWithValue(data.message);
//   }
//   window.localStorage.setItem('token', data.user.token);
//   window.localStorage.setItem('email', email);
//   window.localStorage.setItem('password', password);
//   return data;
// });

// export const logIn = createAsyncThunk('fetch/logIn', async ({ email, password }, { rejectWithValue }) => {
//   const user = { email, password };
//   const response = await fetch('https://blog.kata.academy/api/users/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Token ${window.localStorage.getItem('token')}`,
//     },
//     body: JSON.stringify({ user }),
//   });
//   const data = await response.json();
//   if (!response.ok) {
//     return rejectWithValue(data.errors['email or password']);
//   }
//   return data;
// });

// export const editProfile = createAsyncThunk('fetch/editProfile', async ({
//   username, email, password, image = null,
// }, { rejectWithValue }) => {
//   const user = {
//     username, email, password, image,
//   };
//   const response = await fetch('https://blog.kata.academy/api/user', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Token ${window.localStorage.getItem('token')}`,
//     },
//     body: JSON.stringify({ user }),
//   });
//   window.localStorage.setItem('email', email);
//   window.localStorage.setItem('password', password);
//   const data = await response.json();
//   if (!response.ok) {
//     if ('username' in data.errors || 'email' in data.errors) return rejectWithValue(data.errors);
//     return rejectWithValue(data.message);
//   }
//   return data;
// });

// export const createNewArticle = createAsyncThunk('fetch/createNewArticle', async ({
//   title, description, body, tagList,
// }, { rejectWithValue }) => {
//   const article = {
//     title, description, body, tagList,
//   };
//   const response = await fetch('https://blog.kata.academy/api/articles', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Token ${window.localStorage.getItem('token')}`,
//     },
//     body: JSON.stringify({ article }),
//   });
//   const data = await response.json();
//   if (!response.ok) {
//     if ('body' in data.errors) return rejectWithValue(data.errors.body);
//     return rejectWithValue(data.message);
//   }
//   return data;
// });

// export const editArticle = createAsyncThunk('fetch/editArticle', async ({ newArticle, slug }, { rejectWithValue }) => {
//   const article = {
//     title: newArticle.title,
//     description: newArticle.description,
//     body: newArticle.body,
//     tagList: newArticle.tagList,
//   };
//   const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Token ${window.localStorage.getItem('token')}`,
//     },
//     body: JSON.stringify({ article }),
//   });
//   const data = await response.json();
//   if (!response.ok) {
//     if ('body' in data.errors) return rejectWithValue(data.errors.body);
//     return rejectWithValue(data.message);
//   }
//   return data;
// });

// export const deleteArticle = createAsyncThunk('fetch/deleteArticle', async (slug, { rejectWithValue }) => {
//   const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Token ${window.localStorage.getItem('token')}`,
//     },
//   });
//   if (!response.ok) {
//     const data = await response.json();
//     return rejectWithValue(data.errors.message);
//   }

//   return undefined;
// });

// export const favoritedArticle = createAsyncThunk('fetch/favoritedArticle', async ({ slug, favorited }, { rejectWithValue }) => {
//   const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
//     method: favorited ? 'DELETE' : 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Token ${window.localStorage.getItem('token')}`,
//     },
//   });
//   const data = await response.json();
//   if (!response.ok) {
//     if ('body' in data.errors) return rejectWithValue(data.errors.body);
//     return rejectWithValue(data.message);
//   }
//   return data;
// });

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
