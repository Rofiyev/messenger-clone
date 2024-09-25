import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, image } = body;

    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("Anuathorized", { status: 401 });

    if (!name || !image)
      return new NextResponse("Invalud DATA!", { status: 400 });

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(updateUser);
  } catch {
    return new NextResponse("Internal Error!", { status: 500 });
  }
}
