import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request){
    const {task} = await request.json()
    try{
        if(!task){
            throw new Error('Title, Descriptiona and Status are requried')
        }
        await sql`INSERT INTO todo (title, task, status) VALUES ('No Title', ${task}, 'pending');`;
        return NextResponse.json({message: 'Todo Added Successfully'}, {status: 200})
    }catch(error){
        return NextResponse.json({ error }, { status: 500 });
    }
}