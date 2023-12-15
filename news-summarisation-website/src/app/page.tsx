'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import firebase from "firebase/compat/app"; 
import { collection, addDoc } from 'firebase/firestore';

const firestore = firebase.firestore();

export default function LoginPage() {
  const [user, setUser] = useState({ un: '', pw: '' });
  const router = useRouter();

  // Function to handle form submission.
  async function submit() {
    if (user.un === "" || user.pw === "") return;
    try {
      const user = firestore.collection('users').doc();
      await addDoc(collection(db, "users"), { username: user.un, password: user.pw });
      alert("User created successfully!");
      console.log(`Document added with ID: ${user.id}`);
      router.push("/");
    } catch (error) {
      alert("Error creating user: " + error.message);
    }
  }

  return (
    <div className="container">
      <h1>Sign up</h1>
      <label htmlFor="username">Username: </label>
      <input type="text" id="username" name="username" value={user.un} onChange={e => setUser(prevState => ({ ...prevState, un: e.target.value }))} /><br/>
      <label htmlFor="password">Password: </label>
      <input type="password" name="password" id="password" value={user.pw} onChange={e => setUser(prevState => ({ ...prevState, pw: e.target.value }))} /><br/>
      <button onClick={submit}>Sign up</button>
    </div>
  );
}