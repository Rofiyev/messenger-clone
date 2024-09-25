"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <section
      className="
      bg-white
      min-h-screen
      flex
      items-center
      "
    >
      <div
        className="
        container
        h-full
        mx-auto
        lg:flex
        lg:items-center
        lg:justify-between
        lg:gap-8
        "
      >
        <div className="w-full lg:w-1/2">
          <p
            className="
            text-sm
            font-medium
            text-blue-500
            dark:text-blue-400
            "
          >
            404 error
          </p>
          <h1
            className="
            mt-3
            text-2xl
            font-semibold
            text-gray-800
            dark:text-white
            md:text-3xl
            "
          >
            Page not found
          </h1>
          <p
            className="
            mt-4
            text-gray-500
            dark:text-gray-400
            "
          >
            {
              "Sorry, the page you are looking for doesn't exist. Here are some helpful links:"
            }
          </p>

          <div
            className="
            flex
            items-center
            mt-6
            gap-x-3
            "
          >
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex gap-2"
            >
              <FaArrowLeftLong size={24} className="text-neutral-500" />
              <span>Go back</span>
            </Button>

            <Button
              variant="destructive"
              onClick={() => router.push("/")}
              className="
              bg-sky-500
              hover:bg-sky-600
              transition
              "
            >
              Go to home
            </Button>
          </div>
        </div>

        <div
          className="
          relative
          w-full
          mt-12
          lg:w-1/2
          lg:mt-0
          "
        >
          <Image
            className="
            w-full
            lg:mx-auto
            "
            src="/images/404.svg"
            alt="Image"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
