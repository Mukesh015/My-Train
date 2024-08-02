import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { UiProviders } from "@/components/providers";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/components/navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tourism",
  description: "A way to feels freedom in life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <UiProviders>
          <StoreProvider>
            <Navbar />
            {children}
          </StoreProvider>
        </UiProviders>
      </body>
    </html>
  );
}