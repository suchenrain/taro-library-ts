import Taro from '@tarojs/taro';
import { BaseOption, HttpMethod } from './common';
import BASE_URL from './config';
import interceptors from './interceptors';

interceptors.map(i => Taro.addInterceptor(i));

const httpRequest = (
  params: any,
  method: HttpMethod = 'GET'
): Promise<Taro.request.Promised<any>> => {
  let { url, data } = params;
  let contentType = 'application/json';
  contentType = params.contentType || contentType;
  const option: BaseOption = {
    url: url.indexOf('http') !== -1 ? url : BASE_URL + url,
    data: data,
    method: method,
    header: {
      'content-type': contentType
    }
  };
  return Taro.request(option);
};

const GET = (url: string, data = '') => {
  let params = { url, data };
  return httpRequest(params);
};

const POST = (url: string, data: any, contentType: any) => {
  let params = { url, data, contentType };
  return httpRequest(params, 'POST');
};

const PUT = (url: string, data = '') => {
  let params = { url, data };
  return httpRequest(params, 'PUT');
};
const DELETE = (url: string, data = '') => {
  let params = { url, data };
  return httpRequest(params, 'DELETE');
};

export default { GET, POST, PUT, DELETE };
