import { useSelector } from 'react-redux';
import Article from './Article/Article';
import classes from './ListOfArticles.module.scss';
import FooterPagination from '../FooterPagination/FooterPagination';

function ListOfArticles() {
  const { articles } = useSelector(state => state.fetch);
  console.log(1234);
  return (
    <main>
      <ul className={classes.article__list}>
        {articles.map(article => {
          return <Article key={article.author.username} user={article} />;
        })}
      </ul>
      <FooterPagination />
    </main>
  );
}

export default ListOfArticles;
