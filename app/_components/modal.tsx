"use client";

import { FC, ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
