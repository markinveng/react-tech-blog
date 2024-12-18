import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header'
import styles from "@/app/works/page.module.scss"

export default function WorksPage() {
  

  return (
    <>
      <div className={`${styles.flexWrapper}`}>
        <Header />
        <main>
          <h1 className={`${styles.title}`}>Works</h1>
          <ul className={`${styles.tabList}`}>
            <li className={`${styles.tab}`}>Development</li>
            <li className={`${styles.tab}`}>Design</li>
            <li className={`${styles.tab}`}>Music</li>
          </ul>
          <ul className={`${styles.worksList}`}>
            <li className={`${styles.worksList}`}></li>
            <li className={`${styles.worksList}`}></li>
            <li className={`${styles.worksList}`}></li>
          </ul>
        </main>
        <Footer className={`${styles.footer}`} />
      </div>
    </>
  );
}