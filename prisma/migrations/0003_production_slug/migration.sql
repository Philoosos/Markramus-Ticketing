ALTER TABLE "Production" ADD COLUMN "slug" TEXT NOT NULL DEFAULT '';
UPDATE "Production" SET "slug" = "id" WHERE "slug" = '';
CREATE UNIQUE INDEX "Production_slug_key" ON "Production"("slug");
ALTER TABLE "Production" ALTER COLUMN "slug" DROP DEFAULT;
