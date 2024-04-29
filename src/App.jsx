import Header from './Components/Header/Header';
import classes from './App.module.scss';
import ListOfArticles from './Components/ListOfArticles/ListOfArticles';

const users = [
  {
    name: 'John Doe',
    date: 'March 5, 2020',
    title: 'Some article title',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat.',
  },
  {
    name: 'John Doe',
    date: 'March 5, 2020',
    title: 'Some article title',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat.',
  },
  {
    name: 'John Doe',
    date: 'March 5, 2020',
    title: 'Some article title',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat.',
  },
];

function App() {
  return (
    <>
      <Header />
      <main className={classes.content}>
        <ListOfArticles users={users} />
      </main>
    </>
  );
}

export default App;
