import { createServerFn } from "@tanstack/react-start";
import { createHash } from "crypto";

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

async function adminClient(password: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("store_settings")
    .select("admin_password_hash")
    .maybeSingle();
  if (error || !data) throw new Error("تعذر التحقق من كلمة المرور");
  if (data.admin_password_hash !== sha256(password)) throw new Error("كلمة المرور غير صحيحة");
  return supabaseAdmin;
}

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => d)
  .handler(async ({ data }) => {
    await adminClient(data.password);
    return { ok: true };
  });

export const adminLoadAll = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => d)
  .handler(async ({ data }) => {
    const db = await adminClient(data.password);
    const [categories, items, offers, settings, orders] = await Promise.all([
      db.from("menu_categories").select("*").order("sort"),
      db.from("menu_items").select("*").order("sort"),
      db.from("offers").select("*").order("sort"),
      db
        .from("store_settings")
        .select("whatsapp, phone, hours, branch_one, branch_two, delivery_enabled")
        .maybeSingle(),
      db.from("orders").select("*").order("created_at", { ascending: false }).limit(200),
    ]);
    return {
      categories: categories.data ?? [],
      items: items.data ?? [],
      offers: offers.data ?? [],
      settings: settings.data,
      orders: orders.data ?? [],
    };
  });

export const adminSaveItem = createServerFn({ method: "POST" })
  .inputValidator(
    (d: {
      password: string;
      item: {
        id?: string;
        slug: string;
        category_id: string;
        name: string;
        description: string;
        price: number;
        image_key: string;
        tag: string | null;
        sort: number;
        is_available: boolean;
      };
    }) => d,
  )
  .handler(async ({ data }) => {
    const db = await adminClient(data.password);
    const { id, ...values } = data.item;
    const res = id
      ? await db.from("menu_items").update(values).eq("id", id)
      : await db.from("menu_items").insert(values);
    if (res.error) throw new Error(res.error.message);
    return { ok: true };
  });

export const adminDeleteItem = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string; id: string }) => d)
  .handler(async ({ data }) => {
    const db = await adminClient(data.password);
    const res = await db.from("menu_items").delete().eq("id", data.id);
    if (res.error) throw new Error(res.error.message);
    return { ok: true };
  });

export const adminSaveOffer = createServerFn({ method: "POST" })
  .inputValidator(
    (d: {
      password: string;
      offer: {
        id?: string;
        title: string;
        image_key: string;
        price: number | null;
        sort: number;
        is_active: boolean;
      };
    }) => d,
  )
  .handler(async ({ data }) => {
    const db = await adminClient(data.password);
    const { id, ...values } = data.offer;
    const res = id
      ? await db.from("offers").update(values).eq("id", id)
      : await db.from("offers").insert(values);
    if (res.error) throw new Error(res.error.message);
    return { ok: true };
  });

export const adminDeleteOffer = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string; id: string }) => d)
  .handler(async ({ data }) => {
    const db = await adminClient(data.password);
    const res = await db.from("offers").delete().eq("id", data.id);
    if (res.error) throw new Error(res.error.message);
    return { ok: true };
  });

export const adminSaveSettings = createServerFn({ method: "POST" })
  .inputValidator(
    (d: {
      password: string;
      settings: {
        whatsapp: string;
        phone: string;
        hours: string;
        branch_one: string;
        branch_two: string;
        delivery_enabled: boolean;
      };
    }) => d,
  )
  .handler(async ({ data }) => {
    const db = await adminClient(data.password);
    const res = await db
      .from("store_settings")
      .update({ ...data.settings, updated_at: new Date().toISOString() })
      .eq("id", true);
    if (res.error) throw new Error(res.error.message);
    return { ok: true };
  });

export const adminSetOrderStatus = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string; id: string; status: string }) => d)
  .handler(async ({ data }) => {
    const db = await adminClient(data.password);
    const res = await db.from("orders").update({ status: data.status }).eq("id", data.id);
    if (res.error) throw new Error(res.error.message);
    return { ok: true };
  });

export const adminChangePassword = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string; newPassword: string }) => d)
  .handler(async ({ data }) => {
    if (data.newPassword.trim().length < 6) throw new Error("كلمة المرور يجب أن تكون 6 أحرف أو أكثر");
    const db = await adminClient(data.password);
    const res = await db
      .from("store_settings")
      .update({ admin_password_hash: sha256(data.newPassword.trim()) })
      .eq("id", true);
    if (res.error) throw new Error(res.error.message);
    return { ok: true };
  });
