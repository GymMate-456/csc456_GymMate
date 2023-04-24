import { useState, FormEvent } from "react";
import styles from "../../styles/Signin.module.css";
import Image from "next/image";
import logo from "./../public/icons/logo.png";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

function ForgotPassword() {
  return (
    <>
      <h1>Forgot password goes here</h1>
      <Link href="/">Home</Link>
    </>
  );
}

export default ForgotPassword;
