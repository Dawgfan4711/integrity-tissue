// Next.js API route for sending OTP (converted from JS to TS)


import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const body = await req.json();
  const { phone } = body;

  if (!phone) {
    return NextResponse.json({ error: 'Missing phone' }, { status: 400 });
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
  );

  try {
    await client.verify.v2.services(process.env.TWILIO_VERIFY_SID!)
      .verifications.create({ to: phone, channel: 'sms' });
    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as { message?: string };
    console.error(error);
    return NextResponse.json({ error: err.message || 'Failed to send code' }, { status: 500 });
  }
}
