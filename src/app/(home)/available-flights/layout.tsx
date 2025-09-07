import React, { type FC, type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <section>{children}</section>;
};

export default Layout;
