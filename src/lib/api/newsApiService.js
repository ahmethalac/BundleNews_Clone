import axios from 'axios';
import { NEWS_API_KEY } from '../../constants/keys';

const URL = 'https://api.collectapi.com/news/getNews';

export const fetchNews = async (country, tag) => axios.get(`${URL}/top-headlines`, {
    headers: {
        'content-type': 'application/json',
        authorization: NEWS_API_KEY
    },
    params: {
        country,
        tag,
    }
});
