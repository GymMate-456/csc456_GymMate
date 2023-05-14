import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import Link from "next/link";
import styles from "../styles/Signin.module.css";
import Header from "./header";

export default function Chat() {

  return (
    <div>

      <Header backButton="" leftButton="profileIcon" logoButton="logoIcon" rightButton="searchIcon" rightButton2="chatIcon" />

      <h2>This is the chat page</h2>

      <Link href="/individual_chat">
        <div className={styles.convo}>
          <h3>Conversation 1</h3>
        </div>
      </Link>

    </div>
  );
}
