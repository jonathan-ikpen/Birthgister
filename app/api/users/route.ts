import prismadb from "@/lib/prismadb";
import {NextRequest, NextResponse} from "next/server";

export async function OPTIONS(request: NextRequest) {
    const origin = request.headers.get('origin')

    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
            'Access-Control-Allow-Headers': 'Content-Type',
            'X-Cors-Public-Origin': origin || '*',
        }
    })
}


export async function POST(req: Request) {
    try {
        const corsOrigin = req.headers.get('Origin'); // Get the actual origin from the request

        // requesting data from frontend
        const body = await req.json();

        const { name, photo, email, dateofbirth, age, gender, place, town, mothersName, mothersResidence, mothersAgeAtBirth, mothersMaritalStatus, mothersNationality, mothersStateOfOrigin, mothersOccupation, mothersPhoneNumber, mothersNationalID, fathersName, fathersResidence, fathersCurrentAge, fathersNationality, fathersStateOfOrigin, fathersOccupation, fathersPhoneNumber, fathersNationalID, informantName, informantRelationshipToChild, informantResidence, informantNationalID, informantPhoneNumber, parentName, parentResidence, parentCurrentAge, parentNationality, parentStateOfOrigin, parentOccupation, parentPhoneNumber, parentNationalID, child, adult } = body;

        if(child) {
            const createdChildUser = await prismadb.user.create({
                data: {
                    email,
                    name,
                    dateofbirth,
                    age,
                    photo,
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
                data: createdChildUser
            }, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'X-Cors-Public-Origin': corsOrigin || '*',
                }
            })
        }

        if(adult) {
            const createdAdultUser = await prismadb.user.create({
                data: {
                    email,
                    name,
                    dateofbirth,
                    age,
                    photo,
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
                data: createdAdultUser
            }, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'X-Cors-Public-Origin': corsOrigin || '*',
                },
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
        const corsOrigin = req.headers.get('Origin'); // Get the actual origin from the request

        const users = await prismadb.user.findMany({
            include: {
                mother: true,
                father: true,
                informant: true,
                parent: true
            }
        });

        const corsHeaders = {
            'Access-Control-Allow-Origin': corsOrigin || '*', // Use the actual origin or '*' if not present
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'X-Cors-Public-Origin': corsOrigin || '*', // Set X-Cors-Public-Origin based on the actual origin or '*'
        };

        return NextResponse.json({
            users
        }, {
            status: 200,
            headers: corsHeaders,
        });
    } catch (error) {
        console.log("[Users_Get]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

