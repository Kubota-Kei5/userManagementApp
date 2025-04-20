"use client";

import { useState } from "react";
import styles from "@/styles/SearchBox.module.css";

export default function SearchBox({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // リアルタイム検索のために入力時にも検索を実行
  };

  return (
    <div className={styles.searchForm}>
      <h2>ユーザー検索</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="ユーザー名で検索"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          検索
        </button>
      </form>
    </div>
  );
}
