import classes from './Header.module.scss';
import { logOut } from '../../Redux/reducer/fetchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

function Header() {
  const { user } = useSelector(state => state.fetch);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <header className={classes.header__content}>
        <div className={classes.header__container}>
          <Link to="articles" className={classes.header__title}>
            Realworld Blog
          </Link>
          <ul className={user ? classes['header__list-btn-try'] : classes['header__list-btn']}>
            {user ? (
              <>
                <li className={classes['header__item-btn']}>
                  <Link to="/new-article">
                    <button aria-label="create new article" className={classes['create-article-btn']}>
                      Create article
                    </button>
                  </Link>
                </li>
                <li className={classNames(classes['header__item-btn'])}>
                  <Link to="/profile" className={classes.user}>
                    <div className={classes['avatar-blog']}>
                      <p className={classes.username}>{user.username}</p>
                      <div className={classes.avatar}>
                        <img
                          src={user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
                          alt="avatar"
                        />
                      </div>
                    </div>
                  </Link>
                </li>
                <li className={classes['header__item-btn']}>
                  <button
                    aria-label="Log out"
                    className={classes['log-out-btn']}
                    onClick={() => {
                      dispatch(logOut());
                      navigate('/');
                    }}
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className={classes['header__item-btn']}>
                  <Link to="/sign-in" className={classNames(classes.header__btn, classes.sign__in)}>
                    Sign In
                  </Link>
                </li>
                <li className={classNames(classes['header__item-btn'])}>
                  <Link to="/sign-up" className={classNames(classes.header__btn, classes.btn__active)}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
      <main className={classes['main-container']}>
        <Outlet />
      </main>
    </>
  );
}

export default Header;
