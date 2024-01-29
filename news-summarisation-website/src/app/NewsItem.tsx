'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsList = ({ topic }) => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = '8efeb6c34f034321b55f068b77649f7f'; 
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&q=${topic}&apiKey=${apiKey}`);
      setNewsArticles(response.data.articles);
    };

    fetchNews();
  }, []);

  const summarizeArticle = async (article = newsArticles[0]) => {
    const geminiApiUrl = 'https://api.gemii.io/v1/generate';
    const apiKey2 = 'AIzaSyD03JSM8hXl4XrU8kFqJwOIswRPfXxfWzc';
    const response = await axios.post(geminiApiUrl, {
      prompt: article.description + 'tell me more about this and summarize that',
      max_tokens: 150, 
      temperature: 0.5, 
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey2}`,
      },
    });
  
    return response.data.generated_text;
  };

    return (
        <div>
        {newsArticles.map((article) => (
            <div key={article.url}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <p>Summary: {summarizeArticle(article)}</p>
            </div>
        ))}
        </div>
    );
    
};

export default NewsList;

