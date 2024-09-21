"use client";

import { FC } from "react";
import { User } from "@prisma/client";
import {
  Avatar as AvatarUI,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

interface Props {
  user: User;
}

const Avatar: FC<Props> = ({ user }) => {
  return (
    <AvatarUI className="size-9 md:size-11">
      <AvatarImage src={user?.image ?? "/images/placeholder.jpg"} />
      <AvatarFallback>{user.image?.slice(0).toUpperCase()}</AvatarFallback>
    </AvatarUI>
  );
};

export default Avatar;
