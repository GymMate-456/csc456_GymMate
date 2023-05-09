import Link from 'next/link';
import Image from 'next/image';
import styles from "../styles/Signin.module.css";
import profile from "../public/icons/profile.png";
import logo2 from "../public/icons/logo2.png";
import chat from "../public/icons/chat.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Header({ leftButton, rightButton }) {
  return (
    <header className={styles.header_icons}>
      {leftButton && (
        <Link href="/profile">
          <Image src={profile} alt="Profile Icon" />
        </Link>
      )}
      <Link href="/">
        <Image src={logo2} alt="Logo" />
      </Link>
      {rightButton && (
        <Link href="/chat">
          <Image src={chat} alt="Chat Icon" />
        </Link>
      )}
    </header>
  );
}
