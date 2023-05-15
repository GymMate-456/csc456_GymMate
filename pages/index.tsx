import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import Link from "next/link";
import styles from "../styles/Signin.module.css";
import logo from "../public/icons/logo.png";
import Image from "next/image";
import Filter from "../utils/filter_component";
import Header from "./header";

import GymMateCards from "./GymMateCard";


export default function Home() {
  // Variable to help keep track if user is signed in or not
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [filteredData, setFilteredData] = useState(null);

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
          <div>
            <Header leftButton="profileIcon" logoButton="logoIcon" rightButton="searchIcon" rightButton2="chatIcon" />
          </div>
          <Filter currentUserId={currentUser.uid} onFilteredData= {handleFilteredData}></Filter>
          {/* Goes here */}
          <div className={styles.gym_card}>
            <GymMateCards data={filteredData} />
          </div>
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
