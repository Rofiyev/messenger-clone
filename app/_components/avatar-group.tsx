"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

interface Props {
  users?: User[];
}

const AvatarGroup: FC<Props> = ({ users = [] }) => {
  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div className="relative size-11">
      {slicedUsers.map((user: User, index: number) => (
        <div
          key={user.id}
          className={`
          absolute
          inline-block
          rounded-full
          overflow-hidden
          size-[21px]
          ${positionMap[index as keyof typeof positionMap]}
          `}
        >
          <Image
            src={user?.image || "/images/placeholder.jpg"}
            fill
            alt="Avatar"
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
