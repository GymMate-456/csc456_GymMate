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
import Filter from "../utils/filter_component";

import GymMateCards from "./GymMateCard";

const data = [
  {
    age: "28",
    bio: "I love playing tennis and hiking. Looking for someone who shares similar interests!",
    cardImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/athletelink-2b0c4.appspot.com/o/users%2FPugplc57FjN8k0XFn4GvhH0l0qG3%2FcardImage?alt=media",
    dislikes: [],
    email: "peter@example.com",
    flagNewUser: false,
    likes: [],
    likesMe: [],
    location: {
      latitude: 40.7128,
      longitude: -74.006,
    },
    matches: [],
    profileImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/athletelink-2b0c4.appspot.com/o/users%2FPugplc57FjN8k0XFn4GvhH0l0qG3%2FprofileImage?alt=media",
    sports: ["Tennis", "Hiking", "Yoga"],
    uid: "789ghi",
    userID: "789ghi",
    username: "Peter",
    zipcode: "10001",
  },
  {
    age: "25",
    bio: "I'm passionate about swimming and cycling. Looking for someone to train with!",
    cardImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/athletelink-2b0c4.appspot.com/o/users%2FPugplc57FjN8k0XFn4GvhH0l0qG3%2FcardImage?alt=media",
    dislikes: [],
    email: "sara@example.com",
    flagNewUser: false,
    likes: [],
    likesMe: [],
    location: {
      latitude: 40.7128,
      longitude: -74.006,
    },
    matches: [],
    profileImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/athletelink-2b0c4.appspot.com/o/users%2FPugplc57FjN8k0XFn4GvhH0l0qG3%2FprofileImage?alt=media",
    sports: ["Swimming", "Cycling", "Running"],
    uid: "abc123",
    userID: "abc123",
    username: "Sara",
    zipcode: "10002",
  },
];

export default function Home() {
  // Variable to help keep track if user is signed in or not
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [filteredData, setFilteredData] = useState(data);

  const handleFilteredData = (data: any) => {
    // Process the data as needed
    console.log("Filtered Data--data")
    setFilteredData(data);
    console.log(filteredData);
  };

  useEffect(()=>{
    console.log("filteredData changed");
  },[filteredData])

  // Function to sign the user out (if signed in)
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        localStorage["user"] = null;
        localStorage["uid"] = null;
        console.log("Signed out successfully!");
      })
      .catch((error) => console.log(error));
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
            <Link href="/profile">
              <Image src={profile} alt="Image" />
            </Link>
            <Image src={logo2} alt="Image" />
            <Link href="/chat">
              <Image src={chat} alt="Image" />
            </Link>
          </div>
          <Filter currentUserId={currentUser.uid} onFilteredData= {handleFilteredData}></Filter>
          {/* Goes here */}
          <GymMateCards data={filteredData} />

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
