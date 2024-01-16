"use client"
import React from "react"

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
//import '../newsapi'
import axios from 'axios';
import { useState } from 'react';

const API_KEY = '${process.env.NEWS_API_KEY}'; 

let url = "https://newsapi.org/v2/everything?q=politics&apiKey=df52790aa72c4534aea26782025f9662";
export default function home() {
  let p = fetch(url)
  p.then((value)=>{
    return value.text()
    })
  p.then((data)=> {
    console.log("Data: ", data);
  });
}
