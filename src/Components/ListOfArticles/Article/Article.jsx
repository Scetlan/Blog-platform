import { Link } from 'react-router-dom';
import classes from './Article.module.scss';
import BlogAuthor from './BlogAuthor/BlogAuthor';
import { useSelector } from 'react-redux';

function Article({ user }) {
  const { author, createdAt, title, updatedAt, body, tagList, slug } = user;
  const { article } = useSelector(state => state.fetch);
  return (
    <li className={classes.article__item}>
      <div className={classes.article__content}>
        <Link to={`/articles/${slug}`} className={classes.article__title}>
          {title}
        </Link>
        <ul className={classes['article__list-tags']}>
          {tagList.map(tag =>
            tag !== '' ? (
              <li key={tag} className={classes.item__tag}>
                {tag}
              </li>
            ) : null
          )}
        </ul>
        {body ? (
          <p className={article ? classes['article__desc-markdown'] : classes['article__desc']}>
            {body}
          </p>
        ) : null}
      </div>
      <BlogAuthor author={author} date={createdAt || updatedAt} />
    </li>
  );
}

export default Article;
