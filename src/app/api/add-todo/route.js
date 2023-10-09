import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request){
    const {payload} = await request.json()
    try{
        if(!payload){
            throw new Error('Title, Descriptiona and Status are requried')
        }
        await sql`INSERT INTO todo (title, task, status, std_id) VALUES ('No Title', ${payload?.task}, 'pending', ${payload?.std_id});`;
        return NextResponse.json({
            message: 'Todo Added Successfully',
            status: 200,
        }, 
        {
            status: 200
        })
    }catch(error){
        return NextResponse.json({ error }, { status: 500 });
    }
}