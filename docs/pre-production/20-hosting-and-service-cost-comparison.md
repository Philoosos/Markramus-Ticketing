# Hosting and service cost comparison

**Checked:** 2026-11-08. Listed provider prices are public list prices in USD, before taxes unless stated. They are a dated comparison, not a quote, provider recommendation, account creation or purchase authorization. Domain, file volume, email/WhatsApp usage and tax depend on details not yet supplied.

## Owner budget

Owner target: **USD 100/year total** for the complete operating solution. It is a budget constraint, **not a verified achievable provider quote**. It must include app, database, domain, private files, backups, email/WhatsApp delivery, monitoring, taxes, egress and unavoidable costs. Operational maintenance time is also a real cost, though excluded from the cloud invoice totals below.

## Cost comparison

| Option | Publicly priced base services | Monthly subtotal | Annual subtotal | Other costs and fit |
|---|---|---:|---:|---|
| **1. Managed web + managed database (Vercel Pro + DigitalOcean Managed PostgreSQL)** | Vercel Pro $20/mo; smallest listed DigitalOcean PostgreSQL node $15.15/mo | **$35.15** | **$421.80** | Before domain, storage, email/WhatsApp, tax, egress, or higher availability. Vercel Hobby is not a lawful business workaround: provider restricts it to personal/non-commercial use. **Does not fit.** |
| **2. Render web + managed PostgreSQL** | Small paid web service $7/mo; smallest paid Postgres cited at $6/mo (256MB, 1GB storage) | **$13.00** | **$156.00** | Before domain, extra DB storage ($0.30/GB), file storage, messaging, taxes/egress and usage. Paid Postgres backup/PITR is offered; review retention/restore terms. **Does not fit even before add-ons.** |
| **3. DigitalOcean VPS (self-managed, 2GB) + weekly VM backup** | Basic 2GB Droplet $12/mo; weekly backup is 20% of Droplet ($2.40/mo) | **$14.40** | **$172.80** | Before domain, private file storage beyond any R2 allowance, email/WhatsApp, taxes, monitoring and incident labor. **Does not fit; highest maintenance burden.** |

