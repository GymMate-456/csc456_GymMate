import { useState, FormEvent } from "react";
import styles from "../../styles/Signin.module.css";
import Image from "next/image";
import tempLogo from "../../public/icons/temp_logo2.png";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {
        console.log("User successfully logged in!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.image_container}>
          <Image src={tempLogo} alt="Image" className={styles.logo} />
        </div>
        <h1 className={styles.heading}>Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Email:
            <input
              className={styles.input}
              type="text"
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
          <br />
          <button className={styles.button} type="submit">
            Sign In
          </button>
        </form>
        <br></br>
        <div className={styles.links}>
          <Link href="/forgotpassword">Forgot password</Link>
          <Link href="/signup">New here? Join now</Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
