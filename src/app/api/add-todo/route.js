import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request){
    const {payload} = await request.json()
    console.log('entered task with title', payload)
    try{
        if(!payload){
            throw new Error('Title, Description and Status are requried')
        }
        await sql`INSERT INTO todo 
                (title, task, status, std_id) 
                VALUES (
                    ${payload.title}, 
                    ${payload?.task}, 
                    ${payload.status}, 
                    ${payload?.std_id}
                );`;
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