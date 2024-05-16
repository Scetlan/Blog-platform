import { useSelector } from 'react-redux';
import Article from './Article/Article';
import FooterPagination from '../FooterPagination/FooterPagination';

import classes from './ListOfArticles.module.scss';

function ListOfArticles() {
  const { articles } = useSelector(state => state.fetch);
  return (
    <>
      <ul className={classes.article__list}>
        {articles.map(article => {
          return <Article key={article.author.username} user={article} />;
        })}
      </ul>
      <FooterPagination />
    </>
  );
}

export default ListOfArticles;
