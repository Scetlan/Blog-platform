import { createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://blog.kata.academy/api/';

export const fetchArticles = createAsyncThunk('fetch/fetchArticles', async (page, { rejectWithValue }) => {
  const skipArticles = page === 1 ? 0 : (page - 1) * 5;
  const token = window.localStorage.getItem('token');
  const options = token
    ? {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    : {};

  try {
    const response = await fetch(`${url}articles?limit=5&offset=${skipArticles}`, options);
    if (!response.ok) return rejectWithValue('Server Error!');
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getArticle = createAsyncThunk('fetch/getArticle', async (slug, { rejectWithValue }) => {
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

  const response = await fetch(`${url}articles/${slug}`, options);
  if (!response.ok) return rejectWithValue('Server Error!');
  const data = await response.json();
  return data.article;
});

export const registerNewUser = createAsyncThunk('fetch/registerNewUser', async ({ username, email, password }, { rejectWithValue }) => {
  const user = { username, email, password };
  const response = await fetch(`${url}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });
  const data = await response.json();
  if (!response.ok) {
    if ('username' in data.errors || 'email' in data.errors) return rejectWithValue(data.errors);
    return rejectWithValue(data.message);
  }
  window.localStorage.setItem('token', data.user.token);
  window.localStorage.setItem('email', email);
  window.localStorage.setItem('password', password);
  return data;
});

export const logIn = createAsyncThunk('fetch/logIn', async ({ email, password }, { rejectWithValue }) => {
  const user = { email, password };
  const response = await fetch(`${url}users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ user }),
  });
  const data = await response.json();
  if (!response.ok) {
    return rejectWithValue(data.errors['email or password']);
  }
  return data;
});

export const editProfile = createAsyncThunk('fetch/editProfile', async ({
  username, email, password, image = null,
}, { rejectWithValue }) => {
  const user = {
    username, email, password, image,
  };
  const response = await fetch(`${url}user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ user }),
  });
  window.localStorage.setItem('email', email);
  window.localStorage.setItem('password', password);
  const data = await response.json();
  if (!response.ok) {
    if ('username' in data.errors || 'email' in data.errors) return rejectWithValue(data.errors);
    return rejectWithValue(data.message);
  }
  return data;
});

export const createNewArticle = createAsyncThunk('fetch/createNewArticle', async ({
  title, description, body, tagList,
}, { rejectWithValue }) => {
  const article = {
    title, description, body, tagList,
  };
  const response = await fetch(`${url}articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ article }),
  });
  const data = await response.json();
  if (!response.ok) {
    if ('body' in data.errors) return rejectWithValue(data.errors.body);
    return rejectWithValue(data.message);
  }
  return data;
});

export const editArticle = createAsyncThunk('fetch/editArticle', async ({ newArticle, slug }, { rejectWithValue }) => {
  const article = {
    title: newArticle.title,
    description: newArticle.description,
    body: newArticle.body,
    tagList: newArticle.tagList,
  };
  const response = await fetch(`${url}articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ article }),
  });
  const data = await response.json();
  if (!response.ok) {
    if ('body' in data.errors) return rejectWithValue(data.errors.body);
    return rejectWithValue(data.message);
  }
  return data;
});

export const deleteArticle = createAsyncThunk('fetch/deleteArticle', async (slug, { rejectWithValue }) => {
  const response = await fetch(`${url}articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${window.localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) {
    const data = await response.json();
    return rejectWithValue(data.errors.message);
  }

  return undefined;
});

export const favoritedArticle = createAsyncThunk('fetch/favoritedArticle', async ({ slug, favorited }, { rejectWithValue }) => {
  const response = await fetch(`${url}articles/${slug}/favorite`, {
    method: favorited ? 'DELETE' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${window.localStorage.getItem('token')}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    if ('body' in data.errors) return rejectWithValue(data.errors.body);
    return rejectWithValue(data.message);
  }
  return data;
});