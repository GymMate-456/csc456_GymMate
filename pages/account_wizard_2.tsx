import { useState, FormEvent } from 'react';
import styles from '../styles/Signin.module.css';
import Image from 'next/image';
import tempLogo from "./../public/icons/temp_logo2.png";

function Wizard2() {
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [sportsPreference, setSportsPreference] = useState('');

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
            Age:
            <input className={styles.input} type="text" value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
          <br />
          <label className={styles.label}>
            Location:
            <input className={styles.input} type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          </label>
          <br />
          <label className={styles.label}>
            Sports Preference:
            <input className={styles.input} type="text" value={sportsPreference} onChange={(e) => setSportsPreference(e.target.value)} />
          </label>
          <br />
          <button className={styles.button} type="submit">Continue</button>
        </form>
        <br></br>
      </div>
    </div>
  );
}

export default Wizard2;