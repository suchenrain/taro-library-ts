import * as BOOK from '@/constants/book-action-type';

import BookAPI from '@/service/api';

type BookType = 'HOT' | 'NEW' | 'RECOMMEND';

type BaseAction = {
  type: string;
  payload: any;
};

/**
 * 不感兴趣 ♥
 * @param id
 * @param bookType
 */
export const disfavorBookById = (
  id: number,
  bookType: BookType
): BaseAction => {
  return {
    type: BOOK.DISFAVOR,
    payload: { id, bookType }
  };
};

/**
 * new books
 */
export const getNewBooks = () => {
  //返回函数，异步dispatch
  return async (dispatch: (param: BaseAction) => void) => {
    let result = await BookAPI.GET('/books/new');
    dispatch({
      type: BOOK.GET_NEW_BOOK,
      payload: { books: result }
    });
  };
};

/**
 * hot books
 */
export const getHotBooks = () => {
  //返回函数，异步dispatch
  return async (dispatch: (param: BaseAction) => void) => {
    let result = await BookAPI.GET('/books/hot');
    dispatch({
      type: BOOK.GET_HOT_BOOK,
      payload: { books: result }
    });
  };
};

/**
 * recommend books
 */
export const getRecommendBooks = () => {
  //返回函数，异步dispatch
  return async (dispatch: (param: BaseAction) => void) => {
    let result = await BookAPI.GET('/books/recommend');
    dispatch({
      type: BOOK.GET_RECOMMEND_BOOK,
      payload: { books: result }
    });
  };
};
