import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  try {
    const result =
      await sql`CREATE TABLE students (
                id serial PRIMARY KEY,
                std_id NUMERIC UNIQUE,
                username VARCHAR(255) UNIQUE, 
                email TEXT UNIQUE, 
                password VARCHAR(255)
              );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
