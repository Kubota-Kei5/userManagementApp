import Link from "next/link";
import styles from "@/styles/GlobalNav.module.css";
import { BiCube } from "react-icons/bi";
import LoginButton from "@/login";
import LogoutButton from "@/logout";
import Profile from "@/profile";

export default function GlobalNav() {
  return (
    <nav className={styles.globalNav}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          <BiCube className={styles.logoIcon} />
          <span className={styles.logoText}>UMS</span>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navItem} data-page="index">
            ホーム
          </Link>
          <Link href="/user" className={styles.navItem} data-page="user-list">
            ユーザーリスト
          </Link>
          <Link
            href="/user/register"
            className={styles.navItem}
            data-page="user-create"
          >
            ユーザー登録
          </Link>
          <LoginButton></LoginButton>
          <LogoutButton></LogoutButton>
        </div>
      </div>
    </nav>
  );
}
