import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import Link from "next/link";
import styles from "../styles/Signin.module.css";
import profile from "../public/icons/profile.png";
import logo from "../public/icons/logo.png";
import logo2 from "../public/icons/logo2.png";
import chat from "../public/icons/chat.png";
import Image from "next/image";

export default function Home() {
  // Variable to help keep track if user is signed in or not
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  // Function to sign the user out (if signed in)
  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage['user'] = null;
      localStorage['uid'] = null;
      console.log("Signed out successfully!");
    }).catch((error) => console.log(error));
  };

  // useEffect to check if user is signed in or not
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    // If user is signed in, display the item(s) in the first fragment
    // If not, display item(s) in the second fragment block (sign in)
    <div>
      {currentUser ? (
        <>
          <div className={styles.header_icons}>
            <Link href="/profile"><Image src={profile} alt="Image"/></Link>
            <Image src={logo2} alt="Image"/>
            <Link href="/chat"><Image src={chat} alt="Image"/></Link>
          </div>
          <p>{`Signed in as ${JSON.parse(localStorage['user']).email}`}</p>
          <p>{`User ID: ${localStorage['uid']}`}</p>
          <p>This is where we can have our main components for the app</p>
          <button onClick={signOutUser}>Sign Out</button>
        </>
      ) : (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.image_container}>
              <Image src={logo} alt="Image" className={styles.logo} />
            </div>
            <Link href="/signin">
              <button className={styles.button}>Sign In</button>
            </Link>
            <Link href="/signup">
              <button className={styles.button}>Sign Up</button>
            </Link>
            <br></br>
          </div>
        </div>
      )}
    </div>
  );
}
