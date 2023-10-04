import { encryptPassword } from '@/helpers/bcryptPassword';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const password = searchParams.get('password');

  const encPass = await encryptPassword(password)
 
  try {
    if (!email || !password) throw new Error('Email and Password names required');
    await sql`INSERT INTO students (email, password) VALUES (${email}, ${encPass});`;
    return NextResponse.json({ message: 'User added Successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
}