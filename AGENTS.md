# AGENTS.md

> **Keep this file updated.** Whenever you add/remove/rename a tool or reference page,
> change routing, the build/deploy flow, or the project structure/conventions,
> update this file (and the tool tables in `README.md`) in the same change.
> Treat a stale `AGENTS.md` as a bug.

## Project Overview

Hands Ready is a browser-based developer toolbox. React 19 + TypeScript + Vite 7 +
Tailwind CSS 4, client-side interactive tools with build-time route prerendering,
deployed to Cloudflare Workers as static Assets (`wrangler.jsonc` uses 404 handling).
Package manager: **pnpm**.

## Commands

```bash
pnpm install
pnpm dev      # dev server, host 0.0.0.0
pnpm lint     # eslint
pnpm build    # tsc -b && Vite client/SSR builds + route prerender -> dist/
pnpm deploy   # build + wrangler deploy
```

Always verify with `pnpm run build` after changing code.

## Project Structure

```
src/
  App.tsx               # all routes, all pages lazy-loaded via Suspense + PageSkeleton
  ssr.tsx               # build-time route renderer and per-route SEO metadata
scripts/
  prerender.mjs         # writes route HTML, sitemap.xml and robots.txt after Vite builds
  components/Layout/    # AppLayout (h-screen flex, Sidebar + main Outlet), Sidebar, Footer
  components/ui/        # shared Button, Input/Textarea, Card — use these in tools
  pages/tool/           # one .tsx per tool + ToolIndex.tsx (search + category tabs)
  pages/reference/      # built-in reference pages + ReferenceIndex.tsx
  data/toolData.ts      # tool registry: FuncGroup[] { Name, Data: [{ Name, Path, Description }] }
  data/referenceData.ts # external reference links for the /reference index
  lib/toast.ts          # re-exports sonner toast — use for user feedback
```

Path alias: `@` -> `src/` (see `vite.config.ts`).

## Adding a New Tool (all steps required)

1. Create `src/pages/tool/<Name>.tsx` exporting a named component
   (e.g. `export const FooBar = () => {...}`), reusing `@/components/ui/*` and `@/lib/toast`.
2. Register lazy import + `<Route path="tool/<slug>" ...>` in `src/App.tsx`
   (tool pages are bundled into the `tool-pages` chunk via `vite.config.ts` `manualChunks`).
3. Add `{ Name, Path, Description }` to the right group in `src/data/toolData.ts`
   (this drives the sidebar, `/tool` index, and search).
4. Update the Tools table in `README.md` and any relevant section of this file.
5. Run `pnpm run build`.

Same applies to reference pages: component in `src/pages/reference/`, route in
`App.tsx`, table in `README.md`.

## Conventions

- Tools are self-contained pages: local `useState`, real-time `useMemo` computation,
  no backend calls.
- File upload pattern: hidden `<input type="file">` + drag & drop overlay
  (see `Base64.tsx`, `MarkdownPreview.tsx`); reset input value after handling.
- Notify via `toast.success/error` from `@/lib/toast`, not `alert`.
- Icons from `lucide-react`. Markdown rendering via `react-markdown` + `remark-gfm`.
- Keep UI consistent with existing tools: `text-3xl font-bold` page title,
  gray/white Tailwind palette, responsive `grid lg:grid-cols-2` layouts.
- Do not commit secrets; do not force-push; only commit when explicitly asked.
