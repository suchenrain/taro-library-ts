const devURL: string = 'http://localhost:3000';

const prodURL: string = '';

const BASE_URL = process.env.NODE_ENV === 'development' ? devURL : prodURL;

export default BASE_URL;
