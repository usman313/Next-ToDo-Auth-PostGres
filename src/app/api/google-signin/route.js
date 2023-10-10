import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request){
    const {searchParams} = new URL(request.url)
    console.log('recieved data: ', searchParams.get('email'))
    return null
}