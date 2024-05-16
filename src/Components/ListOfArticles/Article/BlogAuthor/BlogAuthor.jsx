import { format } from 'date-fns';
import classes from './BlogAuthor.module.scss';

const BlogAuthor = ({ author, date }) => {
  const creationDate = format(new Date(date), 'MMMM d, yyyy');
  return (
    <div className={classes.blog__author}>
      <div className={classes.blog__name}>
        <h2 className={classes.blog__title}>{author.username}</h2>
        <p className={classes.blog__desc}>{creationDate}</p>
      </div>
      <div className={classes.avatar}>
        <img src={author.image} alt="" />
      </div>
    </div>
  );
};

export default BlogAuthor;
