import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import Link from "next/link";
import styles from "../styles/Signin.module.css";
import Header from "./Header";

export default function Profile() {

  return (
    <div>

      <Header leftButton="profileIcon" rightButton="chatIcon" />

      <h2> This is the profile page</h2>

    </div>

  );
}
