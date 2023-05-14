import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import styles from "../styles/Signin.module.css";
import profile from "../public/icons/profile.png";
import logo from "../public/icons/logo.png";
import logo2 from "../public/icons/logo2.png";
import chat from "../public/icons/chat.png";
import Image from "next/image";
import { ToastDependency } from "../utils/toasts"
import Header from "./header";

import ProfileScreen from "../utils/profile_comp";

export default function Profile() {
  return (
    <div>
      <Header backButton="" leftButton="profileIcon" logoButton="logoIcon" rightButton="searchIcon" rightButton2="chatIcon" />
      <h2> This is the profile page</h2>
      <ProfileScreen/>
      <ToastDependency/>
    </div>
  );
}
