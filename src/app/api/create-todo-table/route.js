import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  try {
    const result =
      await sql`CREATE TABLE todo (
                id SERIAL PRIMARY KEY,
                title TEXT,
                task TEXT,
                status VARCHAR(255),
                std_id NUMERIC,
                FOREIGN KEY (std_id) REFERENCES students(std_id)
              );`;
      return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}