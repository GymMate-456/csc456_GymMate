import { useState, FormEvent } from "react";
import styles from "../../styles/Signin.module.css";
import tempLogo from "../../public/icons/temp_logo2.png";
import Image from "next/image";
import {
  emailExists,
  validatePassword,
  createUser,
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
    // Validate email & password
    if (await validateForm(email, password)) {
      // Create user authentication & register in database
      const uid = await createUser(email, password);
      if (uid != 'error') {
        // New users are pushed to account initalization
        router.push({
          pathname: '/account_wizard_1',
          query: { uid: uid },
        });
      } 
    }
  };

  const validateForm = async (email: String, password: String) => {
    setPasswordError("");
    setConfirmPasswordError("");
    if (!(await emailExists(email))) {
      return validatePassword(
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
          <Image src={tempLogo} alt="Image" className={styles.logo} />
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
    </div>
  );
}