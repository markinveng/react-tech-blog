"use client"
import Header from '@/components/header/Header'
import styles from "@/app/home.module.scss"
import Profile from '@/components/profile/Profile';

export default function Home() {

  return (
    <>
      <Header />
      <div className={`${styles.flexWrapper}`}>
        <main className={styles.mainWrapper}>
          <section>
            <h1 className={`${styles.keyVisualTitle}`}>Maiami is a <br /> frontend and mobile <br /> app developer</h1>
            <section>
              <h2 className={`${""}`}>About this site</h2>
              <p className={`${""}`}>This site is Maiami&apos;s portfolio site. I compile my past work history and the technology I use. I would like to send out a lot of information so that I can try new things.</p>
            </section>
            <section>
              <h2 className={`${""}`}>About me</h2>
              <p className={`${""}`}>Engineer born and raised in Tokyo.After graduating from the Department of Information Engineering, he got a job at a web production company and worked as a front-end and mobile application engineer.</p>
            </section>
            <h2 className={`${""}`}>Skill</h2>
            <p>This is a Skill Area</p>
          </section>
        </main>
        <Profile />
      </div>
    </>
  );
}