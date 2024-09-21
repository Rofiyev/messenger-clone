"use client";

import { FC } from "react";
import { User } from "@prisma/client";
import Image from "next/image";

interface Props {
  user: User;
}

const Avatar: FC<Props> = ({ user }) => {
  return (
    <div className="relative">
      <div
        className="
        relative
        inline-block
        rounded-full
        overflow-hidden
        size-9
        md:size-11
        "
      >
        <Image
          src={user?.image ?? "/images/placeholder.jpg"}
          alt="Avatar"
          fill
        />
      </div>
    </div>
  );
};

export default Avatar;
