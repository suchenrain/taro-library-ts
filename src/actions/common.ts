export type BookType = 'HOT' | 'NEW' | 'RECOMMEND';

type Payload = {
  id?: number;
  bookType?: BookType;
  books?: any;
};

export type BaseAction = {
  type: string;
  payload: Payload;
};
