import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";



export async function GET(req: Request, { params }: { params?: { userId: number } }) {
    try {
        if(params?.userId) {
            const user = await prismadb.user.findUnique({
                where: {
                    id: Number(params.userId),
                },
                include: {
                    mother: true,
                    father: true,
                    informant: true,
                    parent: true
                }
            })
            return NextResponse.json({
                user,
            })
        }

        if(!params?.userId) {
            const users = await prismadb.user.findMany({
                include: {
                    mother: true,
                    father: true,
                    informant: true,
                    parent: true
                }
            });
            return NextResponse.json({
                users,
            });
        }
    } catch (error) {
        console.log("[Users_Get]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}