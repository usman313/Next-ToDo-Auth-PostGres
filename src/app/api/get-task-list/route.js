import { createClient } from '@vercel/postgres';
import { NextResponse } from "next/server";

export async function GET(request){
  const client = createClient();
  await client.connect();
  let result
  try{
    result = await client.sql`SELECT * from todo`
  }finally{
    await client.end();
  }
  const resp = {
    data: result?.rows,
    count: result?.rowCount,
    status: 200
  }
  return NextResponse.json(resp, 
    { 
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      } 
    });
}