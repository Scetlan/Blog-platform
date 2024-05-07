import Header from './Components/Header/Header';
import classes from './App.module.scss';
import ListOfArticles from './Components/ListOfArticles/ListOfArticles';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from './Redux/reducer/fetchSlice';
import { useEffect } from 'react';
import { Spin } from 'antd';

function App() {
  const dispatch = useDispatch();
  const { currentPage, loading, article, articles } = useSelector(state => state.fetch);

  useEffect(() => {
    if (!article && articles.length === 0 && !loading) {
      dispatch(fetchArticles(currentPage));
    }
  }, [currentPage, article, loading]);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={loading ? <Spin size="large" /> : <ListOfArticles />} />
      </Route>
    </Routes>
  );
}

export default App;
