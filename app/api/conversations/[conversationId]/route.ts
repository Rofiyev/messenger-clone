import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  conversationId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!conversationId) {
      return new NextResponse("Invalid Conversation ID", { status: 400 });
    }

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isExistConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!isExistConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deleteConversation = await prisma.conversation.delete({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    return NextResponse.json(deleteConversation);
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
