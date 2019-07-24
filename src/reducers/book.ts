import { BaseAction } from '@/actions/common';
import * as BookAction from '@/constants/book-action-type';

type Book = {
  id: number;
  title: string;
  isbn: number;
  publisher: string;
  pubdate: string;
  author: string;
  translator: string;
  binding: string;
  price: number;
  pages: number;
  words: number;
  tags: Array<string>;
  score: number;
  review_num: number;
  image: string;
  introduction: string;
  related_books?: Array<Book>;
};
type State = {
  newBooks: Array<Book>;
  hotBooks: Array<Book>;
  recommendBooks: Array<Book>;
};
const defaultState: State = {
  newBooks: [],
  hotBooks: [],
  recommendBooks: []
};

const book = (state: State = defaultState, action: BaseAction): State => {
  switch (action.type) {
    case BookAction.GET_NEW_BOOK:
      return {
        ...state,
        newBooks: state.newBooks.concat(action.payload.books)
      };
    case BookAction.GET_HOT_BOOK:
      return {
        ...state,
        hotBooks: state.hotBooks.concat(action.payload.books)
      };
    case BookAction.GET_RECOMMEND_BOOK:
      return {
        ...state,
        recommendBooks: state.recommendBooks.concat(action.payload.books)
      };
    case BookAction.DISFAVOR:
      switch (action.payload.bookType) {
        case 'NEW':
          return {
            ...state,
            newBooks: state.newBooks.filter(i => i.id != action.payload.id)
          };
        case 'HOT':
          return {
            ...state,
            hotBooks: state.hotBooks.filter(i => i.id != action.payload.id)
          };
        case 'RECOMMEND':
          return {
            ...state,
            recommendBooks: state.recommendBooks.filter(
              i => i.id != action.payload.id
            )
          };
      }
    default:
      return state;
  }
};

export default book;
