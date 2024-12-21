import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header'
import styles from "@/app/blog/page.module.scss"


export default async function BlogPage(): Promise<JSX.Element> {
  return (
    <>
      <div className={`${styles.flexWrapper}`}>
        <Header />
        <main>
          <h1>Blog</h1>
          <div>This is BlogPage</div>
          <div>Coming soon...</div>
        </main>
        <Footer className={`${styles.footer}`} />
      </div>
    </>
  );
}