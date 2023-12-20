'use client'
import { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
export default function Login() {
 const [un, setUn] = useState('');
 const [pw, setPw] = useState('');
 const router = useRouter()

 const login = async () => {
  
  async function authenticate(u, p) {
     try {
       const docRef = doc(collection(db, "users"), u);
       const userSnapshot = await getDoc(docRef);
   
       if (!userSnapshot.exists()) {
         throw new Error('User not found');
       }
   
       if (userSnapshot.data().password !== p) {
         throw new Error('Incorrect password');
       }
   
       return { user: userSnapshot.data(), validated: true };
     } catch (error) {
       throw error;
     }
  }
   
  try {
     const { user, validated } = await authenticate(un, pw);
     if (validated) {
       alert("login successful");
       router.push("/home");
     }
  } catch (error) {
     console.error("Error: ", error);
     alert("Login failed. Please check your credentials and try again.");
  }
 };

 return (
    <div className='container'>
      <form>
        <h1>Log In</h1>
        <input type="Username" placeholder="Username" onChange={(e) => setUn(e.target.value)} /><br/>
        <input type="password" placeholder="Password" onChange={(e) => setPw(e.target.value)} /><br/>
        <button className="button" type="submit" onClick={login}>Log In</button>
        <p>Not Registered? <a href="localhost:3000/signup">Create an Account</a></p>
      </form>
    </div>
 );
}