
import { ReactNode } from "react";
import type { Metadata } from "next";
interface LayoutProps {
  children: ReactNode;
}
export const metadata: Metadata = {
  title: "Edit",
  description: "Edit Meta",
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
