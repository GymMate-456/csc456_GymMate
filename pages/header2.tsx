import Link from 'next/link';
import Image from 'next/image';
import styles from "../styles/Signin.module.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Header2({ backButton}) {
  return (
    <header className={styles.back_button}>
      {backButton && (
          <Link href="/chat">
            <ArrowBackIcon alt="Back Button" />
          </Link>
      )}
    </header>
  );
}
