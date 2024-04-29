import classes from './Article.module.scss';

function Article({ user }) {
  const { name, date, title, tags, text } = user;

  return (
    <li className={classes.article__item}>
      <div className={classes.article__content}>
        <h2 className={classes.article__title}>{title}</h2>
        <ul className={classes['article__list-tags']}>
          {tags.map(tag => (
            <li className={classes.item__tag}>{tag}</li>
          ))}
        </ul>
        <p className={classes['article__desc']}>{text}</p>
      </div>
      <div className={classes.blog__user}>
        <div className={classes.blog__name}>
          <h2 className={classes.blog__title}>{name}</h2>
          <p className={classes.blog__desc}>{date}</p>
        </div>
        <img src="./public/avatar.svg" alt="" />
      </div>
    </li>
  );
}

export default Article;
