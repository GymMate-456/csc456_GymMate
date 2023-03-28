import styles from '../styles/Home.module.css'
import Signin from './sign_in'
import Signup from './sign_up'
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../utils/firebase";

export default function Home() {
  //variable to help keep track if user is signed in or not
  const[currentUser, setCurrentUser] = useState<any | null>(null);

  //function to sign the user out (if signed in)
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully!");
      })
      .catch((error) => console.log(error));
  };

  //useEffect to check if user is signed in or not
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser){
        setCurrentUser(currentUser);
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      listen()
    };
  }, []);

  return (
    //If user is signed in, display the item(s) in the first fragment
    //If not, display item(s) in the second fragment block (sign in)
    <div>
      {currentUser ? (
        <>
          <p>{`Signed in as ${currentUser.email}`}</p>
          <button onClick={signOutUser}>Sign Out</button>
        </>
      ) : (
        <>
          <Signin></Signin>
        </>
      )}
      
    </div>
  )
}
