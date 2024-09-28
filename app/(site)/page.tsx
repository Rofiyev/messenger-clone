"use client";

import Image from "next/image";
import AuthForm from "@/app/_components/auth-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingModal from "../_components/loading-modal";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();
  const [pageLoading, setLoadingPage] = useState<boolean>(true);

  useEffect(() => {
    if (status === "authenticated") router.push("/users");
    else if (status === "unauthenticated") setLoadingPage(false);
  }, [status, router]);

  if (pageLoading) return <LoadingModal />;

  return (
    <div
      className="
      flex
      min-h-full
      flex-col
      justify-center
      py-12
      sm:px-6
      lg:px-8
      bg-gray-100
      "
    >
      <div
        className="
        sm:mx-auto
        sm:w-full
        sm:max-w-md
        "
      >
        <Image
          width={48}
          height={48}
          src="/images/logo.png"
          alt="Logo"
          className="mx-auto w-auto"
        />
        <h2
          className="
          mt-6
          text-center
          text-3xl
          font-bold
          tracking-tight
          text-gray-900
          "
        >
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
