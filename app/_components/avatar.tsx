"use client";

import { FC } from "react";
import { User } from "@prisma/client";
import {
  Avatar as AvatarUI,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import useActiveList from "@/hooks/useActiveList";

interface Props {
  user: User;
}

const Avatar: FC<Props> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.includes(user.email!);

  return (
    <div className="relative cursor-pointer">
      <AvatarUI
        className="
        size-9
        md:size-11
        relative
        "
      >
        <AvatarImage
          src={user?.image ?? "/images/placeholder.jpg"}
          alt="Avatar"
        />
        <AvatarFallback>{user?.image?.slice(0).toUpperCase()}</AvatarFallback>
      </AvatarUI>
      {isActive && (
        <span
          className="
          absolute
          top-0
          right-0
          block
          rounded-full
          bg-green-500
          ring-2
          ring-white
          size-2
          md:size-3
          "
        />
      )}
    </div>
  );
};

export default Avatar;
