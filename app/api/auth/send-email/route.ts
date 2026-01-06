import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (request: Request) => {
  const { message, email } = await request.json();

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
    to: email,
    subject: `관리자 페이지 이메일 인증`,
    text: `
      아래 주소를 클릭하여 인증을 완료하시기 바랍니다.
      ${message}
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
