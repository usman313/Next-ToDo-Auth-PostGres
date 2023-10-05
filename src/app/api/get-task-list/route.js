import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request){
  const result = await sql`SELECT * from todo`
  return NextResponse.json({result}, {status: 200})
}