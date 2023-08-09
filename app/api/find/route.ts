import { NextResponse } from 'next/server';

export async function POST(res) {
  const data = await res.json();

  // @todo

  return NextResponse.json(data);
}
