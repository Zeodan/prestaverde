
import "./globals.css";
import { Providers } from "./providers";
import Navbarmenu from "@/components/Navbar/Navbarmenu";
import Footer from "@/components/Footer/footer";



export const metadata = {
  title: "Super Comercial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-slate-900 min-h-screen">
        <Providers>
          <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <Navbarmenu />
          </header>
          <main className="min-h-[calc(100vh-3rem)] pt-12">
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
