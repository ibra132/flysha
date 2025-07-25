import type { Metadata } from "next";
import "../../../globals.css";

export const metadata: Metadata = {
  title: "Dashboard | Airplanes",
};

export default function AirplanesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
