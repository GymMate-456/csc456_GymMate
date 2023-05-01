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

export default function Profile() {

  return (
    <div>

      <div className={styles.header_icons}>
        <Image src={profile} alt="Image"/>
        <Link href="/"><Image src={logo2} alt="Image"/></Link>
        <Link href="/chat"><Image src={chat} alt="Image"/></Link>
      </div>

      <h2> This is the profile page</h2>

    </div>

  );
}
