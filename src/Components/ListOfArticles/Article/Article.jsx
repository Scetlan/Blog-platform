import { Link } from 'react-router-dom';
import classes from './Article.module.scss';

function Article({ user }) {
  const { author, createdAt, title, updatedAt, body, tagList, slug } = user;

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
        {body ? <p className={classes['article__desc']}>{body}</p> : null}
      </div>
      <div className={classes.blog__user}>
        <div className={classes.blog__name}>
          <h2 className={classes.blog__title}>{author.username}</h2>
          <p className={classes.blog__desc}>{createdAt}</p>
        </div>
        <div className={classes.avatar}>
          <img src={author.image} alt="" />
        </div>
      </div>
    </li>
  );
}

export default Article;
