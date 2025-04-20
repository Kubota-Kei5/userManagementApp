import styles from "@/styles/SearchBox.module.css";

export default function SearchBox() {
  return (
    <div className={styles.searchForm}>
      <h2>ユーザー検索</h2>
      <input type="text" id="userId" placeholder="Enter UserID" />
      <button>検索</button>
    </div>
  );
}
