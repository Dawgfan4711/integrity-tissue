// Next.js API route for verifying OTP (converted from JS to TS)


import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { phone, code } = body;

  if (!phone || !code) {
    return NextResponse.json({ error: 'Missing phone or code' }, { status: 400 });
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
  );

  try {
    const check = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID!)
      .verificationChecks.create({ to: phone, code });

    if (check.status === 'approved') {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 });
    }
  } catch (error) {
    const err = error as { message?: string };
    console.error('Twilio verify error:', error);
    return NextResponse.json({ error: err.message || 'Verification failed' }, { status: 500 });
  }
}
