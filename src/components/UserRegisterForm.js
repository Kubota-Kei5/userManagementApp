"use client";
// components/UserForm.js
import { useState } from "react";
import { supabase } from "../utils/supabase";
import styles from "@/styles/UserRegisterForm.module.css";

export default function UserForm() {
  const [userID, setUserID] = useState("");
  const [email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const missing = [];
    if (!userID.trim()) missing.push("User ID");
    if (!email.trim()) missing.push("Email");
    if (!FirstName.trim()) missing.push("First Name");
    if (!LastName.trim()) missing.push("Last Name");
    if (!avatarURL.trim()) missing.push("Avatar URL");

    if (missing.length > 0) {
      // 改行を表す \n を使って複数行メッセージを生成
      setMessage(
        "下記の項目を入力して下さい。\n" +
          missing.map((item) => `・${item}`).join("\n")
      );
      setLoading(false);
      return;
    }

    const { data: existing } = await supabase
      .from("profiles")
      .select("user_id")
      .eq("user_id", userID)
      .maybeSingle(); // レコードがなければdataがnullで返る

    if (existing) {
      setMessage(
        "この UserID は既に使われています。別のものを入力してください。"
      );
      setLoading(false);
      return;
    }

    const { error: insertErr } = await supabase.from("users").insert([
      {
        user_id: userID,
        email: email,
        first_name: FirstName,
        last_name: LastName,
        avatar_url: avatarURL,
      },
    ]);

    if (insertErr) {
      setMessage(`登録エラー：${insertErr.message}`);
    } else {
      setMessage("ユーザーを登録しました！");
      setUserID("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setAvatarURL("");
    }
    setLoading(false);
  };

  return (
    <>
      <h1 className={styles.registerTitle}>ユーザー登録</h1>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <div className={styles.registerFormGroup}>
          <label htmlFor="UserId">User ID</label>
          <input
            id="UserId"
            type="text"
            placeholder="User ID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
          />
        </div>

        <div className={styles.registerFormGroup}>
          <label htmlFor="Email">Email</label>
          <input
            id="Email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.registerFormGroup}>
          <label htmlFor="FirstName">First Name</label>
          <input
            type="text"
            id="FirstName"
            placeholder="First Name"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className={styles.registerFormGroup}>
          <label htmlFor="LastName">Last Name</label>
          <input
            type="text"
            id="LastName"
            placeholder="Last Name"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className={styles.registerFormGroup}>
          <label htmlFor="AvatarURL">Avatar URL</label>
          <input
            type="text"
            id="AvatarURL"
            placeholder="Avatar URL"
            value={avatarURL}
            onChange={(e) => setAvatarURL(e.target.value)}
            required
          />
        </div>

        <div className={styles.registerFormGroup}>
          <button type="submit" disabled={loading}>
            {loading ? "登録中…" : "登録"}
          </button>
          {message && (
            <p
              className={
                message.includes("エラー") ? styles.error : styles.success
              }
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </>
  );
}
