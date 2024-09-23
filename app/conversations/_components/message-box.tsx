"use client";

import { FC } from "react";
import { FullMessageType } from "@/types";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import clsx from "clsx";
import Avatar from "@/app/_components/avatar";
import { format } from "date-fns";
import Image from "next/image";

interface Props {
  message: FullMessageType;
  isLast: boolean;
}

const MessageBox: FC<Props> = ({ message, isLast }) => {
  const { data: session } = useSession();

  const isOwn = session?.user?.email === message?.sender?.email;
  const seenList = (message.seen || [])
    .filter((user: User) => user.email !== message?.sender?.email)
    .map((user: User) => user.name)
    .join(", ");

  return (
    <div className={clsx("flex gap-3 p-4", isOwn && "justify-end")}>
      <div className={clsx(isOwn && "order-2")}>
        <Avatar user={message.sender} />
      </div>
      <div
        className={clsx(
          `
        flex
        flex-col
        gap-2
        `,
          isOwn && "items-end"
        )}
      >
        <div
          className="
          flex
          items-center
          gap-1
          "
        >
          <div className="text-sm text-gray-500">{message.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(message.createdAt), "p")}
          </div>
        </div>

        <div
          className={clsx(
            `
          text-sm
          w-fit
          overflow-hidden
          `,
            isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
            message.image ? "rounded-md p-0" : "rounded-full px-3 py-2"
          )}
        >
          {message.image ? (
            <Image
              src={message.image}
              alt="image"
              height={288}
              width={288}
              className="
              object-cover
              cursor-pointer
              hover:scale-110
              transition
              bg-white
              "
            />
          ) : (
            <div>{message.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div
            className="
            text-xs
            font-light
            text-gray-500
            "
          >{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
