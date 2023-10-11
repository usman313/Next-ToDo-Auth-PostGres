import { encryptPassword } from '@/helpers/bcryptPassword';
import generateBigInteger from '@/helpers/randomNumbers';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const payload = await request.json()
  if (!payload.email || !payload.password) throw new Error('Email and Password names required');
  const result = await sql`SELECT * FROM students WHERE email = ${payload.email}`
  if(result?.rows?.length){
    return NextResponse.json({message: 'User  already Exists'}, {status: 300})
  }

  const encPass = await encryptPassword(payload.password)

  let success = false
  let number = null;
  while(!success){
    number = generateBigInteger();
    const checkRandNumber = await sql`SELECT * FROM students WHERE std_id = ${number};`
    if(checkRandNumber?.rowCount === 0){
      success = true
    }
  }

  try {
    const response = await sql`INSERT INTO students 
                              (email, std_id, name, password) 
                              VALUES (
                                ${payload.email}, 
                                ${number},
                                ${payload.username},
                                ${encPass}
                              );`;
    return NextResponse.json({ message: 'User added Successfully' }, { status: 200 });
  } catch (error) {
    console.log('error: ', error)
    return NextResponse.json({ error }, { status: 500 });
  }

}