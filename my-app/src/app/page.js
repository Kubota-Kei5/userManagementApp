import Image from "next/image";
import homeStyles from "@/styles/Home.module.css";
import globalStyles from "@/styles/globals.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faSearch,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <div className={homeStyles.heroSection}>
        <h1 className={globalStyles.h1}>User Management System</h1>
        <p className={homeStyles.subtitle}>
          効率的なユーザー管理を、よりスマートに。
        </p>
      </div>

      <div className={homeStyles.featuresGrid}>
        <div className={homeStyles.featureCard}>
          <FontAwesomeIcon icon={faUsers} className={homeStyles.featureIcon} />
          <h3>ユーザー管理</h3>
          <p>直感的なインターフェースで、ユーザー情報を簡単に管理できます。</p>
        </div>
        <div className={homeStyles.featureCard}>
          <FontAwesomeIcon icon={faSearch} className={homeStyles.featureIcon} />
          <h3>高度な検索</h3>
          <p>必要なユーザー情報にすばやくアクセス。</p>
        </div>
        <div className={homeStyles.featureCard}>
          <FontAwesomeIcon
            icon={faShieldAlt}
            className={homeStyles.featureIcon}
          />
          <h3>セキュリティ</h3>
          <p>安全なデータ管理と保護を提供します。</p>
        </div>
      </div>

      <div className={homeStyles.statsSection}>
        <div className={homeStyles.statItem}>
          <span className={homeStyles.statNumber}>1000+</span>
          <span className={homeStyles.statLabel}>登録ユーザー</span>
        </div>
        <div className={homeStyles.statItem}>
          <span className={homeStyles.statNumber}>99.9%</span>
          <span className={homeStyles.statLabel}>稼働率</span>
        </div>
        <div className={homeStyles.statItem}>
          <span className={homeStyles.statNumber}>24/7</span>
          <span className={homeStyles.statLabel}>サポート</span>
        </div>
      </div>
    </>
  );
}
