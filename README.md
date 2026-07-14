# NHL Retail Survey

Interactive kiosk survey and merchandise finder for the NHL retail demo.

## Public Demo

[Open the NHL Retail Survey](https://jiberetail.github.io/nhl-retail-survey/)

The public demo is deployed from the `jiberetail` GitHub organization. Public
project URLs must use an organization-owned `jiberetail.github.io` address and
must never use a personal account name.

## Development

```bash
pnpm install
pnpm run dev
pnpm run build
```

The standard build remains compatible with the existing Sites deployment. The
GitHub Pages workflow creates a static export with the project base path and
publishes the contents of `out/`.
