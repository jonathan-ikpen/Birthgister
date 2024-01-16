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
                },
                include: {
                    mother: true,
                    father: true,
                    informant: true,
                }
            });
            return NextResponse.json({
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
                data: createdChildUser
            });
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
                },
                include: {
                    parent: true,
                }
            });
            return NextResponse.json({
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
                data: createdAdultUser
            });
        }

        return NextResponse.json("Invalid Request",{status: 401});

    } catch (error) {
        console.log("[User_Post]", error);
        return new NextResponse("Internal error", { status: 500 });
    }

}

export async function GET(req: Request) {
    try {
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
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error) {
        console.log("[Users_Get]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
