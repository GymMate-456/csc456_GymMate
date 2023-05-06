import { useState, FormEvent } from "react";
import styles from "../../styles/Signin.module.css";
import logo from "./../../public/icons/logo.png";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';

import {
  emailExists,
  validatePassword,
  signUp,
} from "../../utils/users";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await validateForm(email, password)) {
      if (await signUp(email, password)) {
        router.push("/account_wizard_1");
      }
    }
  };

  const validateForm = async (email: String, password: String) => {
    setPasswordError("");
    setConfirmPasswordError("");
    if (!(await emailExists(email))) {
      return await validatePassword(
        password,
        setPasswordError,
        confirmPassword,
        setConfirmPasswordError
      );
    }
    return false;
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.image_container}>
          <Image src={logo} alt="Image" className={styles.logo} />
        </div>
        <h1 className={styles.heading}>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Email:
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label className={styles.label}>
            Password:
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <span className={styles.error}>{passwordError}</span>
          <br />
          <label className={styles.label}>
            Confirm Password:
            <input
              className={styles.input}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <span className={styles.error}>{confirmPasswordError}</span>
          <br />
          <button className={styles.button} type="submit">
            Continue
          </button>
        </form>
        <br></br>
        <div className={styles.links}>
          <Link href="/signin">Already on GymMate?</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}