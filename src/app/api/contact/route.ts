import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// もし認証情報を .env などで設定しているなら、ENV から読み込む
// process.env.GMAIL_ADDRESS
// process.env.GMAIL_PASSWORD
// process.env.CONTACT_RECEIVE_ADDRESS

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { name, email, message, subject } = await req.json();
    // バリデーション
    if (!name || !email || !message || !subject) {
      return NextResponse.json({ error: "Required fields are not filled in" }, { status: 400 });
    }

    // Nodemailer でメール送信のためのTransportを作成
    const transporter: nodemailer.Transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    
    // メール送信のオプション
    const mailOptions: nodemailer.SendMailOptions = {
      from: email, // ユーザーが入力したメールアドレスをFromに使う場合
      to: process.env.CONTACT_RECEIVE_ADDRESS, // 管理者用の受信先（自分のGmailなど）
      subject: `${subject}`, // 件名
      text: `Name: ${name}\nMail: ${email}\n\nMessage:\n${message}`,
    };

    // メール送信
    await transporter.sendMail(mailOptions);

    console.log("aaa");

    // 成功レスポンス
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error Occurred:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}