"use client";

import { FC, useCallback } from "react";
import Link from "next/link";
import clsx from "clsx";
import { IconType } from "react-icons/lib";

interface Props {
  label: string;
  href?: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

const DesktopItem: FC<Props> = ({
  icon: Icon,
  label,
  active,
  href,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    if (onClick) onClick();
  }, [onClick]);

  return (
    <li onClick={handleClick}>
      <Link
        href={href!}
        className={clsx(
          `
          group
          flex
          gap-x-3
          rounded-md
          p-3
          text-sm
          leading-6
          font-semibold
          text-gray-500
          hover:text-black
          hover:bg-gray-100
          transition-all`,
          active && "bg-gray-100 text-black"
        )}
      >
        <Icon size={24} className="w-6 h-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
