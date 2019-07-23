export type HttpMethod =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';

export type BaseOption = {
  url: string;
  method: HttpMethod;
  data?: any;
  header?: any;
};
