import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import Link from "next/link";
import styles from "../../styles/Signin.module.css";
import logo from "./../../public/icons/logo.png";
import Image from "next/image";

export default function Home() {
  // Variable to help keep track if user is signed in or not
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  // Function to sign the user out (if signed in)
  const signOutUser = () => {
    signOut(auth).then(() => {
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
          <p>{`Signed in as ${localStorage['uid']}`}</p>
          <p>{`User ID: ${JSON.parse(localStorage['user']).uid}`}</p>
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
