export default function UserRegister() {
  return (
    <div>
      <h1>ユーザー登録</h1>
      <p>
        ユーザー登録のフォームを作る。登録ボタンでSupabaseにデータを登録。userIDの重複チェック処理もやる。
      </p>
      <form>
        <input type="text" placeholder="ユーザー名" required />
        <input type="email" placeholder="メールアドレス" required />
        <button type="submit">登録</button>
      </form>
    </div>
  );
}
