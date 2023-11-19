import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return <div className="flex justify-center h-screen">{children}</div>;
}

export default Layout;
