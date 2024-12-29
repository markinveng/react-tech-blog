import Script from "next/dist/client/script";
import styles from "@/components/BlogContent/EmbedLink/EmbedLink.module.scss"

type EmbedLinkProps = {
  url: string;
}

export default function EmbedLink({ url }: EmbedLinkProps): JSX.Element {

  return (
    <div className="iframely-embed">
      <div className={`${styles.iframeWrapper} iframely-responsive`}>
        <iframe allowFullScreen allow="autoplay *; encrypted-media *; ch-prefers-color-scheme *" src={url}
          style={{ boxShadow: "rgba(0, 0, 0, 0.06) 0px 1px 3px;" }}>
        </iframe>
      </div>
      <Script src="//cdn.iframe.ly/embed.js" />
    </div>
  );
}