"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireStaff } from "@/lib/auth/session";

export async function createDemoProductionAction() {
  const actor = await requireStaff(["SUPER_ADMIN", "ADMIN"]);
  try {
    await db.$transaction(async (tx) => {
      if (await tx.production.findUnique({ where: { slug: "al-mahlag-demo" } })) return;
      const production = await tx.production.create({ data: { slug: "al-mahlag-demo", title: "المحلج", description: "", status: "DRAFT" } });
      await tx.auditEvent.create({ data: { actorId: actor.id, action: "DEMO_PRODUCTION_CREATED", entityType: "Production", entityId: production.id, afterData: { slug: production.slug, title: production.title, status: production.status } } });
    });
    revalidatePath("/admin");
  } catch {
    throw new Error("تعذر إنشاء مسودة المحلج. تحقق من قاعدة البيانات والترحيلات.");
  }
}
