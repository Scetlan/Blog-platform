import { ReactNode, useEffect } from 'react';
import Markdown from 'marked-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Article } from '../Article';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getArticle } from '../../store/fetchSlice';

import classes from './ArticlePage.module.scss';

export const ArticlePage = () => {
  const dispatch = useD();
  const { article, isError, loading, login } = useAppSelector(state => state.fetch);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) navigate('/');
    if (!article && !loading) dispatch(getArticle(id));
  }, [id, article, isError, login]);

  return (
    article && (
      <div className={classes.pageContainer}>
        <Article {...article} />
        <Markdown>{article.body}</Markdown>
      </div>
    )
  );
};
