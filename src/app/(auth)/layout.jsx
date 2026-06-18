import Navbar from "@/Components/Navbar";
import "../globals.css";
// (auth)/layout.js
const AuthLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div >
            <Navbar/>
            <main className="container mx-auto bg-gray-50 ">
                  {children}

                </main>

        </div>
      </body>
    </html>
  );
};

export default AuthLayout;