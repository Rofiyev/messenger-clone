"use client";

import { useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useConversation from "@/hooks/useConversation";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUplaod from "./image-upload";
import toast from "react-hot-toast";

const Form = () => {
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    setValue("message", "", { shouldValidate: true });
    axios
      .post("/api/messages", {
        ...data,
        conversationId,
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  const onImageSubmit = (image: string) => {
    axios
      .post("/api/messages", {
        image: image,
        conversationId,
      })
      .then((res) => console.log(res.data))
      .catch(() => toast.error("Error in sending image"));
  };

  return (
    <div
      className="
      bg-white
      p-4
      border-t
      flex
      items-center
      gap-2
      lg:gap-4
      w-full
      "
    >
      <ImageUplaod onImageSubmit={onImageSubmit}>
        <HiPhoto
          size={30}
          className="
          text-sky-500
          hover:text-sky-600
          transition
          cursor-pointer
          "
        />
      </ImageUplaod>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
        "
      >
        <Input
          id="message"
          type="text"
          {...register("message", { required: true })}
          placeholder="Write a message"
          disabled={isLoading}
          autoComplete="off"
          className={`
          rounded-full
          bg-neutral-100
          ring-0
          px-4
          block
          w-full
          border-0
          ${
            errors["message"]
              ? "focus-visible:ring-rose-500"
              : "focus-visible:ring-sky-600"
          }
            `}
        />
        <Button
          type="submit"
          className="
          bg-sky-500
          p-2
          rounded-full
          hover:bg-sky-600
          transition
          "
        >
          <HiPaperAirplane size={18} />
        </Button>
      </form>
    </div>
  );
};

export default Form;
