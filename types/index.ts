import { User, Message, Conversation } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};

export type IKUploadResponse = {
  fileId: string;
  name: string;
  url: string;
  filePath: string;
  height: number;
  width: number;
  size: number;
  thumbnailUrl: string;
  fileType: string;
};
