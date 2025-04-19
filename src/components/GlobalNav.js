import Link from "next/link";
import styles from "@/styles/GlobalNav.module.css";
import { BiCube } from "react-icons/bi";

export default function GlobalNav() {
  return (
    <nav className={styles.globalNav}>
      <div className={styles.navContainer}>
        <a href="index.html" className={styles.logo}>
          <BiCube className={styles.logoIcon} />
          <span className={styles.logoText}>UMS</span>
        </a>
        <div className={styles.navLinks}>
          <a href="index.html" className={styles.navItem} data-page="index">
            ホーム
          </a>
          <a
            href="user-list.html"
            className={styles.navItem}
            data-page="user-list"
          >
            ユーザーリスト
          </a>
          <a
            href="user-detail.html"
            className={styles.navItem}
            data-page="user-detail"
          >
            ユーザー詳細
          </a>
          <a
            href="user-create.html"
            className={styles.navItem}
            data-page="user-create"
          >
            ユーザー登録
          </a>
        </div>
      </div>
    </nav>
  );
}
