import { ReactNode } from "react";
import { Metadata } from "next";
import Sidebar from "../_components/sidebar/sidebar";
import getUsers from "@/actions/getUsers";
import UserList from "./_components/user-list";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Messenger App - Users",
  description: "Messenger App - Users",
};

export default async function Layout({ children }: { children: ReactNode }) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UserList users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
