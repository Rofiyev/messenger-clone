import { ReactNode } from "react";
import Sidebar from "../_components/sidebar/sidebar";
import ConversationList from "./_components/conversation-list";
import getConversations from "@/actions/getConversations";

export default async function ConversationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <ConversationList conversations={conversations} />
      {children}
    </Sidebar>
  );
}
