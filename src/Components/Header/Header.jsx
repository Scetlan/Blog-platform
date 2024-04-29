import classes from './Header.module.scss';

function Header() {
  return (
    <header className={classes.header__content}>
      <div className={classes.header__container}>
        <h1 className={classes.header__title}>Realworld Blog</h1>
        <ul className={classes['header__list-btn']}>
          <li className={classes['header__item-btn']}>
            <button className={`${classes.header__btn} ${classes.sign__in}`}>Sign In</button>
          </li>
          <li className={classes['header__item-btn']}>
            <button className={`${classes.header__btn} ${classes.sign__up}`}>Sign Up</button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
