import type { Metadata } from "next";
import { Poppins, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "TDTT - Studio",
  description: "A creative agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${poppins.variable} ${notoSansKr.variable} font-sans antialiased text-white bg-black`}>
        {children}
      </body>
    </html>
  );
}
