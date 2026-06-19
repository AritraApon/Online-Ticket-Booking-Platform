import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";


const sansHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const sansBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "TicketBari",
  description: "Online ticket booking platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sansBody.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning={true}>

        <main className="container mx-auto">
          {children}
        </main>




      </body>
    </html>
  );
}
