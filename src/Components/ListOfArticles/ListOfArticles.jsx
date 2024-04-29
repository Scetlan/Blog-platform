import Article from './Article/Article';
import classes from './ListOfArticles.module.scss';

function ListOfArticles({ users }) {
  return (
    <ul className={classes.article__list}>
      {users.map(user => {
        return <Article user={user} />;
      })}
    </ul>
  );
}

export default ListOfArticles;
