import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request){
  const result = await sql`SELECT * from todo`
  const resp = {
    data: result?.rows,
    count: result?.rowCount,
    status: 200
  }
  console.log('result', resp)
  return NextResponse.json(resp, { status: 200 });
}