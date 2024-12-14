import styles from "@/components/skill/skill.module.scss"
import { DiCss3 } from "react-icons/di"
import { FaGithub, FaHtml5, FaReact, FaVuejs, FaWordpress } from "react-icons/fa"
import { IoLogoJavascript } from "react-icons/io"
import { SiBlender, SiDart, SiFlutter, SiGoogleappsscript, SiJira, SiOpenapiinitiative, SiTypescript } from "react-icons/si"
import { TbBrandThreejs } from "react-icons/tb"
import { VscVscode } from "react-icons/vsc"



export default function Skill() {
  return (
    <>
      <section className={`${styles.skill}`}>
        <h2 className={`${styles.skillTitle}`}>Skill</h2>
        <div className={`${styles.skillDetail}`}>
          <span className={`${styles.skillRateTitle}`}>Skill Rating</span>
          {/* 1ー使用経験あり  星2ー実務で利用 星3ー独走できる 星4ー人に教えられる*/}
          <ul className={`${styles.skillLevelWrapper}`}>
            <li className={`${styles.star1}`}>Experienced in use:</li>
            <li className={`${styles.star2}`}>Use at work:</li>
            <li className={`${styles.star3}`}>Able to act independently:</li>
            <li className={`${styles.star4}`}>Able to teach:</li>
          </ul>
          <div className={`${styles.skillListWrapper}`}>
            <h3 className={`${styles.skillListTitle}`}>Language</h3>
            <ul className={`${styles.skillList}`}>
              <li className={`${styles.star4}`}>HTML<FaHtml5 size={20} className={`${styles.icon}`} />:</li>
              <li className={`${styles.star4}`}>CSS<DiCss3 size={20} className={`${styles.icon}`} />:</li>
              <li className={`${styles.star3}`}>Java Script<IoLogoJavascript size={20} className={`${styles.icon}`} />:</li>
              <li className={`${styles.star2}`}>Type Script<SiTypescript size={20} className={`${styles.icon}`} />:</li>
              <li className={`${styles.star2}`}>Dart<SiDart size={20} className={`${styles.icon}`} />:</li>
              <li className={`${styles.star2}`}>GAS<SiGoogleappsscript size={20} className={`${styles.icon}`} />:</li>
            </ul>
          </div>
          <div className={`${styles.skillListWrapper}`}>
            <h3 className={`${styles.skillListTitle}`}>Framework</h3>
            <ul className={`${styles.skillList}`}>
              <li className={`${styles.star2}`}>Flutter<SiFlutter size={20} className={`${styles.icon}`} />:</li>
              <li className={`${styles.star2}`}>React.js<FaReact size={20} className={`${styles.icon}`} />:</li>
              <li className={`${styles.star1}`}>Vue.js<FaVuejs size={20} className={`${styles.icon}`} />:</li>
              <li className={`${styles.star1}`}>Three.js<TbBrandThreejs size={20} className={`${styles.icon}`} />:</li>
            </ul>
          </div>
          <div className={`${styles.skillListWrapper}`}>
            <h3 className={`${styles.skillListTitle}`}>Tool</h3>
            <ul className={`${styles.skillList}`}>
              <li className={`${styles.star4}`}>VS Code<VscVscode size={20} className={`${styles.icon}`} />:</li>
              <li className={`${styles.star4}`}>Git<FaGithub size={20} className={`${styles.icon}`} />:</li>
              <li className={`${styles.star2}`}>Jira<SiJira size={20} className={`${styles.icon}`} />:</li>
              <li className={`${styles.star2}`}>Open API<SiOpenapiinitiative size={20} className={`${styles.icon}`} />:</li>
              <li className={`${styles.star2}`}>Word Press<FaWordpress size={20} className={`${styles.icon}`} />:</li>
            </ul>
          </div>
          <div className={`${styles.skillListWrapper}`}>
            <h3 className={`${styles.skillListTitle}`}>Other</h3>
            <ul className={`${styles.skillList}`}>
              <li className={`${styles.star1}`}>Blender<SiBlender size={20} className={`${styles.icon}`} />:</li>
            </ul>
          </div>
        </div>
      </section>
    </>)
}