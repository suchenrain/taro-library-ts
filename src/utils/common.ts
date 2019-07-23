import Taro from '@tarojs/taro';

/**
 * transform: 4 => 04
 * @param n
 */
export const formatNumber = (n: number): string => {
  let num = n.toString();
  return num[1] ? num : '0' + num;
};
/**
 * format datetime: yyyy/mm/dd hh:mm:ss
 * @param date
 */
export const formatTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};

export const logError = (name: string, action: any, info: any) => {
  if (!info) {
    info = 'empty';
  }
  let device;
  try {
    let deviceInfo = Taro.getSystemInfoSync();
    device = JSON.stringify(deviceInfo);
  } catch (err) {
    console.error('Not support getSystemInfoSync api', err.message);
  }
  let time: string = formatTime(new Date());

  if (typeof info === 'object') {
    info = JSON.stringify(info);
  }
  console.error(time, name, action, info, device);
};
/**
 * 获取当前页url
 */
export const getCurrentPageUrl = (): string => {
  let pages = Taro.getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let url = currentPage.route;
  return url;
};
