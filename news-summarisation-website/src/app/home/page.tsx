"use client"
import React, { useState } from "react"
import { getArticles } from '../api/newsapi'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
export default function Home() {
  const [preference, setPreference] = useState('')
  async function submit() {
    async function Cards() {  
      let ar = await getArticles(preference);
      if (!ar || !Array.isArray(ar)) {
        alert("Error fetching data");
        return {};
        } else{
          return (
            <Card>
              <CardBody>
                <p>{ar[0]}</p>
              </CardBody>
            </Card>
          )
        };
        
    }
  } 

  return (
    <div className="container">
      <h1>Welcome to our website!</h1>
      <div>
        Please select your preference:
        <select value={preference} onChange={(e) => setPreference(e.target.value)}>
          <option value={"null"}>Not Selected</option>
          <option value={"politics"}>Politics</option>
          <option value={"technology"}>Technology</option>
          <option value={"sports"}>Sports</option>
        </select>
        <button onSubmit={submit}>Submit</button>
      </div>
    </div>
  )

} 
