import { encryptPassword } from '@/helpers/bcryptPassword';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, password } = await request.json()
  if (!email || !password) throw new Error('Email and Password names required');
  const result = await sql`SELECT * FROM students WHERE email = ${email}`
  if(result?.rows?.length){
    return NextResponse.json({message: 'User  already Exists'}, {status: 300})
  }

  const encPass = await encryptPassword(password)

  try {
    await sql`INSERT INTO students (email, password) VALUES (${email}, ${encPass});`;
    return NextResponse.json({ message: 'User added Successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

}