import parse, { DOMNode, Element, Text } from "html-react-parser";
import { HighlightCode } from "@/components/BlogContent/HighLightCode/HighLightCode"
import styles from "@/components/BlogContent/EditorContents/EditorContents.module.scss"
import EmbedLink from "@/components/BlogContent/EmbedLink/EmbedLink";

// 型ガード関数
const isElement: (element: unknown) => element is Element = (element: unknown): element is Element => element instanceof Element;
const isText: (text: unknown) => text is Text = (text: unknown): text is Text => text instanceof Text;

type EditorContentsProps = {
  rawHtml: string;
};

export default function Parsed({ rawHtml }: EditorContentsProps): string | JSX.Element | JSX.Element[] {
  return <div className={styles.contents}>
    {parse(rawHtml, {
      replace: (domNode: DOMNode) => {
        // コードブロックであるか
        if (
          domNode instanceof Element &&
          domNode.name === "div" &&
          "data-filename" in domNode.attribs
        ) {
          // 型を絞り込んでいく
          if (!isElement(domNode.firstChild)) return;
          if (!isElement(domNode.firstChild.firstChild)) return;

          const codeElement: Element = domNode.firstChild.firstChild;

          if (!isText(codeElement.firstChild)) return;

          // code本文, 言語名, ファイル名を抽出してハイライトする。
          const codeInput: string = codeElement.firstChild.data;
          const languageClassInput: string = codeElement.attribs.class;
          const dataFileNameInput: string = domNode.attribs["data-filename"];

          return <HighlightCode code={codeInput} languageClass={languageClassInput} dataFileName={dataFileNameInput} />
        } else if (
          domNode instanceof Element &&
          domNode.attribs.class === "iframely-embed"
        ) {
          // 1階層目: class="iframely-responsive" の <div> を探す
          const responsiveDiv: Element | undefined = (domNode.children as DOMNode[]).find(
            (child: DOMNode): child is Element => isElement(child) && child.name === "div"
          ) as Element | undefined;
          if (!responsiveDiv) return null; // 念のためチェック

          // 2階層目: <a> を探す
          const iframeElement: Element | undefined = (responsiveDiv.children as DOMNode[]).find(
            (child: DOMNode): child is Element => isElement(child) && child.name === "a"
          ) as Element | undefined;

          if (!iframeElement?.attribs["data-iframely-url"]) return null; // 念のためチェック

          return <EmbedLink url={iframeElement?.attribs["data-iframely-url"]} />;
        }
      },
    })}
  </div>;
}