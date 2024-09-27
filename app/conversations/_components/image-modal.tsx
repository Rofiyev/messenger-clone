"use client";

import Modal from "@/app/_components/modal";
import Image from "next/image";
import { FC } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: FC<Props> = ({ onClose, isOpen, src }) => {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Image
        src={src}
        width={0}
        height={0}
        sizes="100vw"
        alt="Image"
        className="
        object-contain
        h-full
        w-full
        "
      />
    </Modal>
  );
};

export default ImageModal;
