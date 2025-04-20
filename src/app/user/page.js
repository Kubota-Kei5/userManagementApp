"use client";

import { useEffect, useState } from "react";
import SearchBox from "@/components/SearchBox";
import { supabase } from "@/utils/supabase";
import styles from "@/styles/UserList.module.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;

      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      setError("ユーザーデータの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) => user.user_id.includes(searchTerm));
    setFilteredUsers(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <h1>ユーザーリスト</h1>
      <SearchBox onSearch={handleSearch} />
      <div className={styles.userGrid}>
        {filteredUsers.length === 0 ? (
          <h3>ユーザーが見つかりませんでした。</h3>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className={styles.userCard}>
              <div className={styles.userInfo}>
                <i className={styles.userIcon}></i>
                <span className={styles.userId}>{user.user_id}</span>
              </div>
              <button
                onClick={() => redirectToDetail(user.user_id)}
                className={styles.detailBtn}
                aria-label="詳細を見る"
              >
                <span className={styles.detailText}>詳細を見る</span>
                <i></i>
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
