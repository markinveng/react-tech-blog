"use client"
import Header from '@/components/header/Header'
import styles from "@/app/home.module.scss"
import Profile from '@/components/profile/Profile';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export default function Home() {

  return (
    <>
      <Header />
      <div className={`${styles.flexWrapper}`}>
        <main className={styles.mainWrapper}>
          <section className={styles.swiperWrapper}>
            {/* スタイリング中はAutoplayをつけない */}
            <Swiper modules={[Navigation, Pagination]}
              navigation={{ prevEl: "#button_prev", nextEl: "#button_next" }}
              pagination={{ clickable: true }}
              touchEventsTarget='container'
              autoplay
              loop={true}
            >
              <SwiperSlide>
                <h1 className={`${styles.keyVisualTitle}`}>Maiami is a <br /> frontend and mobile <br /> app developer</h1>
              </SwiperSlide>
              <SwiperSlide>
                <section className={`${styles.aboutThisSite}`}>
                  <h2 className={`${styles.aboutThisSiteTitle}`}>About this site</h2>
                  <p className={`${styles.aboutThisSiteDetail}`}>This site is Maiamis portfolio site.<br />I compile my past work history and the technology I use.<br />I would like to send out a lot of information so that I can try new things.</p>
                </section>
              </SwiperSlide>
              <SwiperSlide>
                <section>
                  <h2 className={`${""}`}>About me</h2>
                  <p className={`${""}`}>Engineer born and raised in Tokyo.After graduating from the Department of Information Engineering, he got a job at a web production company and worked as a front-end and mobile application engineer.</p>
                </section>
              </SwiperSlide>
              <SwiperSlide>
                <section>
                  <h2 className={`${""}`}>Skill</h2>
                  <p>This is a Skill Area</p>
                </section>
              </SwiperSlide>
            </Swiper>
            <div id="button_prev" className="swiper-button-prev"></div>
            <div id="button_next" className="swiper-button-next"></div>
          </section>
        </main>
        <Profile />
      </div>
    </>
  );
}