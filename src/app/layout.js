import "@/styles/globals.css";
import GlobalNav from "@/components/GlobalNav";

export const metadata = {
  title: "User Management System",
  description: "A simple Next.js app with global navigation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" fontSize="16px">
      <body>
        {/* ヘッダーやグロナビはここ */}
        <GlobalNav />

        {/* 各ページの中身 */}
        <main>{children}</main>

        {/* フッターを入れたいときはここに追加 */}
      </body>
    </html>
  );
}
