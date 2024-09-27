"use client";

import { FC, useCallback, useMemo } from "react";
import { FullConversationType } from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import clsx from "clsx";
import Avatar from "@/app/_components/avatar";
import { format } from "date-fns";
import AvatarGroup from "@/app/_components/avatar-group";

interface Props {
  conversation: FullConversationType;
  selected?: boolean;
}

const ConversationBox: FC<Props> = ({ conversation, selected }) => {
  const router = useRouter();
  const { otherUser } = useOtherUser(conversation);
  const { data: session } = useSession();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];

    return messages[messages.length - 1];
  }, [conversation.messages]);

  const userEmail = useMemo(() => {
    return session?.user?.email;
  }, [session?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!userEmail) return false;

    return (
      seenArray.filter((user: User) => user.email === userEmail).length !== 0
    );
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Sent an image";
    if (lastMessage?.body) return lastMessage.body;

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
      w-full
      relative
      flex
      items-center
      space-x-3
      hover:bg-neutral-100
      rounded-lg
      transition
      cursor-pointer
      p-3
      `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {conversation.isGroup ? (
        <AvatarGroup users={conversation.users} />
      ) : (
        <Avatar user={otherUser} />
      )}

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="
            flex
            justify-between
            items-center
            mb-1
            "
          >
            <p
              className="
              text-md
              font-medium
              text-gray-900
              "
            >
              {conversation.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                text-sm
                text-gray-400
                font-light
                "
              >
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              "truncate text-sm",
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
