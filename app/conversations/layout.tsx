import { ReactNode } from "react";
import Sidebar from "../_components/sidebar/sidebar";
import ConversationList from "./_components/conversation-list";
import getConversations from "@/actions/getConversations";
import getUsers from "@/actions/getUsers";

export default async function ConversationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <ConversationList conversations={conversations} users={users} />
      {children}
    </Sidebar>
  );
}
