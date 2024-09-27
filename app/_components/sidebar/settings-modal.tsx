"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import ImageUplaod from "@/app/conversations/_components/image-upload";
import { MdEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";

interface Props {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: FC<Props> = ({ currentUser, isOpen, onClose }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (image: string) =>
    setValue("image", image, { shouldValidate: true });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        onClose();
        return router.refresh();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div
            className="
            border-b
            border-gray-900/10
            pb-12
            "
          >
            <h2
              className="
              text-base
              font-semibold
              leading-7
              text-gray-900
              "
            >
              Profile
            </h2>
            <p
              className="
              mt-1
              text-sm
              leading-6
              text-gray-600
              "
            >
              Edit your public information.
            </p>

            <div
              className="
              w-full
              mt-10
              flex
              flex-col
              gap-y-8
              "
            >
              <div>
                <Label
                  htmlFor="image"
                  className="
                  block
                  text-sm
                  font-medium
                  leading-6
                  text-gray-900
                  "
                >
                  Photo
                </Label>
                <div
                  className="
                  mt-2
                  flex
                  items-center
                  gap-x-3
                  relative
                  size-32
                  group
                  overflow-hidden
                  rounded-full
                  border-[1px]
                  border-neutral-300
                  "
                >
                  <ImageUplaod onImageSubmit={handleUpload}>
                    <Image
                      className="cursor-pointer object-cover"
                      src={
                        image || currentUser?.image || "/images/placeholder.jpg"
                      }
                      fill
                      alt="Logo"
                    />
                    <div
                      className="
                      absolute
                      inset-0
                      group-hover:bg-neutral-900/25
                      cursor-pointer
                      flex
                      items-center
                      justify-center
                      w-full
                      h-full
                      "
                    >
                      <MdEdit
                        size={28}
                        className="
                        text-white
                        opacity-0
                        group-hover:opacity-100
                        "
                      />
                    </div>
                  </ImageUplaod>
                </div>
              </div>
              <Label
                htmlFor="name"
                className="
                block
                text-sm
                font-medium
                leading-6
                text-gray-900
                "
              >
                Name
                <Input
                  id="name"
                  placeholder="Name"
                  disabled={isLoading}
                  autoComplete="name"
                  type="text"
                  {...register("name", { required: true })}
                  className={`
                  block
                  w-full
                  border-0
                  sm:text-sm
                  sm:leading-6
                  ${
                    errors["name"]
                      ? "focus-visible:ring-rose-500"
                      : "focus-visible:ring-sky-600"
                  }
                  `}
                />
              </Label>
            </div>
          </div>
          <div
            className="
            mt-6
            flex
            items-center
            justify-end
            gap-x-2
            "
          >
            <Button disabled={isLoading} variant="secondary" onClick={onClose}>
              Cancle
            </Button>
            <Button
              disabled={isLoading}
              variant="secondary"
              type="submit"
              className="
              bg-sky-500
              text-white
              hover:bg-sky-600
              transition
              "
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
