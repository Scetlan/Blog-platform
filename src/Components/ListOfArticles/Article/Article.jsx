import classes from './Article.module.scss';
import BlogAuthor from './BlogAuthor/BlogAuthor';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { favoritedArticle } from '../../../Redux/api/Api';

function Article(props) {
  const dispatch = useDispatch();
  const { author, createdAt, title, updatedAt, body, tagList, slug, favorited, favoritesCount } = props.user;
  const { article } = useSelector(state => state.fetch);

  const heart = props.user && favorited ? <HeartFilled color="red" /> : <HeartOutlined />;

  return (
    <li className={classes.article__item}>
      <div className={classes.article__content}>
        <div className={classes.article__header}>
          <Link to={`/articles/${slug}`} className={slug ? classes.article__title : classes['article__title-articles']}>
            {title}
          </Link>
          <button
            type="button"
            aria-label="likes"
            className={props.user ? classes['like-active'] : classes.like}
            onClick={() => {
              dispatch(favoritedArticle({ slug, favorited }));
            }}
          >
            {heart}
            {favoritesCount}
          </button>
        </div>
        <ul className={classes['article__list-tags']}>
          {tagList.map(tag =>
            tag !== '' ? (
              <li key={tag} className={classes.item__tag}>
                {tag}
              </li>
            ) : null
          )}
        </ul>
        {body ? <p className={article ? classes['article__desc-markdown'] : classes.article__desc}>{body}</p> : null}
      </div>
      <BlogAuthor author={author} date={createdAt || updatedAt} />
    </li>
  );
}

export default Article;
