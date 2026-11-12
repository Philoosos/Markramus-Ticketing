# Seat map and inventory

Owner-provided approved visual references are preserved at:

- `Markramus-assets-reference/assets-reference/seat-maps/hall-approved-reference.jpg`
- `Markramus-assets-reference/assets-reference/seat-maps/balcony-approved-reference.jpg`

## What the approved images show

- Both images print seat labels inside the seat boxes. The visible label style is row + side + number, such as `AL1` / `AR1`; these are source labels and must not be rewritten automatically.
- The Balcony image visibly says `TOTAL U: 172` and displays rows A–K plus a separate `ML` group around the control room. Treat 172 as text printed on the approved image, not as a verified saleable-seat count until the owner confirms the area/category interpretation.
- The Hall image contains green marks over some seat labels in the D–F bands. It also appears to repeat `JL4` in row J. Those labels require inspection against the original approved record; do not infer a replacement number.
- Hall and Balcony labels share row letters and side/number shapes. The area is therefore required to disambiguate a printed label.
- The Master Build Prompt's proposed area-prefixed code forms (`H-...` and `B-...`) do not match the compact labels printed in these images. Do not convert one form into the other or use either as a canonical database key until the owner confirms the authoritative code and any crosswalk.

## What was not found

A machine-readable canonical manifest was not found in the project. The asset README says such a manifest is documented in the project, but the checked Markdown, TypeScript, JSON, CSV, Excel and other source files contain only the inventory rules, not a complete per-seat list. The pictures provide visual labels but cannot resolve the obscured/irregular Hall labels, approved sale/category flags, or the requested code-format conflict by themselves.

No interactive sale map is implemented. Reconcile every visible label and category to a versioned owner-approved manifest before seeding or enabling sale. Preserve photography areas as visible but unsellable, VIP as seatless invitations, and control room, exits, aisles and stage as non-seat areas only where the approved inventory confirms them. Every Performance has independent inventory. `L/R/C` mean Left/Right/Center, but retain the approved map viewpoint in the manifest.

Map reconciliation remains a blocker for booking seats. Do not replace the original images. Working copies may be optimized only as additional assets after review.
