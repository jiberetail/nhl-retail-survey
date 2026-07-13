/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

type CheckoutLinkItem = {
  name?: string;
  image?: string;
  size?: string;
  productUrl?: string;
  categoryUrl?: string;
};

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const isNhlShopUrl = (value: string) => {
  try {
    return new URL(value).hostname === "shop.nhl.com";
  } catch {
    return false;
  }
};

const getProductNameFromUrl = (productUrl: string) => {
  try {
    const pathSegments = new URL(productUrl).pathname.split("/").filter(Boolean);
    const productSlug = pathSegments[1] || pathSegments[0] || "NHL Shop item";

    return decodeURIComponent(productSlug)
      .replace(/^-+|-+$/g, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());
  } catch {
    return "NHL Shop item";
  }
};

const getNhlShopUrl = (value: unknown) => {
  if (typeof value !== "string" || !value) return "";

  try {
    const productUrl = new URL(value, "https://shop.nhl.com");
    return productUrl.hostname === "shop.nhl.com" ? productUrl.toString() : "";
  } catch {
    return "";
  }
};

const decodeCheckoutItems = (encodedItems: string | null): CheckoutLinkItem[] => {
  if (!encodedItems) return [];

  try {
    const padded = encodedItems.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(encodedItems.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes));
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => {
        if (Array.isArray(item)) {
          const productUrl = getNhlShopUrl(item[0]);
          return {
            name: getProductNameFromUrl(productUrl),
            image: "",
            size: typeof item[1] === "string" ? item[1] : "",
            productUrl,
            categoryUrl: "",
          };
        }

        return {
          name: typeof item.name === "string" ? item.name : "",
          image: typeof item.image === "string" ? item.image : "",
          size: typeof item.size === "string" ? item.size : "",
          productUrl: typeof item.productUrl === "string" && isNhlShopUrl(item.productUrl) ? item.productUrl : "",
          categoryUrl: typeof item.categoryUrl === "string" && isNhlShopUrl(item.categoryUrl) ? item.categoryUrl : "",
        };
      })
      .filter((item) => item.productUrl || item.categoryUrl)
      .slice(0, 5);
  } catch {
    return [];
  }
};

const renderCheckoutLinksPage = (request: Request) => {
  const url = new URL(request.url);
  const items = decodeCheckoutItems(url.searchParams.get("i") ?? url.searchParams.get("items"));

  if (!items.length) {
    return Response.redirect("https://shop.nhl.com/cart", 302);
  }

  const itemCards = items.map((item, index) => {
    const productUrl = item.productUrl || item.categoryUrl || "https://shop.nhl.com";
    return `
      <article class="item${item.image ? "" : " item--text-only"}">
        ${item.image ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">` : ""}
        <div class="item-copy">
          <p class="eyebrow">Item ${index + 1}</p>
          <h2>${escapeHtml(item.name || "NHL Shop item")}</h2>
          ${item.size ? `<p class="size">Selected size: ${escapeHtml(item.size)}</p>` : ""}
          <a href="${escapeHtml(productUrl)}" class="button">Open on NHL Shop</a>
        </div>
      </article>
    `;
  }).join("");

  const firstProductUrl = items[0]?.productUrl || items[0]?.categoryUrl || "https://shop.nhl.com";

  return new Response(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>NHL Shop Selected Items</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: Arial, Helvetica, sans-serif;
      color: #050505;
      background: #f4f5f7;
    }
    .hero {
      background: linear-gradient(135deg, #050505 0%, #191919 58%, #d71920 100%);
      color: white;
      padding: 28px 20px;
      text-align: center;
    }
    .hero h1 {
      margin: 0;
      font-size: clamp(32px, 9vw, 64px);
      font-weight: 900;
      letter-spacing: 0;
      text-transform: uppercase;
    }
    .hero p {
      margin: 12px auto 0;
      max-width: 680px;
      font-size: clamp(16px, 4vw, 22px);
      line-height: 1.35;
    }
    main {
      width: min(940px, 100%);
      margin: 0 auto;
      padding: 18px;
    }
    .primary {
      display: block;
      width: 100%;
      margin: 6px 0 18px;
      padding: 18px 20px;
      border-radius: 14px;
      background: #050505;
      color: white;
      text-align: center;
      text-decoration: none;
      font-size: 22px;
      font-weight: 900;
      text-transform: uppercase;
    }
    .item {
      display: grid;
      grid-template-columns: 132px minmax(0, 1fr);
      gap: 18px;
      align-items: center;
      margin: 14px 0;
      padding: 16px;
      border-radius: 12px;
      background: white;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
    }
    .item img {
      width: 132px;
      height: 132px;
      object-fit: contain;
    }
    .item--text-only {
      grid-template-columns: minmax(0, 1fr);
    }
    .eyebrow {
      margin: 0 0 6px;
      color: #d71920;
      font-size: 13px;
      font-weight: 900;
      text-transform: uppercase;
    }
    h2 {
      margin: 0;
      font-size: 20px;
      line-height: 1.18;
    }
    .size {
      margin: 8px 0 0;
      color: #555;
      font-size: 16px;
      font-weight: 700;
    }
    .button {
      display: inline-block;
      margin-top: 14px;
      padding: 12px 16px;
      border-radius: 999px;
      background: #d71920;
      color: white;
      text-decoration: none;
      font-size: 15px;
      font-weight: 900;
      text-transform: uppercase;
    }
    .note {
      margin: 22px 0 4px;
      color: #555;
      font-size: 14px;
      line-height: 1.4;
      text-align: center;
    }
    @media (max-width: 560px) {
      .item {
        grid-template-columns: 108px minmax(0, 1fr);
        gap: 12px;
      }
      .item img {
        width: 108px;
        height: 108px;
      }
      h2 {
        font-size: 17px;
      }
    }
  </style>
</head>
<body>
  <section class="hero">
    <h1>NHL Shop Items</h1>
    <p>Open the selected products on NHL Shop to choose final options and check out.</p>
  </section>
  <main>
    <a href="${escapeHtml(firstProductUrl)}" class="primary">Start With First Item</a>
    ${itemCards}
    <p class="note">NHL Shop controls its own cart session, so each product opens on NHL Shop for final selection and checkout.</p>
  </main>
</body>
</html>`, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
};

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/checkout-links" || url.pathname === "/c") {
      return renderCheckoutLinksPage(request);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
