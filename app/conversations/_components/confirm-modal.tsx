"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useConversation from "@/hooks/useConversation";
import Modal from "@/app/_components/modal";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal: FC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDelete = async () => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        return router.refresh();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div
          className="
          mx-auto
          flex
          h-12
          w-12
          flex-shrink-0
          items-center
          justify-center
          rounded-full
          bg-red-100
          sm:mx-0
          sm:h-10
          sm:w-10
          "
        >
          <FiAlertTriangle className="size-6 text-red-600" />
        </div>
        <div
          className="
          mt-3
          text-center
          sm:ml-4
          sm:mt-0
          sm:text-left
          "
        >
          <h3
            className="
            text-base
            font-semibold
            leading-6
            text-gray-900
            "
          >
            Delete conversation
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div
        className="
        mt-5
        sm:mt-4
        sm:flex
        sm:flex-row-reverse
        gap-2
        "
      >
        <Button variant="destructive" disabled={isLoading} onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
