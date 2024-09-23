"use client";

import { FC, ReactElement, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: ReactElement;
  disabled?: boolean;
}

const Modal: FC<Props> = ({ onClose, body, disabled, isOpen, title }) => {
  const handleClose = useCallback(() => {
    if (disabled) return;

    onClose();
  }, [disabled, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 lg:left-[400px] z-50 outline-none bg-gray-100 focus:outline-none bg-opacity-70">
        <div className="relative w-[95%] max-w-96 lg:h-auto">
          {/* Content */}
          <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-center justify-between p-2 sm:p-5 rounded-t ">
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                {title}
              </h3>
              <button
                onClick={handleClose}
                className="p-1 ml-auto border-0 text-gray-900 hover:opacity-70 transition"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/* Body */}
            <div className="relative px-4 sm:px-5 pb-2 sm:pb-5 flex-auto">{body}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
