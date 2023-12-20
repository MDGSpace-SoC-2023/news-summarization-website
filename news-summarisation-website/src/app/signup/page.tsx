'use client'
import 'firebase/compat/firestore';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function SignupPage() {
  const [user, setUser] = useState({ un: '', pw: '', pf: '' });
  let router = useRouter();

  // Function to handle form submission.
  async function submit() {
    if (user.un === "" || user.pw === "" || user.pf === "not selected") return;
    const docRef = doc(collection(db, "users"), user.un);
    try {
      await setDoc(docRef, {
        username: user.un,
        password: user.pw,
        preference: user.pf
      });
      alert("User created successfully!");
      console.log(`Document added`);
      router.push("/login");
    } catch (error) {
      alert("Error creating user: ");
    }
  }

  return (
    <html>
      <head>
      </head>
      <body>
        <div className="container">
        <h1>Sign up</h1>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" value={user.un} onChange={e => setUser(prevState => ({ ...prevState, un: e.target.value }))} /><br/>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" value={user.pw} onChange={e => setUser(prevState => ({ ...prevState, pw: e.target.value }))} /><br/>
      
        <label htmlFor="preferences">News Genre: </label>
      
        <select name="pf" id="pf">
          <option value={user.pf = "not selected"}>Not selected</option>
          <option value={user.pf = "politics"}>Politics</option>
          <option value={user.pf = "sports"}>Sports</option>
          <option value={user.pf = "entertainment"}>Entertainment</option>
        </select><br/>
      
        <button className="button" onClick={submit}>Sign up</button>

        </div>
      </body>
    </html>
    
  );
}