# Portfolio — Gabriel Dagostim

A portfolio for internal software: command centres, access control, data
pipelines, and automations that run inside a pharmacy network. Because almost
none of it has a public URL, each project is carried by its screenshots, the
case behind it, and what made it hard.

The site ships in **English, Portuguese, and Spanish**, with English as the
front door. Every visitor-facing string carries all three languages and is
editable from the admin, so the content can change without touching code.

## Running it

```bash
npm install --prefix app
npm run dev            # http://localhost:5173
npm run build
npm run lint
npm run generate:cv    # rebuilds the three résumé PDFs
```

The résumé generator needs Chromium once:

```bash
npm install            # installs playwright at the repo root
npx playwright install chromium
```

## Layout

```
app/src/
  app/          store, router, theme, providers
  components/
    admin/      the three-language form primitives
    home/       hero, status panel, working-method pipeline
    projects/   card, detail, dialog
    site/       page frame, language and theme switches
  i18n/         en · pt-BR · es
  mocks/        seed data — projects and the editable site content
  pages/
    public/     home, work, collections, about, skills, contact
    admin/      the content editor
scripts/        résumé content and the PDF generator
```

## Content model

Everything the visitor reads lives in one of two places:

- **`mocks/seed-projects.ts`** — the project catalogue.
- **`mocks/seed-content.ts`** — the profile, hero status rows, career record,
  skills, languages, and working method.

Both seed a store held in `localStorage`, which the admin edits. Local edits
win, but anything newly added to the seed still appears, so shipping a new
project does not require anyone to reset their browser.

## Admin

`/admin/login`. The password lives in `app/src/lib/api-mock.ts`.

This is a content editor, not a security boundary: the site is fully static and
every visitor already downloads the whole dataset. Edits are saved per browser.
To publish them, copy the changed values back into the seed files and redeploy.
