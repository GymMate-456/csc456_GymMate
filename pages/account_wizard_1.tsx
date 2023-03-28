import { useState, FormEvent } from 'react';
import styles from '../styles/Signin.module.css';
import Image from 'next/image';
import tempLogo from "./../public/icons/temp_logo2.png";

function Wizard1() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle signin logic here
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
      <div className={styles.image_container}>
          <Image src={tempLogo} alt="Image" className={styles.logo}/>
        </div>
        <h1 className={styles.heading}>Tell us more about you</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            First Name:
            <input className={styles.input} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <br />
          <label className={styles.label}>
            Last Name:
            <input className={styles.input} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <br />
          <label className={styles.label}>
            Gender:
            <input className={styles.input} type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
          </label>
          <br />
          <button className={styles.button} type="submit">Continue</button>
        </form>
        <br></br>
      </div>
    </div>
  );
}

export default Wizard1;