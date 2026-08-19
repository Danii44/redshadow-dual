import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'lib', 'supabase-schema.sql');
    const content = fs.readFileSync(filePath, 'utf8');
    return new Response(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Could not load schema' }, { status: 500 });
  }
}
