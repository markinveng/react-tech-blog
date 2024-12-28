"use client";

import Header from "@/components/header/Header";
import styles from "@/app/contact/page.module.scss";
import { FormEvent, useState } from "react";
import Footer from "@/components/footer/Footer";

export default function ContactPage(): JSX.Element {
  const [subject, setSubject] = useState("Request for Work");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // 送信イベント
  const handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 送信データ
    const formData: { name: string; email: string; message: string, subject: string } = { name, email, message, subject };

    try {
      // API Route に POST
      const res: Response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // ステータスがエラーの場合
        throw new Error("Failed to send");
      }

      // 成功時の処理
      alert("Submitted successfully");
      // 入力をクリア
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className={styles.flexWrapper}>
        <Header />
        <main className={styles.main}>
          <h1 className={styles.title}>Contact</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.subjectWrapper}>
              <label className={styles.label}>Subject</label>
              <select className={styles.subjectSelect} value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="Request for Work">Request for Work</option>
                <option value="Request site modifications">Request site modifications</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.nameWrapper}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                required
                className={styles.nameInput}
              />
            </div>

            <div className={styles.emailWrapper}>
              <label className={styles.label}>Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                className={styles.emailInput}
              />
            </div>

            <div className={styles.messageWrapper}>
              <label className={styles.label}>Message</label>
              <textarea
                value={message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                rows={5}
                required
                className={styles.messageInput}
              />
            </div>
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        </main>
        <Footer className={`${styles.footer}`} />
      </div>
    </>
  );
}