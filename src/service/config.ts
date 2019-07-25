const devURL: string = 'http://localhost:3000';

const prodURL: string = 'https://gulp-mock-now.suchenxiaoyu.now.sh';

const BASE_URL = process.env.NODE_ENV === 'development' ? devURL : prodURL;

export default BASE_URL;
