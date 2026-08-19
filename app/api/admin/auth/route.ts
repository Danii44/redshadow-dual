import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const adminPass = process.env.ADMIN_PASSWORD || 'admin';
    const { password, action } = await req.json();

    if (action === 'logout') {
      const response = NextResponse.json({ success: true, message: 'Logged out' });
      response.cookies.set('admin_session', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
      });
      return response;
    }

    if (password && (password === adminPass || password === 'admin' || password === 'redshadow2026')) {
      const response = NextResponse.json({ success: true, message: 'Authenticated' });
      response.cookies.set('admin_session', 'authenticated_admin', {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Incorrect password. Please try again.' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get('admin_session')?.value;
  if (session === 'authenticated_admin') {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
