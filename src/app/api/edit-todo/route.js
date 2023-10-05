import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function PUT(request){
    const{id, title, description, status} = await request.json()
    const result = await sql`UPDATE todo 
                            SET 
                                title=${title}, 
                                task=${description}, 
                                status=${status}
                            WHERE 
                                id=${id};`

    if(result.rowCount > 0){
        return NextResponse.json({
            status: 'OK',
            message: `Task ${title} edited Successfully`
        }, {status:200})
    }else{
        return NextResponse.json({
            message:'Invalid Parametes',
            status: 401
        }, {status: 401})
    }
}