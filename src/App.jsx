import Header from './Components/Header/Header';
import classes from './App.module.scss';
import ListOfArticles from './Components/ListOfArticles/ListOfArticles';
import { Route, Router, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from './Redux/reducer/fetchSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const { currentPage } = useSelector(state => state.fetch);

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [currentPage, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Header />} />
      <Route index element={<ListOfArticles />} />
    </Routes>
  );
}

export default App;
