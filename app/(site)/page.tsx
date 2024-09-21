import Image from "next/image";
import AuthForm from "@/app/_components/auth-form";

export default function Home() {
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
