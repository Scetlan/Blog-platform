import Header from './Components/Header/Header';
import classes from './App.module.scss';
import ListOfArticles from './Components/ListOfArticles/ListOfArticles';
import CreatingAccountForm from './Components/Forms/CreatingAccountForm/CreatingAccountForm';
import SignInForm from './Components/Forms/SignInForm/SignInForm';
import EditForm from './Components/Forms/EditForm/EditForm';
import ArticleForm from './Components/Forms/ArticleForm/ArticleForm';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import ArticlePage from './Components/ArticlePage/ArticlePage';
import { fetchArticles, logIn } from './Redux/api/Api';

function App() {
  const dispatch = useDispatch();
  const { currentPage, loading, article, articles } = useSelector(state => state.fetch);

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      const user = {
        email: window.localStorage.getItem('email') || '',
        password: window.localStorage.getItem('password') || '',
      };
      dispatch(logIn(user));
    }
  }, []);

  useEffect(() => {
    if (!article && articles.length === 0 && !loading) {
      dispatch(fetchArticles(currentPage));
    }
  }, [currentPage, article, loading]);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={loading ? <Spin size="large" className={classes['spin-list']} /> : <ListOfArticles />} />
        <Route
          path="articles"
          element={loading ? <Spin size="large" className={classes['spin-list']} /> : <ListOfArticles />}
        />
        <Route
          path="articles/:id"
          element={loading ? <Spin size="large" className={classes['spin-list']} /> : <ArticlePage article={article} />}
        />
        <Route path="articles/:id/edit" element={<ArticleForm isEdit />} />
        <Route path="sign-up" element={<CreatingAccountForm />} />
        <Route path="sign-in" element={<SignInForm />} />
        <Route path="profile" element={<EditForm />} />
        <Route path="new-article" element={<ArticleForm isEdit={false} />} />
      </Route>
    </Routes>
  );
}

// ma@ma.com

export default App;
