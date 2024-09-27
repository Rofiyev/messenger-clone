"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { FullConversationType } from "@/types";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/useConversation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./conversation-box";
import GroupChatModal from "./group-chat-modal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import _ from "lodash";

interface Props {
  conversations: FullConversationType[];
  users: User[];
}

const ConversationList: FC<Props> = ({ conversations, users }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [items, setItems] = useState<FullConversationType[]>(conversations);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session?.user?.email;
  }, [session?.user?.email]);

  useEffect(() => {
    if (!pusherKey) return;

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        _.find(current, { id: conversation.id })
          ? current
          : [conversation, ...current]
      );
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) =>
          currentConversation.id === conversation.id
            ? {
                ...currentConversation,
                messages: conversation.messages,
              }
            : currentConversation
        )
      );
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => [
        ...current.filter(
          (c: FullConversationType) => c.id !== conversation.id
        ),
      ]);

      if (conversationId === conversation.id) router.push("/conversations");
    };

    pusherClient.subscribe(pusherKey);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, router, conversationId]);

  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}
      />
      <aside
        className={clsx(
          `
        fixed
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
              onClick={() => setIsModalOpen(true)}
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
    </>
  );
};

export default ConversationList;
