"use client"
import React from "react"

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
//import '../newsapi'
import axios from 'axios';
import { useState } from 'react';

const API_KEY = '${process.env.NEWS_API_KEY}'; 

let url = "https://newsapi.org/v2/everything?q="+"politics"+"&apiKey=df52790aa72c4534aea26782025f9662";
export default function home() {
  fetch(url)
  .then((value)=>{
    return value.json
  })
  .then((data)=> {
    console.log("Data: ", data);
  });
}



/*export default function Home() {
  const [preference, setPreference] = useState('')
  async function submit() {
    let ar = await getArticles(preference);
      if (!ar || !Array.isArray(ar)) {
        alert("Error fetching data");
        return {};
      } else{
          return (
            <Card className="card">
              <link rel="styling" type="text/css" href="styles.css"></link>
              <CardBody>
                <p>{ar[0]}</p>
              </CardBody>
            </Card>
          )
      };
        

  } 

  return (
    <div className="containerhome">
      <h1>Welcome to our website!</h1>
      <div>
        Please select your preference:
        <select value={preference} onChange={(e) => setPreference(e.target.value)}>
          <option value={"null"}>Not Selected</option>
          <option value={"politics"}>Politics</option>
          <option value={"technology"}>Technology</option>
          <option value={"sports"}>Sports</option>
        </select>
        <button className="button" onSubmit={submit}>Submit</button>
      </div>
    </div>
  )

} */
/*export default function Home() {
  let ar = getArticles();
      if (!ar || !Array.isArray(ar)) {
        alert("Error fetching data");
        return {};
      } else{
          return (
            <Card className="card">
              <link rel="styling" type="text/css" href="styles.css"></link>
              <CardBody>
                <p>{ar[0]}</p>
              </CardBody>
            </Card>
          )
      };
        
}*/

