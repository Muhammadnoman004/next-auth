import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import AuthProvider from "./Provider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <AntdRegistry>
          <body className={inter.className}>{children}</body>
        </AntdRegistry>
      </AuthProvider>
    </html>
  );
}
