"use client";

import { FC, useState } from "react";
import { FullConversationType } from "@/types";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/useConversation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./conversation-box";

interface Props {
  conversations: FullConversationType[];
}

const ConversationList: FC<Props> = ({ conversations }) => {
  const router = useRouter();

  const [items, setItems] = useState<FullConversationType[]>(conversations);
  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        `fixed
      inset-y-0
      pb-20
      lg:pb-0
      lg:left-20
      lg:w-80
      lg:block
      lg:overflow-y-auto
      lg:border-r
      border-gray-200`,
        !isOpen ? "block w-full left-0" : "hidden"
      )}
    >
      <div className="px-5">
        <div
          className="
          flex
          justify-between
          items-center
          mb-4
          pt-4
          "
        >
          <div
            className="
            text-2xl
            font-bold
            text-neutral-800
            "
          >
            Messages
          </div>
          <div
            className="
            rounded-full
            p-2
            bg-gray-100
            text-gray-600
            cursor-pointer
            hover:opacity-75
            transition
            "
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item: FullConversationType) => (
          <ConversationBox
            key={item.id}
            conversation={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
