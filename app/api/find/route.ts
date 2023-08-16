import { NextResponse } from 'next/server';

export async function GET(res) {
  const data = await res.json();

  // @todo

  return NextResponse.json(data);
}
