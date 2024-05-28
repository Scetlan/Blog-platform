import Article from './Article/Article';
import classes from './ListOfArticles.module.scss';
import FooterPagination from '../FooterPagination/FooterPagination';
import uniqid from 'uniqid';

import { useDispatch, useSelector } from 'react-redux';
import { clearArticle } from '../../Redux/reducer/fetchSlice';
import { useEffect } from 'react';

function ListOfArticles() {
  const dispatch = useDispatch();
  const { articles, article, loading } = useSelector(state => state.fetch);
  useEffect(() => {
    if (article && !loading) dispatch(clearArticle());
  }, [article, loading]);
  return (
    <>
      <ul className={classes.article__list}>
        {articles.map(article => (
          <Article key={uniqid.time('article-')} user={article} />
        ))}
      </ul>
      <FooterPagination />
    </>
  );
}

export default ListOfArticles;
