import { UserProvider } from "./context/userContext";
import "./globals.css";
import Navbar from "@/app/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <title>Minha loja</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <UserProvider>
        <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
