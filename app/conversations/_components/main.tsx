"use client";

import { FC, useEffect, useRef, useState } from "react";
import { FullMessageType } from "@/types";
import MessageBox from "./message-box";
import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import _ from "lodash";
import { MdOutlineConnectingAirports } from "react-icons/md";

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

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) =>
        _.find(current, { id: message.id }) ? current : [...current, message]
      );

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) =>
          currentMessage.id === newMessage.id ? newMessage : currentMessage
        )
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
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
      <div ref={bottomRef} className="pt-12" />
    </div>
  );
};

export default Main;
