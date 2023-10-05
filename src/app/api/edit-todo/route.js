import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import NextCors from 'nextjs-cors';

export async function PUT(request){
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
    });
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
        }, 
        {
            status:200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        },
        )
    }else{
        return NextResponse.json({
            message:'Invalid Parametes',
            status: 401
        }, 
        {
            status: 401,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        })
    }
}