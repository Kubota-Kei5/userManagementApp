import "@/styles/globals.css";
import Auth0ProviderComponent from "@/components/Auth0Provider";
import GlobalNav from "@/components/GlobalNav";

export const metadata = {
  title: "User Management System",
  description: "A simple Next.js app with global navigation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" style={{ fontSize: "16px" }}>
      <body>
        <Auth0ProviderComponent>
          {/* ヘッダーやグロナビはここ */}
          <GlobalNav />

          {/* 各ページの中身 */}
          <main>{children}</main>

          {/* フッターを入れたいときはここに追加 */}
        </Auth0ProviderComponent>
      </body>
    </html>
  );
}
