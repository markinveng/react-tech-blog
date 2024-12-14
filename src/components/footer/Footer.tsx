import Link from "next/link";
import styles from "@/components/footer/Footer.module.scss"
export default function Footer() {
  return (
    <>
      <footer className={`${styles.container}`}>
        <div className={`${styles.contactWrapper}`}>
          © 2024 <Link className={`${styles.contact}`} href={"/contact"}>Contact</Link>
        </div>
        <Link className={`${styles.termsAndPrivacy}`} href={"/terms-and-privacy"}>Terms & Privacy</Link>
      </footer>
    </>
  )
}