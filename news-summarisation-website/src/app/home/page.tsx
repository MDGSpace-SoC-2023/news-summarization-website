'use client'
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
}*/
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

export default App;

