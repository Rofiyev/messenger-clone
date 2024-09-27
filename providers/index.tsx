"use client";

import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import AuthContext from "@/context/auth-context";
import ActiveStatus from "@/app/_components/active-status";

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <AuthContext>
      <Toaster position="top-center" reverseOrder={true} />
      <ActiveStatus />
      {children}
    </AuthContext>
  );
};

export default Providers;
