# Importing into GitBook

This bundle is set up to import cleanly into both modern GitBook (gitbook.com) and legacy `gitbook-cli`.

## Modern GitBook (gitbook.com)

The hosted SaaS platform.

### Option A: Direct import via UI

1. Create a new GitBook space.
2. From the space settings, choose **Synchronize with Git provider** and pick GitHub / GitLab / Bitbucket.
3. Push this `docs/` folder to a repo and point the GitBook sync at it.
4. GitBook reads `.gitbook.yaml` (which sets `README.md` as the root page and `SUMMARY.md` as the navigation), and the docs render immediately.

### Option B: Import from existing markdown

1. From the space, **Import** ➔ **GitBook**.
2. Zip this `docs/` folder and upload it.
3. GitBook parses `SUMMARY.md` to build the sidebar.

### Styling on modern GitBook

Custom CSS is a paid-tier feature (Plus / Pro plans, configured under Workspace Settings ➔ Customization). Paste the contents of `styles/website.css` into the Custom CSS field on a paid plan and the docs will pick up the app's theme. On the free tier, the docs render in GitBook's default theme; the brand color (gold) can still be set via the basic customization panel.

## Legacy gitbook-cli

The open-source static site generator (no longer actively maintained but still functional). Builds an HTML site you can host anywhere.

```bash
npm install -g gitbook-cli
cd docs/
gitbook install   # installs the plugins listed in book.json
gitbook serve     # http://localhost:4000 with hot reload
gitbook build     # outputs _book/ ready to upload to your host
```

The `book.json` already points at `styles/website.css` so the brand styling applies out of the box.

## Editing

Every page is a plain markdown file. The structure is:

```
docs/
├─ README.md                 (welcome page)
├─ SUMMARY.md                (sidebar navigation, edit to reorder/add pages)
├─ .gitbook.yaml             (modern GitBook config)
├─ book.json                 (legacy gitbook-cli config)
├─ styles/
│  └─ website.css            (custom theme)
├─ introduction/
├─ races/
├─ nfts/
├─ competition/
├─ economy/
├─ trust/
└─ help/
```

To add a new page:

1. Create the `.md` file in the appropriate folder.
2. Add an entry to `SUMMARY.md` under the right section.
3. Commit and push (or rebuild for legacy gitbook-cli).

## Updating content

The docs are intentionally short. Most pages are 200-400 words. The platform changes often; small targeted updates beat encyclopedic walls. When a feature changes, find the page that mentions it (search the repo for the keyword) and edit just that section.

## Avoiding hyphens and em-dashes

By convention, this bundle uses periods and commas instead of em-dashes (—) or hyphens (-) as in-sentence separators. Keep the convention if you add new pages; it matches the rest of the app's copy.
