import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (
  conversation: FullConversationType | { users: User[] }
) => {
  const { data: session } = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.user?.email;

    const otherUser = conversation.users.filter(
      (user: User) => user.email !== currentUserEmail
    );

    return otherUser[0];
  }, [conversation.users, session?.user?.email]);

  return { otherUser };
};

export default useOtherUser;
