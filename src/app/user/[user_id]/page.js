"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import styles from "@/styles/UserDetail.module.css";

export default function UserDetail() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userID, setUserID] = useState("");
  const [email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!params.user_id) return;

      try {
        const userIdFromPath = params.user_id;
        setUserID(userIdFromPath);

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", userIdFromPath)
          .single();

        if (error) throw error;

        setEmail(data.email || "");
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setAvatarURL(data.avatar_url || "");
      } catch (error) {
        setError("ユーザーデータの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params.user_id]);

  useEffect(() => {
    if (message) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("users")
        .update({
          email: email,
          first_name: FirstName,
          last_name: LastName,
          avatar_url: avatarURL,
        })
        .eq("user_id", userID);

      if (error) throw error;

      setMessage("ユーザー情報を更新しました。");
      setIsEditing(false);
    } catch (error) {
      setError("更新に失敗しました: " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // 元のデータを再取得
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", userID)
          .single();

        if (error) throw error;

        setEmail(data.email || "");
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setAvatarURL(data.avatar_url || "");
      } catch (error) {
        setError("ユーザーデータの取得に失敗しました。");
      }
    };

    fetchUserData();
  };

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("user_id", userID);

      if (error) throw error;

      // 削除成功後、ユーザー一覧ページにリダイレクト
      window.location.href = "/user";
    } catch (error) {
      setError("削除に失敗しました: " + error.message);
      setIsConfirming(false);
    } finally {
      setDeleting(false);
    }
  };

  // 削除確認ダイアログを表示する関数
  const confirmDelete = (e) => {
    e.preventDefault();
    setIsConfirming(true);
  };

  // 削除確認ダイアログのキャンセル処理
  const cancelDelete = () => {
    setIsConfirming(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <>
      <h1 className={styles.detailTitle}>ユーザー情報詳細</h1>
      <form className={styles.detailForm}>
        <div className={styles.detailFormGroup}>
          <label htmlFor="UserId">User ID</label>
          <input
            readOnly
            id="UserId"
            type="text"
            placeholder="User ID"
            value={userID}
            required
          />
        </div>
        <div className={styles.detailFormGroup}>
          <label htmlFor="Email">Email</label>
          <input
            readOnly={!isEditing}
            id="Email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.detailFormGroup}>
          <label htmlFor="FirstName">First Name</label>
          <input
            readOnly={!isEditing}
            type="text"
            id="FirstName"
            placeholder="First Name"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className={styles.detailFormGroup}>
          <label htmlFor="LastName">Last Name</label>
          <input
            readOnly={!isEditing}
            type="text"
            id="LastName"
            placeholder="Last Name"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className={styles.detailFormGroup}>
          <label htmlFor="AvatarURL">Avatar URL</label>
          <input
            readOnly={!isEditing}
            type="text"
            id="AvatarURL"
            placeholder="Avatar URL"
            value={avatarURL}
            onChange={(e) => setAvatarURL(e.target.value)}
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          {!isEditing ? (
            <>
              <button
                className={styles.editButton}
                onClick={handleEdit}
                type="button"
              >
                編集する
              </button>
              <button
                className={styles.deleteButton}
                onClick={confirmDelete}
                type="button"
              >
                削除する
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.saveButton}
                onClick={handleUpdate}
                type="button"
                disabled={updating}
              >
                {updating ? "保存中..." : "保存する"}
              </button>
              <button
                onClick={handleCancel}
                type="button"
                className={styles.cancelButton}
              >
                キャンセル
              </button>
            </>
          )}
        </div>
      </form>
      {isConfirming && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmDialog}>
            <p>"{userID}" を削除します。本当によろしいですか？</p>
            <div className={styles.confirmButtons}>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className={styles.confirmYes}
              >
                {deleting ? "削除中..." : "はい"}
              </button>
              <button onClick={cancelDelete} className={styles.confirmNo}>
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}

      {showPopup && message && <div className={styles.popup}>{message}</div>}
    </>
  );
}
