import UserRegisterForm from "@/components/UserRegisterForm";

export default function UserRegister() {
  return (
    <div>
      <h1>ユーザー登録</h1>
      <p>
        ユーザー登録のフォームを作る。登録ボタンでSupabaseにデータを登録。userIDの重複チェック処理もやる。
      </p>
      <UserRegisterForm />
    </div>
  );
}
