'use client';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store/Store";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Employee Attendance",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer position="bottom-center" />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <div>
              {children}
            </div>
          </PersistGate>
        </Provider>
      </body>
    </html >
  );
}
