import { NextRequest, NextResponse } from 'next/server';
import {
  createAdminSessionToken,
  getAdminSessionCookieName,
  isValidAdminPassword,
  isValidAdminSession,
} from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { password, action } = await req.json();
    const cookieName = getAdminSessionCookieName();

    if (action === 'logout') {
      const response = NextResponse.json({ success: true, message: 'Logged out' });
      response.cookies.set(cookieName, '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      return response;
    }

    if (!isValidAdminPassword(password)) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true, message: 'Authenticated' });
    response.cookies.set(cookieName, createAdminSessionToken(), {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8,
    });
    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: 'Authentication service is not configured correctly.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get(getAdminSessionCookieName())?.value;

  if (isValidAdminSession(session)) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
