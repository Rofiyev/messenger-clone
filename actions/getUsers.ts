import prisma from "@/lib/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return [];

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch {
    return [];
  }
};

export default getUsers;
