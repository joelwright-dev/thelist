import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar>
        <body>{children}</body>
      </Navbar>
    </>
  );
}
