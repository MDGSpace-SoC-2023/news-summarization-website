'use client'
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';
import { useEffect } from 'react';
import openai from 'openai';


function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [newsArticles, setNewsArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summarisedNews, setSummarisedNews] = useState([]);
  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const apiKey = '${process.env.NEWS_API_KEY}'; 
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${selectedGenre}&country=us&lang=en&apiKey=${apiKey}`);
      setNewsArticles(response.data.articles);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
      const API_KEY = "${process.env.GEMINI_API_KEY}";
      const genAI = new GoogleGenerativeAI(API_KEY);
    const summarizeArticle = (article) => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = model.generateContent(`Tell me more abt this in a summarized format:\n${article.title}`);
        const response = result.response;
        const text = response.text();
        console.log(text)
        setSummarisedNews(text);
      } catch (error) {
        console.error("Error generating text:", error);
      }
    };
      /*const summarizeText = async (text) => {
        const response = await openai.createCompletion({
          engine: 'text-davinci-002',
          prompt: `Please tell me more about the following text in a summarized manner: ${text}`,
          max_tokens: 1024,
          n: 1,
          stop: ['\n'],
        });
    
        const summary = response.choices[0].text.trim();
        setSummarisedNews(summary);
      };*/
      
  useEffect(() => {
    if (selectedGenre) {
      fetchNews();
      summarizeArticle(newsArticles.map((article) => article));
    }
  }, [selectedGenre, newsArticles]);

  return (
    <div className='containerhome'>
      <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className='containerhome'>
        <option value="">Not selected</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
      </select>

      {isLoading && <p>Loading news...</p>}
      {error && <p>Error: {error.message}</p>}

      {newsArticles.length > 0 && (
        <div>
          {newsArticles.map((article) => (
            <div key={article.url} className="news-card">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <p>
                <strong>Summary:</strong> 
                { summarisedNews }
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;


