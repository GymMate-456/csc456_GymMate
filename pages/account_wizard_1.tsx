import { useState, FormEvent } from 'react';
import styles from '../styles/Signin.module.css';
import Image from 'next/image';
import logo from "./../public/icons/logo.png";
import { database } from '../utils/firebase';
import { useRouter } from 'next/router';
import { ToastDependency, sendToast } from '../utils/toasts'

function Wizard1() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle account initalization here
    database.collection('users').doc(localStorage['uid']).update({
      firstName: firstName, lastName: lastName, gender: gender
    }).then(async () => {
      router.push("/account_wizard_2");
    }).catch(async (error) =>  {
      // error message to the user
      alert('An error occurred while creating a new user.');
      // Log the error to the console for debugging purposes
      console.error('Failed process to save new user data.', error);
      await sendToast(3, error.message, 3000);
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
      <div className={styles.image_container}>
          <Image src={logo} alt="Image" className={styles.logo}/>
        </div>
        <h1 className={styles.heading}>Tell us more about you</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            First Name
            <input className={styles.input} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <br />
          <label className={styles.label}>
            Last Name
            <input className={styles.input} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <br />
          <label className={styles.label}>
            Gender:
            {/* <input className={styles.input} type="text" value={gender} onChange={(e) => setGender(e.target.value)} /> */}
            <select
              className={styles.input}
              value={gender}
              onChange={(e) => {  
              setGender(e.target.value);
                }}
            >
              <option value=" "></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <br />
          <button className={styles.button} type="submit">Continue</button>
        </form>
        <br></br>
      </div>
      <ToastDependency />
    </div>
  );
}

export default Wizard1;
