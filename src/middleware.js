import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

export const middleware =  (request) => {
    console.log("REQ", request);
    const session =  getServerSession(authOptions);
    return NextResponse.next();
}

export const config = { matcher: ["/"] };