Sources: [Vercel pricing](https://vercel.com/pricing), [Vercel Hobby terms](https://vercel.com/docs/plans/hobby), [DigitalOcean Managed Database pricing](https://www.digitalocean.com/pricing/managed-databases), [Render pricing](https://render.com/pricing), [Render managed PostgreSQL pricing details](https://render.com/articles/heroku-vs-vercel), [DigitalOcean Droplet pricing](https://www.digitalocean.com/pricing/droplets), [DigitalOcean backup pricing](https://docs.digitalocean.com/products/backups/details/pricing/).

### Minimum VPS sensitivity (not a recommendation)

DigitalOcean lists a 1GB/1vCPU basic Droplet at $6/mo. Weekly backup at 20% adds $1.20/mo: **$7.20/mo / $86.40/year** for those two line items alone. It leaves just $13.60/year for domain, taxes, files, messaging, monitoring and any overage. This small VM also co-locates the application and database with limited memory; it is not considered an adequately safe, resilient or supportable production design for this booking system and a non-technical owner. The $4/mo 512MB tier is still less suitable. This low subtotal must not be presented as the complete system cost.

## Shared dependencies and cost assumptions

| Item | Status and published price | Monthly/annual treatment |
|---|---|---|
| Domain | Cloudflare Registrar says domains are sold/renewed at registry cost with no markup; actual available TLD and price not established. | **UNKNOWN** until domain/TLD selected; mandatory for branded production URL. [Registrar details](https://developers.cloudflare.com/registrar/) |
| Private file storage | Cloudflare R2 standard storage includes 10GB-month, 1M Class A and 10M Class B operations monthly; then $0.015/GB-month, $4.50/M Class A, $0.36/M Class B; egress free. | $0 only if usage stays within free allowance and provider/legal review accepts region/terms. Document/proof volumes and retention unknown; additional fees usage-dependent. [R2 pricing](https://developers.cloudflare.com/r2/pricing/) |
| Backups | Option 3 includes weekly VM image backup, not independent proof of logical DB restore. External encrypted DB/file backups may add storage, transfer and engineering costs. Render/DigitalOcean managed DB backup terms differ. | Use pricing above only as listed VM backup add-on; exact recovery-ready total **UNKNOWN** until retention/volume/RPO/RTO chosen. |
| Email | Resend lists Free $0 with 3,000 emails/month and 100/day. | $0 only under limits and verified policy/region/deliverability; overage, domain, reputation and support needs **UNKNOWN**. Free limits are not an SLA. [Resend pricing](https://resend.com/pricing) |
| WhatsApp | Meta policy says business-initiated messages use approved templates and applicable pricing. Egypt current per-message rate, business eligibility, provider fee and setup are not verified from an accessible official rate card here. | **UNKNOWN, usage-dependent**. Do not assume free or automate via ordinary WhatsApp. [WhatsApp Business policy](https://business.whatsapp.com/policy), [Meta pricing documentation](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing) |
| Monitoring | Minimum hosted health/billing alerts may be included; independent uptime/security monitoring can be paid. Vendor and response requirements not selected. | **UNKNOWN**; cost and service level need comparison. |
| Taxes | Vercel says prices exclude applicable VAT/GST/other taxes; DigitalOcean applies tax where legally required. Customer billing country and tax treatment for each vendor not confirmed. | **UNKNOWN / additional**; no tax estimate invented. |
| Egress/bandwidth | DO bundled Droplets include plan-specific transfer (starts at 500GiB/month); Render includes plan-specific transfer and charges overage; R2 egress is free under its terms. | **UNKNOWN** until traffic and storage volume established; overage risk. |
| External provider fees | Payment-provider processing is not currently required for the manual proof-review flow, but bank/provider proof and refund handling may have fees. | **UNKNOWN**; verify before selection. |

## Operational comparison and location

### Option 1 — Vercel Pro + managed PostgreSQL

**Pros:** managed Next.js deployment, simple Git-based deploys, less OS work; dedicated managed DB reduces DB patching responsibility. **Cons:** lowest priced Vercel commercial plan plus DB alone costs over four times the annual cap; cross-provider network/region and egress need review; storage, messages and taxes extra. Vercel Hobby is personal/non-commercial only, so it is not an acceptable production shortcut. Specific data residency and support levels must be confirmed for the selected plan.

### Option 2 — Render web + Render Postgres

**Pros:** app and Postgres on one service platform, TLS/custom-domain support, paid DB backups/PITR available, simpler than server administration. **Cons:** $156/year base already exceeds cap; storage, domain, WhatsApp, taxes and usage add more. Free web/database plans are not production alternatives: Render says free Postgres expires after 30 days, has no backups and is subject to restarts/maintenance. Data-region suitability and higher plan recovery window need confirmation. [Free-plan limits](https://render.com/docs/free).

### Option 3 — DigitalOcean VPS

**Pros:** transparent low-end VM price and one place to run Next.js, PostgreSQL, worker and reverse proxy; flexible architecture. **Cons:** owner/team must patch OS/runtime, configure firewall/TLS, rotate secrets, monitor disks/DB, manage security, backups and restores, and respond to incidents. DigitalOcean identifies Droplets as unmanaged; 2GB + weekly backups exceeds cap before essentials. One VM is a single failure domain. Listed regions include North America, Europe and other regions but no Egypt region on the reviewed page; latency/data-transfer and legal location require review. [Droplet FAQ/regions](https://www.digitalocean.com/pricing/droplets).

## Conclusion on USD 100/year

**A safe, practical complete public ticketing system cannot currently be verified within $100/year.** The least complicated managed options have listed infrastructure subtotals of $156/year and $421.80/year before mandatory domain, delivery, file, tax and other charges. A small VM can make compute look close to the target, but falls short on memory/resilience and shifts substantial security and restore responsibility to an owner who should not be expected to administer servers. WhatsApp and domain totals are still unknown, not zero.

Recommended next step is to ask whether the owner can increase the annual budget, fund operations separately, or choose a manual/non-public alternative. No provider is selected. Do not weaken backups, privacy, access security or booking integrity to manufacture a $100 price fit.

## Mandatory vs optional vs usage-dependent

- **Mandatory for production:** app hosting, database, domain, private file capability for submitted proofs/conditional documents, backups with restore, secure delivery at least through one chosen channel, security/monitoring baseline and taxes if applicable.
- **Optional but requirement-supported:** automated WhatsApp in addition to email; higher uptime/HA; enhanced monitoring; separate background queue provider. These require owner cost approval.
- **Usage-dependent/unknown:** object storage above free allowance, email over free limits, WhatsApp messages/provider charges, bandwidth/egress, payment/refund handling, taxes, support and additional backup retention.

## Practical WhatsApp fallback

If automation is unaffordable, the website can show a clear private download/tracking link and send email when selected; trained staff may manually notify customers using approved business processes. Whether manual WhatsApp sharing is suitable, consented, staffed, and compliant must be decided. Never claim personal WhatsApp can send system messages automatically for free.
