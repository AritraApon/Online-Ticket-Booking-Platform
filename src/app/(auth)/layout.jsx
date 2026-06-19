import Navbar from "@/Components/Navbar";
import { Inter } from "next/font/google";
import "../globals.css";
import { ToastContainer } from "react-toastify";

const sansBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const AuthLayout = ({ children }) => {
  return (
    // 💡 HTML/Body bad diye orignal layouts class direct div wrapper-e switch kora holo
    <div className={`${sansBody.className} min-h-full antialiased bg-gray-50`}>

      {/* Dynamic Navigation Header component */}
      <Navbar />

      {/* Main viewport grid layouts */}
      <main className="container mx-auto bg-gray-50">
        {children}
      </main>

      {/* Global Toast Alerts container */}
      <ToastContainer position="top-center" />

    </div>
  );
};

export default AuthLayout;