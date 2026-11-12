# Team history and production archive

The About page and historical titles use the owner-provided brochure at `Markramus-assets-reference/assets-reference/team-archive/El-Mahlag-Brochure-FINAL.html` and matching PDF. Preserve both originals. The HTML contains five embedded page images. Official logo is `Markramus-assets-reference/assets-reference/brand/team-logo.png`; preserve the artwork. A copy is served as `public/brand/team-logo.png`; the El-Mahlag brochure cover is served as `public/archive/el-mahlag-cover.png`.

Implemented public routes: `/`, `/about`, `/productions`, and `/productions/[slug]`. Historical archive entries are informational, separate from the one active ticketing Production. The titles and years in `src/features/archive/data.ts` were transcribed from the brochure; missing descriptions, posters, authors, casts, and credits must remain blank until an owner-approved source supplies them. Admin-editable archive content is not implemented yet.

The About page uses the brochure statements about the team's beginnings in the late 1960s/early 1970s, artistic approach, and actor training. Do not expand historical claims without a source.
