import parse from "html-react-parser";
import hljs from "highlight.js/lib/common";
import styles from "@/components/BlogContent/HighLightCode/HighLightCode.module.scss";
import "highlight.js/styles/lioshi.css";

type HighLightCodeProps = {
  code: string,
  languageClass: string,
  dataFileName: string,
};

export const HighlightCode: React.FC<HighLightCodeProps> = ({
  code, languageClass, dataFileName,
}: HighLightCodeProps): JSX.Element => {
  // microCMSから取得したクラス名を、言語名に整形
  const language: string = languageClass.replace("language-", "");
  const highlightCode: string = hljs.highlight(code, {
    language: language,
    ignoreIllegals: true,
  }).value;

  return (
    <div className={styles.codeBlock}>
      <div className={styles.dataFileName}>{dataFileName}</div>
      <pre className={styles.code}>
        <code className={languageClass}>{parse(highlightCode)}</code>
      </pre>
    </div>
  );
}