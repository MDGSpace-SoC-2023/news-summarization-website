// src/services/newsService.js
import axios from 'axios';

const apiKey = '8efeb6c34f034321b55f068b77649f7f';
const apiUrl = 'https://newsapi.org/v2/everything';

const getNews = async (category = 'politics') => {
    try {
        const response = await axios.get(`${apiUrl}?q=${category}&language=en&apiKey=${apiKey}`);
        return response.data.articles;
      } catch (error) {
        console.error('Error fetching news by topic:', error);
        return [];
      }
};

export { getNews };
