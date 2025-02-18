import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface User {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
}

async function getUser(): Promise<User | null> {
  const headersList = headers();
  const user = headersList.get('x-ms-client-principal');

  if (user) {
    const decodedUser = JSON.parse(Buffer.from(user, 'base64').toString('utf-8'));
    return decodedUser;
  }

  return null;
}

export async function GET() {
  const currentTime = new Date().toLocaleTimeString('en-US');
  const user = await getUser();

  return NextResponse.json({
    message: `Hello from the API! The current time is ${currentTime}.`,
    user
  });
}