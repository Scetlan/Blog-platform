import { useDispatch, useSelector } from 'react-redux';
import classes from './BlogAuthor.module.scss';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteArticle } from '../../../../Redux/api/Api';
import ModalDeleted from './ModalDeleted/ModalDeleted';

function BlogAuthor({ author, date }) {
  const [clicked, setClicked] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { user, article } = useSelector(state => state.fetch);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const creationDate = format(new Date(date), 'MMMM d, yyyy');

  useEffect(() => {
    if (clicked) navigate('edit');
  }, [clicked, deleted]);

  function onClickDeleteYes() {
    dispatch(deleteArticle(article.slug));
    navigate('/');
  }

  function onClickDeleteNo() {
    setDeleted(false);
  }

  function onClickDelete() {
    return deleted ? setDeleted(false) : setDeleted(true);
  }

  return (
    <div className={classes.author}>
      <div className={classes.blog__author}>
        <div className={classes.blog__name}>
          <h2 className={classes.blog__title}>{author.username}</h2>
          <p className={classes.blog__desc}>{creationDate}</p>
        </div>
        <div className={classes.avatar}>
          <img src={author.image} alt="" />
        </div>
      </div>
      {user && user.username === author.username && article && (
        <div className={classes['buttons-container']}>
          {deleted ? <ModalDeleted onClickDeleteYes={onClickDeleteYes} onClickDeleteNo={onClickDeleteNo} /> : null}
          <button aria-label="delete article" className={classes['delete-button']} onClick={onClickDelete}>
            Delete
          </button>
          <button aria-label="edit article" className={classes['edit-button']} onClick={() => setClicked(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogAuthor;
