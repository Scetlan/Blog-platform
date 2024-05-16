import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import classes from './ArticlePage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Article from '../ListOfArticles/Article/Article';
import Markdown from 'marked-react';
import { getArticle } from '../../Redux/reducer/fetchSlice';

export const ArticlePage = () => {
  const dispatch = useDispatch();
  const { article, isError, loading, login } = useSelector(state => state.fetch);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) navigate('/');
    if (!article && !loading) dispatch(getArticle(id));
  }, [id, article, isError, login]);

  return (
    article && (
      <div className={classes['page-container']}>
        <Article user={article} />
        <div className={classes['article-body']}>
          <Markdown>{article.body}</Markdown>
        </div>
      </div>
    )
  );
};
