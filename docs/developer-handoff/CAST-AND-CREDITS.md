# Cast and production credits

Keep active Production cast assignments separate from credits. An active cast assignment belongs to a specific Performance, allowing the same character to have alternate actors on different dates. Admin/Super Admin and authorized Admins manage assignments; names must not be hardcoded into UI logic.

The supplied El-Mahlag brochure provides historical cast and credit content. The local El-Mahlag detail page currently presents the cast list as characters/performers from the brochure and the concise **Job/Department — Person or People** credit format. The brochure does not give per-Performance cast variation; do not infer it. Data is currently static in `src/features/archive/data.ts` and not editable through an Admin content interface yet.

Historical archive cast records remain informational and distinct from live Performance assignments. Credits allow custom department labels, multiple people, reordering, and independent editing. Do not turn credits into biographies.
