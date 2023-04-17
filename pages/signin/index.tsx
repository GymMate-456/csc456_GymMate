import { useState, FormEvent } from "react";
import styles from "../../styles/Signin.module.css";
import Image from "next/image";
import tempLogo from "../../public/icons/temp_logo2.png";
import { loginUser, checkNewUserFlag } from '../../utils/users'
import Link from "next/link";
import { useRouter } from 'next/router';

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // User login authentication
    const user = await loginUser(email, password);
    // If succesful user login
    if (user != 'error') {
      // if new user flag enabled
      if (await checkNewUserFlag(user)) {
        // Routes to account initalization
        router.push({
          pathname: '/account_wizard_1',
          query: { user: JSON.stringify(user) },
        });
      } else {
        // Routes back to home
        router.push({
          pathname: '/',
          query: { user: JSON.stringify(user) },
        });
      }
    }
  }

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