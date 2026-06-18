
import {  Inter } from "next/font/google";

import "../globals.css";
import { ToastContainer } from "react-toastify";
import DashboardSidebar from "@/Components/Dashboard/DashboardSidebar";
// (auth)/layout.js
const sansBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});
const AuthLayout = ({ children }) => {
  return (
    <html lang="en"  className={`${sansBody.className}  h-full antialiased`}>
      <body  suppressHydrationWarning={true}>
        <div >
         <DashboardSidebar/>
            <main className="container mx-auto bg-gray-50 ">
                  {children}

                </main>
                <ToastContainer position="top-center" />

        </div>
      </body>
    </html>
  );
};

export default AuthLayout;