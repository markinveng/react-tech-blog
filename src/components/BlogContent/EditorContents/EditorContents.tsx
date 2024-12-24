import parse, { DOMNode, Element, Text } from "html-react-parser";
import { HighlightCode } from "@/components/BlogContent/HighLightCode/HighLightCode"


// 型ガード関数
const isElement: (element: unknown) => element is Element = (element: unknown): element is Element => element instanceof Element;
const isText: (text: unknown) => text is Text = (text: unknown): text is Text => text instanceof Text;

type EditorContentsProps = {
  rawHtml: string;
};

export default function EditorContents({ rawHtml }: EditorContentsProps): string | JSX.Element | JSX.Element[] {
  return parse(rawHtml, {
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
      }
    },
  });
}