"use client";

import { FC, useEffect, useRef, useState } from "react";
import { FullMessageType } from "@/types";
import MessageBox from "./message-box";
import useConversation from "@/hooks/useConversation";
import axios from "axios";

interface Props {
  initialMessages: FullMessageType[];
}

const Main: FC<Props> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto px-1 md:px-2">
      {messages.map((message: FullMessageType, i: number) => (
        <MessageBox
          key={message.id}
          isLast={i === messages.length - 1}
          message={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Main;
