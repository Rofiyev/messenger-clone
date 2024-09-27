"use client";

import Link from "next/link";
import { FC, useState } from "react";
import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./mobile-item";
import Avatar from "../avatar";
import { User } from "@prisma/client";
import SettingsModal from "./settings-modal";

interface Props {
  currentUser: User;
}

const MobileFooter: FC<Props> = ({ currentUser }) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);

  if (isOpen) {
    return null;
  }

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpenSetting}
        onClose={() => setIsOpenSetting(false)}
      />
      <div
        className="
        fixed
        justify-between
        w-full
        bottom-0
        z-40
        flex
        items-center
        bg-white
        border-t-[1px]
        lg:hidden
        "
      >
        {routes.map((item) => (
          <MobileItem
            key={item.label}
            href={item.href}
            icon={item.icon}
            active={item.active}
            onClick={item.onClick}
          />
        ))}
        <Link
          href={"#"}
          onClick={() => setIsOpenSetting(true)}
          className="
          flex
          gap-x-3
          text-sm
          leading-6
          font-semibold
          w-full
          justify-center
          p-4
          text-gray-500
          hover:text-black
          hover:bg-white
          transition-all
          "
        >
          <div
            className="
            cursor-pointer
            hover:opacity-75
            transition
            "
          >
            <Avatar user={currentUser} />
          </div>
        </Link>
      </div>
    </>
  );
};

export default MobileFooter;
