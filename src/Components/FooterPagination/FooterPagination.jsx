import classes from './Pagination.module.scss';
import { setPage } from '../../Redux/reducer/fetchSlice';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

function FooterPagination() {
  const dispatch = useDispatch();
  const { currentPage, articlesCount } = useSelector(state => state.fetch);
  return (
    <div className={classes['footer-pag']}>
      <Pagination
        defaultCurrent={currentPage}
        total={articlesCount}
        defaultPageSize={5}
        showSizeChanger={false}
        onChange={newPage => dispatch(setPage(newPage))}
      />
    </div>
  );
}

export default FooterPagination;
