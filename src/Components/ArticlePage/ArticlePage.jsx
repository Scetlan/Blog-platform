import classes from './ArticlePage.module.scss';
import Article from '../ListOfArticles/Article/Article';
// import { getArticle } from '../../Redux/reducer/fetchSlice';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Markdown from 'marked-react';
import { getArticle } from '../../Redux/api/Api';

export default function ArticlePage({ article }) {
  const dispatch = useDispatch();
  const { isError, loading, login } = useSelector(state => state.fetch);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(article);

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
}
