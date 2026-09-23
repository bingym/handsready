# Hands Ready

A browser-based developer toolbox built with React + TypeScript + Vite + Tailwind CSS.
All tools run entirely in the browser — no backend required. Routes are prerendered to static HTML and deployed to Cloudflare Workers Assets.

## Tools

| Category | Tool | Route | Description |
|----------|------|-------|-------------|
| Development | JSON Formatter | `/tool/json-format` | Format, validate and view JSON data |
| Development | SQL Formatter | `/tool/sql-format` | Format SQL queries with dialect support |
| Development | Timestamp | `/tool/timestamp` | Convert between timestamps and datetime |
| Development | MD5 | `/tool/md5` | Generate MD5 hash with optional HMAC |
| Development | SHA256 | `/tool/sha256` | Generate SHA256 hash with optional HMAC |
| Development | Base64 Encode/Decode | `/tool/base64` | Encode/decode text or files to Base64 |
| Development | Unicode/Chinese | `/tool/unicode-zh` | Convert between Unicode and Chinese |
| Development | Byte Calculator | `/tool/byte-calc` | Convert between byte units (B/KB/MB/GB) |
| Development | UUID | `/tool/uuid` | Generate UUID v4 in various formats |
| Development | URL Encode/Decode | `/tool/url-encode-decode` | Encode/decode URL components |
| Development | Word Count | `/tool/word-count` | Count words, chars, lines and paragraphs |
| Development | Markdown Preview | `/tool/markdown-preview` | Edit Markdown on the left, preview on the right |
| Development | Byte Count | `/tool/byte-count` | Calculate string byte size in UTF-8/16/32 |
| Photography | EXIF Info | `/tool/exif-info` | Extract EXIF metadata from images |
| Photography | Image Compress | `/tool/image-compress` | Compress images with quality control |
| Others | QR Code | `/tool/qrcode` | Generate QR code from text or URL |
| Others | Random Password Generator | `/tool/random-chars` | Generate random passwords and strings |
| Others | Text Diff | `/tool/text-diff` | Compare two texts and highlight differences |
| Others | Core Values Encoder | `/tool/core-values-encoder` | Encode/decode text with core socialist values |
| Others | Noise Meter | `/tool/noise-meter` | Detect ambient noise level in decibels using microphone |
| Others | Fuel Cost Calculator | `/tool/fuel-cost-calc` | Calculate vehicle fuel/electricity cost per kilometer |
| Others | License Plate Simulator | `/tool/license-plate` | Generate simulated license plate numbers for testing and demo |

## Reference

Built-in reference pages:

| Page | Route |
|------|-------|
| HTTP Status Codes | `/reference/http-code` |
| ASCII Table | `/reference/ascii-table` |
| Time Format Placeholders | `/reference/time-format-placeholder` |
| HTML Escape Characters | `/reference/http-mark` |
| Mirror Sources | `/reference/source` |

Plus a curated collection of external links (books, docs, tech blogs) on the `/reference` index page, defined in `src/data/referenceData.ts`.

## Development

```bash
pnpm install
pnpm dev      # start dev server (listens on 0.0.0.0)
pnpm lint     # run eslint
```

## Build & Deploy

```bash
pnpm build    # type-check, build client + SSR renderer, prerender routes into dist/
pnpm deploy   # build + deploy dist/ assets to Cloudflare Workers
```

The build emits a static HTML file per route under `dist/`, plus `sitemap.xml` and `robots.txt`. Cloudflare serves missing routes as 404s; client-side React hydrates each prerendered page for tool interactions.

## Project Structure

```
src/
  App.tsx               # router + lazy-loaded routes
  main.tsx              # entry point
  components/
    Layout/             # AppLayout, Sidebar, Footer
    ui/                 # shared Button, Input/Textarea, Card
    JsonViewer.tsx
    PageSkeleton.tsx    # Suspense fallback for lazy pages
  pages/
    Home.tsx / About.tsx
    tool/               # one .tsx per tool + ToolIndex.tsx
    reference/          # built-in reference pages + ReferenceIndex.tsx
  data/
    toolData.ts         # tool registry (name/path/description, grouped)
    referenceData.ts    # external reference links
  lib/ / services/ / types/
```

## Tech Stack

React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · React Router 7 · Sonner (toast) · Lucide icons · Cloudflare Workers
