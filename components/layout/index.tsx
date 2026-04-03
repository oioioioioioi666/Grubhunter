import { ReactNode } from "react";
import Header from "../header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="layout-grid">{children}</main>
    </>
  );
};

export default Layout;