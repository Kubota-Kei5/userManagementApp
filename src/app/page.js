import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { HiUsers } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { MdSecurity } from "react-icons/md";

export default function Home() {
  return (
    <>
      <div className={styles.heroSection}>
        <h1 className={styles.h1}>User Management System</h1>
        <p className={styles.subtitle}>
          効率的なユーザー管理を、よりスマートに。
        </p>
      </div>

      <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <HiUsers className={styles.featureIcon} />
          <h3>ユーザー管理</h3>
          <p>直感的なインターフェースで、ユーザー情報を簡単に管理できます。</p>
        </div>
        <div className={styles.featureCard}>
          <BiSearch className={styles.featureIcon} />
          <h3>高度な検索</h3>
          <p>必要なユーザー情報にすばやくアクセス。</p>
        </div>
        <div className={styles.featureCard}>
          <MdSecurity className={styles.featureIcon} />
          <h3>セキュリティ</h3>
          <p>安全なデータ管理と保護を提供します。</p>
        </div>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>1000+</span>
          <span className={styles.statLabel}>登録ユーザー</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>99.9%</span>
          <span className={styles.statLabel}>稼働率</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>24/7</span>
          <span className={styles.statLabel}>サポート</span>
        </div>
      </div>
    </>
  );
}
