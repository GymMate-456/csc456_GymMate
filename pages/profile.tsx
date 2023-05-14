import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import styles from "../styles/Signin.module.css";
import Header from "./header";
import ProfileScreen from "../utils/profile_comp";

export default function Profile() {

  return (
    <div>

      <Header backButton="" leftButton="profileIcon" logoButton="logoIcon" rightButton="searchIcon" rightButton2="chatIcon" />

      <h2> This is the profile page</h2>

      <ProfileScreen/>

    </div>

  );
}
