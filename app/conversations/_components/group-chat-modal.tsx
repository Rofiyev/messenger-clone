"use client";

import Modal from "@/app/_components/modal";
import Select from "@/app/_components/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: FC<Props> = ({ isOpen, onClose, users }) => {
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
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post(`/api/conversations`, { ...data, isGroup: true })
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
              Create a group chat
            </h2>
            <p
              className="
              mt-1
              text-sm
              leading-6
              text-gray-600
              "
            >
              Create a chat group more than 2 people.
            </p>
            <div
              className="
              mt-10
              flex
              flex-col
              gap-y-8
              "
            >
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
                  autoComplete="off"
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
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user: User) => ({
                  value: user.id,
                  label: user.name || "",
                }))}
                onChange={(value) =>
                  setValue("members", value, { shouldValidate: true })
                }
                value={members}
              />
            </div>
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
          <Button 
          disabled={isLoading} variant="secondary" onClick={onClose}>
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
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
