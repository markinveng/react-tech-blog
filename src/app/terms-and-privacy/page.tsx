import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header'
import styles from '@/app/terms-and-privacy/page.module.scss';
import Link from 'next/link';

export default function TermsAndPrivacyPage() {

  return (
    <>
      <Header />
      <main>
        <article className={`${styles.article}`}>
          <h1 className={`${styles.title}`}>Terms and privacy</h1>
          <p className={`${styles.titleDetail}`}>
            This site is a personal website and does not collect visitors personal information. However, there is information collected by visiting this site, which is described below.
          </p>
          <h2 className={`${styles.subTitle}`}>Collection of IP address, cookies, and other information</h2>
          <p className={`${styles.detail}`}>
            This site may collect information such as visitors IP addresses, cookies, and web browser types. This information is used to analyze visitors usage but does not identify individuals.
          </p>
          <h2 className={`${styles.subTitle}`}>About advertising distribution</h2>
          <p className={`${styles.detail}`}>This site may use third-party advertising services. Advertising distribution companies use cookies and web beacons to display ads based on visitors interests. You can disable the use of cookies by advertising distribution companies by checking your browser settings.</p>
          <h2 className={`${styles.subTitle}`}>About external links</h2>
          <p className={`${styles.detail}`}>This site may include external links, but this site cannot take responsibility for the protection of personal information on external sites. If you click on a link to an external site, please check the privacy policy of the site you are directed to.</p>
          <p className={`${styles.detail}`}>If you have any questions or concerns about our privacy policy, please <Link href={"/contact"} className={`${styles.contactLink}`}>contact</Link>  me.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}