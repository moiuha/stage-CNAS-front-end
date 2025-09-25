import {Inter} from 'next/font/google'
import "../app/assets/styles/globals.css";
import Header from "./components/header";
import { title } from 'process';
import Footer from './components/footer';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cookies } from 'next/headers';
import AdminNavBar from './components/adminNavBar';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Booking site",
  description: "Book room",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const role = cookieStore.get("role")?.value;
  let NavBar = null;
  if (token) {
    if (role === "USER") NavBar = <Header />;
    else if (role === "ADMIN") NavBar = <AdminNavBar />;
  }

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {NavBar}
        <main className='flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 xl:px-10'>
          <div className="w-full max-w-none mx-auto">
            {children}
          </div>
        </main>
        
        <Footer />
        
        <ToastContainer aria-label="Notification" />
      </body>
    </html>
  );
}
