"use client";

import EmptyState from "../_components/empty-state";
import clsx from "clsx";
import useConversation from "@/hooks/useConversation";

const Conversations = () => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx(
        `
        lg:pl-80
        h-full
        lg:block
        `,
        isOpen ? "block" : "hidden"
      )}
    >
      <EmptyState />
    </div>
  );
};

export default Conversations;
