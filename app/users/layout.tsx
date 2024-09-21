import { ReactNode } from "react";
import { Metadata } from "next";
import Sidebar from "../_components/sidebar/sidebar";

export const metadata: Metadata = {
  title: "Messenger App - Users",
  description: "Messenger App - Users",
};

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <Sidebar>
      <div
        className="
        h-full
        "
      >
        {children}
      </div>
    </Sidebar>
  );
}
