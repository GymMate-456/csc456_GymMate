import { useState, FormEvent } from 'react';
import styles from '../styles/Signin.module.css';
import Image from 'next/image';
import tempLogo from "./../public/icons/temp_logo2.png";
import { database } from '../utils/firebase';
import { useRouter } from 'next/router';

function Wizard2() {
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [sportsPreference, setSportsPreference] = useState('');
  const router = useRouter();

  const handleSubmit =async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // finalize account initalization logic 
    await database.collection('users').doc(localStorage['uid']).update({
      age: age, location: location, sportsPreference: sportsPreference, newUserFlag: false
    }).then(() => {
      router.push('/');
    }).catch((error) =>  {
      // error message to the user
      alert('An error occurred while creating a new user.');
      // Log the error to the console for debugging purposes
      console.error('Failed process to save new user data.', error);
    });
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