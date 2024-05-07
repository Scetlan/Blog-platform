import classes from './Header.module.scss';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header className={classes.header__content}>
        <div className={classes.header__container}>
          <Link to={'/articles'} className={classes.header__title}>
            Realworld Blog
          </Link>
          <ul className={classes['header__list-btn']}>
            <li className={classes['header__item-btn']}>
              <Link to={'/sign-in'}>
                <button className={`${classes.header__btn} ${classes.sign__in}`}>Sign In</button>
              </Link>
            </li>
            <li className={classes['header__item-btn']}>
              <Link to={'/sign-up'}>
                <button className={`${classes.header__btn} ${classes.sign__up}`}>Sign Up</button>
              </Link>
            </li>
          </ul>
        </div>
      </header>
      {/* <Outlet /> */}
    </>
  );
}

export default Header;
