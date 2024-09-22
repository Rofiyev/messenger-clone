import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) return [];

    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return conversations;
  } catch {
    return [];
  }
};

export default getConversations;
