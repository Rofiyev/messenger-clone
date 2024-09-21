"use client";

import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import AuthContext from "@/context/auth-context";

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <AuthContext>
      <Toaster position="top-center" reverseOrder={true} />
      {children}
    </AuthContext>
  );
};

export default Providers;
