import { supabase } from "@/integrations/supabase/client";
import { resolveImage } from "@/lib/product-images";
import { categories as staticCategories, type Category } from "@/lib/menu";

export type StoreSettings = {
  whatsapp: string;
  phone: string;
  hours: string;
  branch_one: string;
  branch_two: string;
  delivery_enabled: boolean;
};

export type Offer = {
  id: string;
  title: string;
  image_key: string;
  price: number | null;
  sort: number;
  is_active: boolean;
};

export const defaultSettings: StoreSettings = {
  whatsapp: "966552558372",
  phone: "0552558372",
  hours: "مفتوح الآن · يغلق ١٢:٣٠ ص",
  branch_one: "العثيم مول، طريق خريص، النسيم الشرقي، الرياض 14241",
  branch_two: "حياة مول، طريق الملك عبدالعزيز، الملك فهد، الرياض 12272",
  delivery_enabled: true,
};

export async function fetchMenu(): Promise<Category[]> {
  const [cats, items] = await Promise.all([
    supabase.from("menu_categories").select("*").eq("is_active", true).order("sort"),
    supabase.from("menu_items").select("*").eq("is_available", true).order("sort"),
  ]);
  if (cats.error || items.error || !cats.data?.length) return staticCategories;

  return cats.data.map((c) => ({
    id: c.id,
    label: c.label,
    items: (items.data ?? [])
      .filter((i) => i.category_id === c.id)
      .map((i) => ({
        id: i.slug,
        name: i.name,
        desc: i.description,
        price: Number(i.price),
        image: resolveImage(i.image_key),
        ...(i.tag ? { tag: i.tag } : {}),
      })),
  }));
}

export async function fetchOffers(): Promise<Offer[]> {
  const { data, error } = await supabase
    .from("offers")
    .select("*")
    .eq("is_active", true)
    .order("sort");
  if (error || !data) return [];
  return data.map((o) => ({
    id: o.id,
    title: o.title,
    image_key: o.image_key,
    price: o.price === null ? null : Number(o.price),
    sort: o.sort,
    is_active: o.is_active,
  }));
}

export async function fetchSettings(): Promise<StoreSettings> {
  const { data, error } = await supabase
    .from("store_settings")
    .select("whatsapp, phone, hours, branch_one, branch_two, delivery_enabled")
    .maybeSingle();
  if (error || !data) return defaultSettings;
  return data as StoreSettings;
}

export type NewOrder = {
  customer_name: string;
  phone: string;
  address: string | null;
  order_type: string;
  notes: string | null;
  items: { name: string; qty: number; price: number }[];
  total: number;
};

export async function saveOrder(order: NewOrder) {
  await supabase.from("orders").insert(order);
}
