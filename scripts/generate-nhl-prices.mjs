import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const inputPath = path.resolve(process.argv[2] ?? "/tmp/nhl-price-scrape.json");
const outputPath = path.resolve(process.argv[3] ?? "app/data/nhlPrices.ts");
const catalogPath = path.resolve(process.argv[4] ?? "app/data/nhlCatalog.ts");
const source = JSON.parse(await readFile(inputPath, "utf8"));
const catalogSource = await readFile(catalogPath, "utf8");

const catalogDeclaration = catalogSource.indexOf("export const NHL_CATALOG");
const catalogStart = catalogSource.indexOf("[", catalogSource.indexOf("=", catalogDeclaration));
const catalogEnd = catalogSource.indexOf("\n];", catalogStart) + 2;
const catalog = JSON.parse(catalogSource.slice(catalogStart, catalogEnd));

const prices = new Map();

for (const team of catalog) {
  for (const products of Object.values(team.categories)) {
    for (const catalogProduct of products) {
      const productPath = new URL(catalogProduct.productUrl).pathname
        .replace(/\/$/, "")
        .toLowerCase();
      const product = source.products?.[productPath];

      if (!product || !catalogProduct.productId || !Number.isFinite(product.price)) continue;

      prices.set(catalogProduct.productId, {
        price: product.price,
        regularPrice: Number.isFinite(product.regularPrice)
          ? product.regularPrice
          : product.price,
      });
    }
  }
}

const entries = [...prices.entries()]
  .sort(([left], [right]) => left.localeCompare(right, "en", { numeric: true }))
  .map(
    ([productId, price]) =>
      `  ${JSON.stringify(productId)}: { price: ${price.price}, regularPrice: ${price.regularPrice} },`,
  )
  .join("\n");

const output = `// Generated from current Shop NHL category pricing. Do not edit by hand.\n\nexport type NhlProductPrice = {\n  price: number;\n  regularPrice: number;\n  currency: "USD";\n};\n\nconst NHL_PRODUCT_PRICES: Record<string, Omit<NhlProductPrice, "currency">> = {\n${entries}\n};\n\nexport const getNhlProductPrice = (productId?: string): NhlProductPrice | undefined => {\n  if (!productId) return undefined;\n\n  const productPrice = NHL_PRODUCT_PRICES[productId];\n  return productPrice ? { ...productPrice, currency: "USD" } : undefined;\n};\n`;

await writeFile(outputPath, output);
console.log(`Wrote ${prices.size} Shop NHL prices to ${outputPath}`);
