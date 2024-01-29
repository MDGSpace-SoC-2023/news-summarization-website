'use client'
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';


/*'use client'
import React from "react"

import {Card, CardHeader, CardBody, CardFooter, input} from "@nextui-org/react";
//import '../newsapi'
import axios from 'axios';
import { useState } from 'react';
import * as xml2js from 'xml2js';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from "next/router";



/*

export default function Home() {
  const [text, setText] = useState("");
  const [summarizedtext, setsummarizedtext] = useState("");
  const [loading, setLoading] = useState(false);
  const [preference, setPreference] = useState('')
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const openai = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: generatePrompt(text),
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      setSummary(response.data.choices[0].text.trim());
    } catch (error) {
      console.error('Error summarizing text:', error);
    }
  };

  const HandleSubmit = (e) => {
    async function getFirstArticleText(query: string) {
      try {
        const response = await axios.get(`https://news.google.com/rss/search?q=${query}`);
        const result = await xml2js.parseStringPromise(response.data);
        const articles = result.rss.channel[0].item;
        if (articles && articles.length > 0) {
          setText(articles[0].description[0]);
        }
      } catch (error) {
        console.error(error);
      }
      return null;

    };
    getFirstArticleText(preference);

    setLoading(true);
    e.preventDefault();
    openai
    
  };

  function generatePrompt(text: string) {
    return `Summarize this: ${text} while keeping all of the important information and also give a sentimental analysis for the same in the summary`;
  }

  return (
    <div className="containerhome">
        <form>
        Please select your preference:
        <input type="preference" placeholder="please enter your preference" onChange={(e) => setPreference(e.target.value)}/> <br/>
        <button onSubmit={HandleSubmit}></button>
        </form>
      <Card>{summarizedtext}</Card>
    </div>
  )
}
// src/App.js
import { getNews } from '../newsService';

import NewsList from '../NewsItem';

function App() {
  const [text, setText] = useState("");
  const [summarizedtext, setsummarizedtext] = useState("");
  const [loading, setLoading] = useState(false);
  const [preference, setPreference] = useState('')
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const topics = ['Politics', 'Sports', 'General'];
  const [selectedTopic,  setSelectedTopic] = useState('');
  function HandleSubmit() {

  }
  return (
    <div className="containerhome">
      <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
        {topics.map((topic) => (
          <option key={topic}>{topic}</option>
        ))} select category:
      </select>
      <NewsList topic={selectedTopic} />
    </div>
  );
}

export default App;*/

import { useEffect } from 'react';



function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [newsArticles, setNewsArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedText, setGeneratedText] = useState('');

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const apiKey = '8efeb6c34f034321b55f068b77649f7f'; 
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${selectedGenre}&country=us&lang=en&apiKey=${apiKey}`);
      setNewsArticles(response.data.articles);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
      const API_KEY = 'AIzaSyDneekIqPvD9lSWdQVO3tphGj9l2yjVRCw';
      const genAI = new GoogleGenerativeAI(API_KEY);
    const summarizeArticle = (article) => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = model.generateContent(`Tell me more abt this in a summarized format:\n${article.title}\n${article.description}`);
        const response = result.response;
        const text = response.text();
        console.log(text)
        setGeneratedText(text);
      } catch (error) {
        console.error("Error generating text:", error);
      }
    };
    let article = newsArticles[0];
    

  
  useEffect(() => {
    if (selectedGenre) {
      fetchNews();
      article = newsArticles[0];
      summarizeArticle(article);
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
                { generatedText }
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;


