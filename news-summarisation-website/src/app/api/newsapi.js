"use client"
import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const API_KEY = '${process.env.NEWS_API_KEY}'; 

let url = "https://newsapi.org/v2/everything?q="+category+"&apiKey="+API_KEY;

fetch(url)
  .then((value)=>{
    return value.json()
  })
  .then((data)=> {
    console.log("Data: ", data);
  });


