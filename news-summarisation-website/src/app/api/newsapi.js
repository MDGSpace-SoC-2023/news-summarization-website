import axios from 'axios';

const API_KEY = '${process.env.NEWS_API_KEY}'; 
const API_BASE_URL = 'https://newsapi.org/v2/everything';

export const getArticles = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?q=${category}&apiKey=${API_KEY}`);
    const articles = response.data.articles.map((article) => ({
        ...article,
        category: article.source?.category
      }));
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

