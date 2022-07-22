import { renderToString } from "@vue/server-renderer";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";
import { createPageApp } from "./app";

export const passToClient = [
  "urlParsed",
  "pageProps"
];

export async function render(pageContext) {
  const page = createPageApp(pageContext, false);
  const pageHtml = pageContext.Page ? await renderToString(page) : "";

  return escapeInject`
    <html>
      <body>
        <div id="page">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>
  `;
}
