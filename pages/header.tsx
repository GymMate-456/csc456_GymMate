import Link from 'next/link';
import Image from 'next/image';
import styles from "../styles/Signin.module.css";
import profile from "../public/icons/profile.png";
import logo2 from "../public/icons/logo2.png";
import search from "../public/icons/search.png";
import chat from "../public/icons/chat.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Header({ leftButton, logoButton, rightButton, rightButton2, backButton}: any) {
  return (
    <header className={styles.header_icons}>
      {leftButton && (
        <Link href="/profile">
          <Image className={styles.profile_button} src={profile} alt="Profile Icon" />
        </Link>
      )}
      {logoButton && (
        <Link href="/">
          <Image className={styles.logo_button} src={logo2} alt="Logo" />
        </Link>
      )}
      {rightButton && (
        <Link href="/searchGyms">
          <Image className={styles.search_button} src={search} alt="Search Icon" />
        </Link>
      )}
      {rightButton2 && (
        <Link href="/chat">
          <Image className={styles.chat_button} src={chat} alt="Chat Icon" />
        </Link>
      )}
      {backButton && (
        <Link href="/chat">
          <ArrowBackIcon />
        </Link>
      )}
    </header>
  );
}