"use client"
import React from "react"

import {Card, CardHeader, CardBody, CardFooter, input} from "@nextui-org/react";
//import '../newsapi'
import axios from 'axios';
import { useState } from 'react';
import * as xml2js from 'xml2js';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from "next/router";

  
export default function Home() {
  async function getFirstArticleText(query: string) {
    try {
      const response = await axios.get(`https://news.google.com/rss/search?q=${query}`);
      const result = await xml2js.parseStringPromise(response.data);
      const articles = result.rss.channel[0].item;
      if (articles && articles.length > 0) {
        return articles[0].description[0];
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };
  
  function card() {
    return(
      <div id='cards'>
        <Card>{getFirstArticleText(preference)}</Card>
      </div>
    )
  }
  const [preference, setPreference] = useState('')


  
  async function submit() {
    let query = document.getElementById("inputField") as HTMLInputElement;
    useRouter().push('../summarised')
  }
    

  return (
    <div className="containerhome">
      <h1>Welcome to our website!</h1>
        <form>
        Please select your preference:
        <input type="preference" placeholder="please enter your preference" onChange={(e) => setPreference(e.target.value)}/> <br/>
        <button className="button" onSubmit={submit}>Submit</button>
        </form>
    </div>
  )
}

