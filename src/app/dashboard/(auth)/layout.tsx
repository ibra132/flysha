import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Dashboard | Sign In",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
