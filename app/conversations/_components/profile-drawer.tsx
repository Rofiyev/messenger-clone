"use client";

import { FC, useMemo } from "react";
import { Conversation, User } from "@prisma/client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useOtherUser from "@/hooks/useOtherUser";
import { format } from "date-fns";
import { FaXmark } from "react-icons/fa6";
import Avatar from "@/app/_components/avatar";
import { IoTrash } from "react-icons/io5";

interface Props {
  conversation: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: FC<Props> = ({ conversation, isOpen, onClose }) => {
  const { otherUser } = useOtherUser(conversation);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "p");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return conversation.name || otherUser.name;
  }, [conversation.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;

    return "Active";
  }, [conversation]);

  return (
    <Drawer open={isOpen} direction="right" onClose={onClose}>
      <DrawerContent
        className="
        h-screen
        top-0
        right-0
        left-auto
        mt-0
        max-w-md
        rounded-none
        border-none
        outline-none
        "
      >
        <DrawerHeader>
          <div
            className="
            w-full
            flex
            justify-end
            "
          >
            <FaXmark
              onClick={onClose}
              size={24}
              className="
              text-neutral-600
              rounded-md
              cursor-pointer
              hover:scale-110
              transition
              "
            />
          </div>
          <DrawerTitle>
            <div
              className="
              relative
              flex-1
              mt-6
              px-4
              sm:px-6
              "
            >
              <div
                className="
                flex
                flex-col
                items-center
                "
              >
                <div className="mb-2">
                  <Avatar user={otherUser} />
                </div>
                <div>{title}</div>
                <div className="text-sm text-gray-500">{statusText}</div>
                <div
                  className="
                  flex
                  gap-10
                  my-8
                  "
                >
                  <div
                    onClick={() => {}}
                    className="
                    flex
                    flex-col
                    items-center
                    cursor-pointer
                    hover:opacity-75
                    "
                  >
                    <div
                      className="
                      w-10
                      h-10
                      bg-neutral-100
                      rounded-full
                      flex
                      items-center
                      justify-center
                      "
                    >
                      <IoTrash size={20} className="text-red-600" />
                    </div>
                    <div
                      className="
                      text-sm
                      font-light
                      text-neutral-600
                      "
                    >
                      Delete
                    </div>
                  </div>
                </div>
                <div
                  className="
                  w-full
                  pt-5
                  pb-5
                  sm:px-0
                  sm:pt-0
                  "
                >
                  <dl
                    className="
                    space-y-8
                    px-4
                    sm:space-y-6
                    sm:px-6
                    "
                  >
                    {!conversation.isGroup && (
                      <div>
                        <dt
                          className="
                          text-sm
                          font-medium
                          text-gray-500
                          sm:w-40
                          sm:flex-shrink-0
                          "
                        >
                          Email
                        </dt>
                        <dd
                          className="
                          mt-1
                          text-sm
                          text-gray-900
                          sm:col-span-2
                          "
                        >
                          {otherUser.email}
                        </dd>
                      </div>
                    )}
                    {!conversation.isGroup && (
                      <>
                        <hr />
                        <div className="">
                          <dt
                            className="
                            text-sm
                            font-medium
                            text-gray-500
                            sm:w-40
                            sm:flex-shrink-0
                            "
                          >
                            Joined
                          </dt>
                          <dd
                            className="
                            mt-1
                            text-sm
                            text-gray-900
                            sm:col-span-2
                            "
                          >
                            <time dateTime={joinedDate}>{joinedDate}</time>
                          </dd>
                        </div>
                      </>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </DrawerTitle>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDrawer;
