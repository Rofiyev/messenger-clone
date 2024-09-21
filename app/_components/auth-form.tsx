"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const router = useRouter();
  const session = useSession();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (session.status === "authenticated") router.push("/users");
  }, [session.status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: { email: "", name: "", password: "" },
  });

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") setVariant("REGISTER");
    else setVariant("LOGIN");
  }, [variant]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          toast.success("Sign Up Successfully!");
          signIn("credentials", data);
          reset();
          router.push("/users");
        })
        .catch(() => toast.error("Sign Up failure!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.ok && !callback.error) {
            toast.success("Sign In successfully");
            reset();
            router.push("/users");
          }
          if (callback?.error) toast.error("Sign In failure!");
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.ok && !callback.error) {
          toast.success("Sign In successfully");
          reset();
          router.push("/users");
        }
        if (callback?.error) toast.error("Sign In failure!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="
      mt-8
      sm:mx-auto
      sm:w-full
      sm:max-w-md
      "
    >
      <div
        className="
      bg-white
        px-4 
        py-8 
        shadow 
        sm:rounded-lg
        sm:px-10
        "
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
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
          )}
          <Label
            htmlFor="email"
            className="
            block
            text-sm
            font-medium
            leading-6
            text-gray-900
            "
          >
            Email address
            <Input
              id="email"
              placeholder="Email"
              disabled={isLoading}
              autoComplete="email"
              type="email"
              {...register("email", { required: true })}
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
          <Label
            htmlFor="password"
            className="
            block
            text-sm
            font-medium
            leading-6
            text-gray-900
            "
          >
            Password
            <Input
              id="password"
              placeholder="Password"
              disabled={isLoading}
              autoComplete="password"
              type="password"
              {...register("password", { required: true })}
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
          <div className="">
            <Button
              type="submit"
              disabled={isLoading}
              className="
              w-full
              bg-sky-600
              hover:opacity-80
              hover:bg-sky-600
              transition
              "
            >
              {variant === "LOGIN" ? "Sign In" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
              absolute
              inset-0
              flex
              items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div
              className="
                relative
                flex
                justify-center
                text-sm
                "
            >
              <span
                className="
                 bg-white
                  px-2
                  text-gray-500
                  "
              >
                Or continue with
              </span>
            </div>
          </div>
          <div
            className="
            mt-6
            flex
            gap-2
            "
          >
            <Button
              disabled={isLoading}
              variant="outline"
              onClick={() => socialAction("github")}
              className="w-full transition"
            >
              <BsGithub size={16} className="opacity-75" />
            </Button>
            <Button
              disabled={isLoading}
              variant="outline"
              onClick={() => socialAction("google")}
              className="w-full transition"
            >
              <BsGoogle size={16} className="opacity-75" />
            </Button>
          </div>
        </div>
        <div
          className="
          flex
          gap-2
          justify-center
          text-sm
          mt-6
          px-2
          text-gray-500
          "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div
            onClick={toggleVariant}
            className="
            underline cursor-pointer
            "
          >
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
