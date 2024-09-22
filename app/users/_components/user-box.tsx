"use client";

import Avatar from "@/app/_components/avatar";
import { Conversation, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";

interface Props {
  user: User;
}

const UserBox: FC<Props> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post<Conversation>("/api/conversations", {
        userId: user.id,
      })
      .then(({ data }) => {
        router.push(`/conversations/${data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [user, router]);

  return (
    <div
      onClick={handleClick}
      className="
      w-full
      relative
      flex
      items-center
      space-x-3
      bg-white
      p-3
      hover:bg-neutral-100
      rounded-lg
      transition
      cursor-pointer
      "
    >
      <Avatar user={user} />
      <div
        className="
        min-w-0
        flex-1
        "
      >
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
              text-sm
              font-medium
              text-gray-900
              "
            >
              {user.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
