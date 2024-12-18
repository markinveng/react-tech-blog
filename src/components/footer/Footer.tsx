import Link from "next/link";
import styles from "@/components/footer/Footer.module.scss"
interface FooterProps {
  className?: string;
}
export default function Footer({ className }: FooterProps) {

  return (
    <>
      <footer className={`${styles.container} ${className || ""}`}>
        <div className={`${styles.contactWrapper}`}>
          © 2024 <Link className={`${styles.contact}`} href={"/contact"}>Contact</Link>
        </div>
        <Link className={`${styles.termsAndPrivacy}`} href={"/terms-and-privacy"}>Terms & Privacy</Link>
      </footer>
    </>
  )
}