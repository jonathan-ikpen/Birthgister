import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // requesting data from frontend
        const body = await req.json();

        const { name, email, dateofbirth, age, gender, place, town, mothersName, mothersResidence, mothersAgeAtBirth, mothersMaritalStatus, mothersNationality, mothersStateOfOrigin, mothersOccupation, mothersPhoneNumber, mothersNationalID, fathersName, fathersResidence, fathersCurrentAge, fathersNationality, fathersStateOfOrigin, fathersOccupation, fathersPhoneNumber, fathersNationalID, informantName, informantRelationshipToChild, informantResidence, informantNationalID, informantPhoneNumber, parentName, parentResidence, parentCurrentAge, parentNationality, parentStateOfOrigin, parentOccupation, parentPhoneNumber, parentNationalID, child, adult } = body;

        if(child) {
            const createdChildUser = await prismadb.user.create({
                data: {
                    email,
                    name,
                    dateofbirth,
                    age,
                    gender,
                    place,
                    town,
                    mother: {
                        create: {
                            mothersName,
                            mothersResidence,
                            mothersAgeAtBirth,
                            mothersMaritalStatus,
                            mothersNationality,
                            mothersStateOfOrigin,
                            mothersOccupation,
                            mothersPhoneNumber,
                            mothersNationalID
                        }
                    },
                    father: {
                        create: {
                            fathersName,
                            fathersResidence,
                            fathersCurrentAge,
                            fathersNationality,
                            fathersStateOfOrigin,
                            fathersOccupation,
                            fathersPhoneNumber,
                            fathersNationalID
                        }
                    },
                    informant: {
                        create: {
                            informantName,
                            informantRelationshipToChild,
                            informantResidence,
                            informantPhoneNumber,
                            informantNationalID,
                        }
                    }
                }});
            return NextResponse.json({ data: createdChildUser });
        }

        if(adult) {
            const createdAdultUser = await prismadb.user.create({
                data: {
                    email,
                    name,
                    dateofbirth,
                    age,
                    gender,
                    place,
                    town,
                    parent: {
                        create: {
                            parentName,
                            parentResidence,
                            parentCurrentAge,
                            parentNationality,
                            parentStateOfOrigin,
                            parentOccupation,
                            parentPhoneNumber,
                            parentNationalID,
                        }
                    }
                }});
            return NextResponse.json({ data: createdAdultUser });
        }

        return NextResponse.json("Invalid Request",{status: 401});

    } catch (error) {
        console.log("[User_Post]", error);
        return new NextResponse("Internal error", { status: 500 });
    }

}

export async function GET(req: Request) {
    try {
        const users = await prismadb.user.findMany();
        return NextResponse.json({
            users,
        });
    } catch (error) {
        console.log("[Users_Get]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
