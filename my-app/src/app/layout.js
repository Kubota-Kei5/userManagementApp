// app/layout.tsx
import styles from "@/styles/globals.module.css";
import GlobalNav from "@/components/GlobalNav";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

// Font Awesome の自動CSS注入を無効化（Next.jsでの最適化のため）
config.autoAddCss = false;

export const metadata = {
  title: "User Management System",
  description: "A simple Next.js app with global navigation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={styles.body}>
        {/* ヘッダーやナビはここ */}
        <GlobalNav />

        {/* 各ページの中身 */}
        <main className={styles.main}>{children}</main>

        {/* フッターを入れたいときはここに追加 */}
      </body>
    </html>
  );
}
