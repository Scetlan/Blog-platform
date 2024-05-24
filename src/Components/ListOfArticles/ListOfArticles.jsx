import Article from './Article/Article';
import classes from './ListOfArticles.module.scss';
import FooterPagination from '../FooterPagination/FooterPagination';

import { useSelector } from 'react-redux';

function ListOfArticles() {
  const { articles } = useSelector(state => state.fetch);
  return (
    <>
      <ul className={classes.article__list}>
        {articles.map(article => (
          <Article key={article.author.username} user={article} />
        ))}
      </ul>
      <FooterPagination />
    </>
  );
}

export default ListOfArticles;
