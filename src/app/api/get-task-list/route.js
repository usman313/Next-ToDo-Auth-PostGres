import { createClient } from '@vercel/postgres';
import { NextResponse } from "next/server";

export async function GET(request){
  const client = createClient();
  await client.connect();
  const {searchParams} = new URL(request.url)
  const id = searchParams.get('std_id');
  let result
  try{
    result = await client.sql`SELECT * from todo where std_id = ${id}`
  }finally{
    await client.end();
  }
  const resp = {
    data: result?.rows,
    count: result?.rowCount,
    status: 200
  }
  return NextResponse.json(resp, { status: 200 });
}