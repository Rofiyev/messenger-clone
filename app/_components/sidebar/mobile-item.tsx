"use client";

import { FC, useCallback } from "react";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import clsx from "clsx";

interface Props {
  href?: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: FC<Props> = ({ icon: Icon, active, href, onClick }) => {
  const handleClick = useCallback(() => {
    if (onClick) return onClick();
  }, [onClick]);

  return (
    <Link
      href={href!}
      onClick={handleClick}
      className={clsx(
        `
      group
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
      transition-all`,
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon size={24} className="w-6 h-6" />
    </Link>
  );
};

export default MobileItem;
