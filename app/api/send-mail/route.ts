import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (request: Request) => {
  const { inputName, inputDuty, inputTel, inputKinds } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NAVER_USER,
      pass: process.env.NAVER_PASS,
    },
  });

  const mailOptions = {
    from: process.env.NAVER_USER,
    to: process.env.NAVER_USER,
    subject: `[사역신청] ${inputName}`,
    text: `
    이름: ${inputName}
    직분: ${inputDuty}
    연락처: ${inputTel}
    신청분야: ${inputKinds}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: true });
  } catch (error) {
    console.error("메일 전송 실패:", error);
    return NextResponse.json({ message: false }, { status: 500 });
  }
};
