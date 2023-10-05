import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function DELETE(request){
    const {id} = await request.json();
    const result = await sql`DELETE FROM todo WHERE id=${id}`
    if(result?.rowCount === 1){
        return NextResponse.json({message: 'Todo DeletedSuccessfully'}, {status: 200})
    }else{
        return NextResponse.json(
        {
            message: "Task doesn't exist",
            status: 401,
        }, 
        {
            status: 
            400
        }
    )}
}