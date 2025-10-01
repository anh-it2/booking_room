import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const payload = await req.json();

  const res = await fetch('http://localhost:8080/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
