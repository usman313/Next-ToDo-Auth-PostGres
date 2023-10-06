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
  console.log('get tasks result: ', resp)
  return NextResponse.json(resp, { status: 200 });
}