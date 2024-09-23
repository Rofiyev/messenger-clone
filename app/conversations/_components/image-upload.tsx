"use client";

import { FC, ReactNode } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import toast from "react-hot-toast";
import { IKUploadResponse } from "@/types";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

interface Props {
  children: ReactNode;
  onImageSubmit: (image: string) => void;
}

const ImageUplaod: FC<Props> = ({ children, onImageSubmit }) => {
  const authenticator = async () => {
    try {
      const response = await fetch("/api/image-auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch {
      throw new Error(`Authentication request failed`);
    }
  };

  const onError = () => toast.error("Image upload error!");

  const onSuccess = (res: IKUploadResponse) => onImageSubmit(res.url);

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <form>
        <label htmlFor="file-upload">{children}</label>
        <IKUpload
          folder={"/Messenger-clone"}
          useUniqueFileName
          onError={onError}
          onSuccess={onSuccess}
          multiple={false}
          accept="image/*"
          id="file-upload"
          style={{ display: "none" }}
        />
      </form>
    </ImageKitProvider>
  );
};

export default ImageUplaod;
