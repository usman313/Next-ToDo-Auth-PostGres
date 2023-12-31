import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { decrypPassword } from "@/helpers/bcryptPassword";

export async function GET(request){
    const {searchParams} = new URL(request.url)
    const email = searchParams.get('email');
    const pass = searchParams.get('password');
    try{
        if(!email || !pass){
            throw new Error("Credentials required")
        }
        const foundUser = await sql`SELECT * from students WHERE email=${email};`
        console.log('found user: ', foundUser)
        if(!foundUser){
            return NextResponse.json({message: 'User not found'}, {status: 200})
        }
        const decPass = await decrypPassword(pass, foundUser?.rows?.[0]?.password)

        if(decPass){
            return NextResponse.json(foundUser?.rows[0], {status: 200})
        }else{
            return NextResponse.json({message: 'Invalid Email or Password', status: 401}, {status: 401})
        }
    }catch(error){
        console.log('error', error)
        return NextResponse.json({error}, {status: 400})
    }
}