import { NextResponse } from 'next/server';

const MAX_FIELD_LENGTH = 5000;

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const accessKey = process.env.WEB3FORMS_KEY;
    const name = asString(body?.name);
    const email = asString(body?.email);
    const subject = asString(body?.subject);
    const message = asString(body?.message);

    if (!accessKey) {
      return NextResponse.json({ success: false, message: 'Form service is not configured.' }, { status: 500 });
    }

    if (!name || !email || !message || [name, email, subject, message].some((field) => field.length > MAX_FIELD_LENGTH)) {
      return NextResponse.json({ success: false, message: 'Please provide valid form details.' }, { status: 400 });
    }

    const upstreamResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject,
        message,
        from_name: asString(body?.from_name) || 'Red Shadow Designs Portfolio',
      }),
    });

    const result = await upstreamResponse.json();
    return NextResponse.json(result, { status: upstreamResponse.status });
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid form request.' }, { status: 400 });
  }
}
