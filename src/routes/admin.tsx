import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  adminChangePassword,
  adminDeleteItem,
  adminDeleteOffer,
  adminLoadAll,
  adminLogin,
  adminSaveItem,
  adminSaveOffer,
  adminSaveSettings,
  adminSetOrderStatus,
} from "@/lib/admin.functions";
import { imageKeys, resolveImage } from "@/lib/product-images";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة تحكم مليانو بيتزا" },
      { name: "description", content: "لوحة إدارة المنيو والعروض والطلبات ومعلومات مطعم مليانو بيتزا." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "لوحة تحكم مليانو بيتزا" },
      { property: "og:description", content: "إدارة المنيو والأسعار والعروض والطلبات." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const PASS_KEY = "miliano-admin-pass";

type Item = {
  id: string;
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
type Offer = {
  id: string;
  title: string;
  image_key: string;
  price: number | null;
  sort: number;
  is_active: boolean;
};
type Settings = {
  whatsapp: string;
  phone: string;
  hours: string;
  branch_one: string;
  branch_two: string;
  delivery_enabled: boolean;
};
type Order = {
  id: string;
  customer_name: string;
  phone: string;
  address: string | null;
  order_type: string;
  notes: string | null;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: string;
  created_at: string;
};
type Data = {
  categories: { id: string; label: string; sort: number }[];
  items: Item[];
  offers: Offer[];
  settings: Settings | null;
  orders: Order[];
};

const emptyItem = (categoryId: string): Item => ({
  id: "",
  slug: "",
  category_id: categoryId,
  name: "",
  description: "",
  price: 0,
  image_key: imageKeys[0] ?? "",
  tag: null,
  sort: 999,
  is_available: true,
});

const inputCls =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";
const btnCls = "rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground";
const ghostBtn = "rounded-full bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground";

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"orders" | "menu" | "offers" | "settings">("orders");
  const [data, setData] = useState<Data | null>(null);
  const [busy, setBusy] = useState(false);

  const login = useServerFn(adminLogin);
  const loadAll = useServerFn(adminLoadAll);
  const saveItem = useServerFn(adminSaveItem);
  const deleteItem = useServerFn(adminDeleteItem);
  const saveOffer = useServerFn(adminSaveOffer);
  const deleteOffer = useServerFn(adminDeleteOffer);
  const saveSettings = useServerFn(adminSaveSettings);
  const setOrderStatus = useServerFn(adminSetOrderStatus);
  const changePassword = useServerFn(adminChangePassword);

  const refresh = async (pass: string) => {
    const res = (await loadAll({ data: { password: pass } })) as Data;
    setData({
      ...res,
      items: res.items.map((i) => ({ ...i, price: Number(i.price) })),
      offers: res.offers.map((o) => ({ ...o, price: o.price === null ? null : Number(o.price) })),
      orders: res.orders.map((o) => ({ ...o, total: Number(o.total) })),
    });
  };

  const doLogin = async (pass: string) => {
    setBusy(true);
    try {
      await login({ data: { password: pass } });
      await refresh(pass);
      setPassword(pass);
      setAuthed(true);
      window.localStorage.setItem(PASS_KEY, pass);
    } catch (e) {
      window.localStorage.removeItem(PASS_KEY);
      toast.error(e instanceof Error ? e.message : "تعذر الدخول");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    const saved = window.localStorage.getItem(PASS_KEY);
    if (saved) void doLogin(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const run = async (fn: () => Promise<unknown>, message: string) => {
    setBusy(true);
    try {
      await fn();
      await refresh(password);
      toast.success(message);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "حدث خطأ");
    } finally {
      setBusy(false);
    }
  };

  if (!authed) {
    return (
      <div dir="rtl" className="flex min-h-screen items-center justify-center bg-background px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void doLogin(password);
          }}
          className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-lg"
        >
          <h1 className="text-2xl font-black text-primary">لوحة تحكم مليانو بيتزا</h1>
          <p className="mt-2 text-sm text-muted-foreground">أدخل كلمة مرور الإدارة للمتابعة</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            className={`${inputCls} mt-6`}
          />
          <button type="submit" disabled={busy} className={`${btnCls} mt-4 w-full disabled:opacity-60`}>
            {busy ? "جارٍ التحقق..." : "دخول"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <h1 className="text-lg font-black text-primary">لوحة التحكم</h1>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["orders", "الطلبات"],
                ["menu", "المنيو"],
                ["offers", "العروض"],
                ["settings", "المتجر"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  tab === id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => {
                window.localStorage.removeItem(PASS_KEY);
                setAuthed(false);
                setPassword("");
              }}
              className="rounded-full border border-border px-4 py-2 text-sm font-bold"
            >
              خروج
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {!data ? (
          <p className="text-muted-foreground">جارٍ التحميل...</p>
        ) : tab === "orders" ? (
          <OrdersTab
            orders={data.orders}
            onStatus={(id, status) =>
              run(() => setOrderStatus({ data: { password, id, status } }), "تم تحديث حالة الطلب")
            }
          />
        ) : tab === "menu" ? (
          <MenuTab
            data={data}
            onSave={(item) => run(() => saveItem({ data: { password, item: toPayload(item) } }), "تم حفظ الصنف")}
            onDelete={(id) => run(() => deleteItem({ data: { password, id } }), "تم حذف الصنف")}
          />
        ) : tab === "offers" ? (
          <OffersTab
            offers={data.offers}
            onSave={(offer) =>
              run(
                () =>
                  saveOffer({
                    data: {
                      password,
                      offer: offer.id
                        ? offer
                        : {
                            title: offer.title,
                            image_key: offer.image_key,
                            price: offer.price,
                            sort: offer.sort,
                            is_active: offer.is_active,
                          },
                    },
                  }),
                "تم حفظ العرض",
              )
            }
            onDelete={(id) => run(() => deleteOffer({ data: { password, id } }), "تم حذف العرض")}
          />
        ) : (
          <SettingsTab
            settings={data.settings}
            onSave={(settings) => run(() => saveSettings({ data: { password, settings } }), "تم حفظ المعلومات")}
            onChangePassword={(newPassword) =>
              run(async () => {
                await changePassword({ data: { password, newPassword } });
                window.localStorage.setItem(PASS_KEY, newPassword);
                setPassword(newPassword);
              }, "تم تغيير كلمة المرور")
            }
          />
        )}
      </main>
    </div>
  );
}

function toPayload(item: Item) {
  const payload = {
    slug: item.slug.trim(),
    category_id: item.category_id,
    name: item.name.trim(),
    description: item.description.trim(),
    price: Number(item.price) || 0,
    image_key: item.image_key,
    tag: item.tag?.trim() ? item.tag.trim() : null,
    sort: Number(item.sort) || 0,
    is_available: item.is_available,
  };
  return item.id ? { id: item.id, ...payload } : payload;
}

function OrdersTab({
  orders,
  onStatus,
}: {
  orders: Order[];
  onStatus: (id: string, status: string) => void;
}) {
  const totals = useMemo(() => {
    const today = new Date().toDateString();
    const todays = orders.filter((o) => new Date(o.created_at).toDateString() === today);
    return {
      count: orders.length,
      today: todays.length,
      revenue: todays.reduce((s, o) => s + o.total, 0),
    };
  }, [orders]);

  return (
    <div>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          ["إجمالي الطلبات", String(totals.count)],
          ["طلبات اليوم", String(totals.today)],
          ["مبيعات اليوم", `${totals.revenue} ر.س`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-black text-primary">{value}</p>
          </div>
        ))}
      </div>

      {orders.length === 0 && <p className="text-muted-foreground">لا توجد طلبات بعد.</p>}

      <div className="space-y-4">
        {orders.map((o) => (
          <article key={o.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-extrabold text-primary">
                  {o.customer_name} — {o.phone}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(o.created_at).toLocaleString("ar-SA")} ·{" "}
                  {o.order_type === "delivery" ? "توصيل" : "استلام من المتجر"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{o.total} ر.س</span>
                <select
                  value={o.status}
                  onChange={(e) => onStatus(o.id, e.target.value)}
                  className="rounded-full border border-border bg-background px-3 py-1 text-sm"
                >
                  <option value="new">جديد</option>
                  <option value="preparing">قيد التحضير</option>
                  <option value="done">مكتمل</option>
                  <option value="cancelled">ملغي</option>
                </select>
              </div>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              {o.items?.map((line, idx) => (
                <li key={idx}>
                  • {line.name} × {line.qty} = {line.qty * line.price} ر.س
                </li>
              ))}
            </ul>
            {o.address && <p className="mt-2 text-sm">العنوان: {o.address}</p>}
            {o.notes && <p className="mt-1 text-sm">ملاحظات: {o.notes}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}

function MenuTab({
  data,
  onSave,
  onDelete,
}: {
  data: Data;
  onSave: (item: Item) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState<Item | null>(null);
  const [category, setCategory] = useState(data.categories[0]?.id ?? "pizza");

  const items = data.items.filter((i) => i.category_id === category);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {data.categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              category === c.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            {c.label}
          </button>
        ))}
        <button onClick={() => setEditing(emptyItem(category))} className={`${btnCls} mr-auto`}>
          + إضافة صنف
        </button>
      </div>

      {editing && (
        <ItemForm
          item={editing}
          categories={data.categories}
          onCancel={() => setEditing(null)}
          onSave={(item) => {
            onSave(item);
            setEditing(null);
          }}
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card">
            {resolveImage(item.image_key) && (
              <img src={resolveImage(item.image_key)} alt={item.name} className="h-36 w-full object-cover" />
            )}
            <div className="p-4">
              <p className="font-extrabold text-primary">{item.name}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
              <p className="mt-2 font-bold">{item.price} ر.س</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => setEditing(item)} className={ghostBtn}>
                  تعديل
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="rounded-full border border-destructive px-4 py-2 text-sm font-bold text-destructive"
                >
                  حذف
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ItemForm({
  item,
  categories,
  onSave,
  onCancel,
}: {
  item: Item;
  categories: { id: string; label: string }[];
  onSave: (item: Item) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Item>(item);
  useEffect(() => setForm(item), [item]);
  const set = <K extends keyof Item>(key: K, value: Item[K]) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ ...form, slug: form.slug || `item-${Date.now()}` });
      }}
      className="mb-8 grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
    >
      <label className="text-sm font-bold">
        الاسم
        <input className={`${inputCls} mt-1`} value={form.name} onChange={(e) => set("name", e.target.value)} required />
      </label>
      <label className="text-sm font-bold">
        السعر (ر.س)
        <input
          type="number"
          step="1"
          className={`${inputCls} mt-1`}
          value={form.price}
          onChange={(e) => set("price", Number(e.target.value))}
          required
        />
      </label>
      <label className="text-sm font-bold sm:col-span-2">
        الوصف
        <textarea
          className={`${inputCls} mt-1`}
          rows={2}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </label>
      <label className="text-sm font-bold">
        القسم
        <select
          className={`${inputCls} mt-1`}
          value={form.category_id}
          onChange={(e) => set("category_id", e.target.value)}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-bold">
        الصورة
        <select className={`${inputCls} mt-1`} value={form.image_key} onChange={(e) => set("image_key", e.target.value)}>
          {imageKeys.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-bold">
        شارة (اختياري)
        <input className={`${inputCls} mt-1`} value={form.tag ?? ""} onChange={(e) => set("tag", e.target.value)} />
      </label>
      <label className="text-sm font-bold">
        الترتيب
        <input
          type="number"
          className={`${inputCls} mt-1`}
          value={form.sort}
          onChange={(e) => set("sort", Number(e.target.value))}
        />
      </label>
      <label className="flex items-center gap-2 text-sm font-bold">
        <input
          type="checkbox"
          checked={form.is_available}
          onChange={(e) => set("is_available", e.target.checked)}
        />
        متوفر للعرض في المنيو
      </label>
      <div className="flex gap-2 sm:col-span-2">
        <button type="submit" className={btnCls}>
          حفظ
        </button>
        <button type="button" onClick={onCancel} className={ghostBtn}>
          إلغاء
        </button>
      </div>
    </form>
  );
}

function OffersTab({
  offers,
  onSave,
  onDelete,
}: {
  offers: Offer[];
  onSave: (offer: Offer) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState<Offer | null>(null);

  return (
    <div>
      <button
        onClick={() =>
          setEditing({ id: "", title: "", image_key: imageKeys[0] ?? "", price: null, sort: 100, is_active: true })
        }
        className={`${btnCls} mb-6`}
      >
        + إضافة عرض
      </button>

      {editing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(editing);
            setEditing(null);
          }}
          className="mb-8 grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
        >
          <label className="text-sm font-bold sm:col-span-2">
            عنوان العرض
            <input
              className={`${inputCls} mt-1`}
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              required
            />
          </label>
          <label className="text-sm font-bold">
            السعر (اختياري)
            <input
              type="number"
              className={`${inputCls} mt-1`}
              value={editing.price ?? ""}
              onChange={(e) => setEditing({ ...editing, price: e.target.value ? Number(e.target.value) : null })}
            />
          </label>
          <label className="text-sm font-bold">
            صورة العرض
            <select
              className={`${inputCls} mt-1`}
              value={editing.image_key}
              onChange={(e) => setEditing({ ...editing, image_key: e.target.value })}
            >
              {imageKeys.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm font-bold">
            <input
              type="checkbox"
              checked={editing.is_active}
              onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
            />
            العرض ظاهر في الموقع
          </label>
          <div className="flex gap-2 sm:col-span-2">
            <button type="submit" className={btnCls}>
              حفظ
            </button>
            <button type="button" onClick={() => setEditing(null)} className={ghostBtn}>
              إلغاء
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {offers.map((o) => (
          <article key={o.id} className="overflow-hidden rounded-2xl border border-border bg-card">
            {resolveImage(o.image_key) && (
              <img src={resolveImage(o.image_key)} alt={o.title} className="w-full object-cover" />
            )}
            <div className="p-4">
              <p className="font-extrabold text-primary">{o.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {o.price ? `${o.price} ر.س` : "بدون سعر"} · {o.is_active ? "ظاهر" : "مخفي"}
              </p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => setEditing(o)} className={ghostBtn}>
                  تعديل
                </button>
                <button
                  onClick={() => onDelete(o.id)}
                  className="rounded-full border border-destructive px-4 py-2 text-sm font-bold text-destructive"
                >
                  حذف
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function SettingsTab({
  settings,
  onSave,
  onChangePassword,
}: {
  settings: Settings | null;
  onSave: (settings: Settings) => void;
  onChangePassword: (newPassword: string) => void;
}) {
  const [form, setForm] = useState<Settings>(
    settings ?? {
      whatsapp: "",
      phone: "",
      hours: "",
      branch_one: "",
      branch_two: "",
      delivery_enabled: true,
    },
  );
  const [newPassword, setNewPassword] = useState("");
  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6"
      >
        <h2 className="text-lg font-black text-primary">معلومات المتجر</h2>
        <label className="text-sm font-bold">
          رقم واتساب (بصيغة 9665xxxxxxxx)
          <input
            className={`${inputCls} mt-1`}
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          />
        </label>
        <label className="text-sm font-bold">
          رقم الجوال المعروض
          <input
            className={`${inputCls} mt-1`}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </label>
        <label className="text-sm font-bold">
          أوقات العمل
          <input
            className={`${inputCls} mt-1`}
            value={form.hours}
            onChange={(e) => setForm({ ...form, hours: e.target.value })}
          />
        </label>
        <label className="text-sm font-bold">
          الفرع الأول
          <input
            className={`${inputCls} mt-1`}
            value={form.branch_one}
            onChange={(e) => setForm({ ...form, branch_one: e.target.value })}
          />
        </label>
        <label className="text-sm font-bold">
          الفرع الثاني
          <input
            className={`${inputCls} mt-1`}
            value={form.branch_two}
            onChange={(e) => setForm({ ...form, branch_two: e.target.value })}
          />
        </label>
        <label className="flex items-center gap-2 text-sm font-bold">
          <input
            type="checkbox"
            checked={form.delivery_enabled}
            onChange={(e) => setForm({ ...form, delivery_enabled: e.target.checked })}
          />
          خدمة التوصيل متاحة
        </label>
        <button type="submit" className={btnCls}>
          حفظ المعلومات
        </button>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onChangePassword(newPassword);
          setNewPassword("");
        }}
        className="grid h-fit gap-4 rounded-2xl border border-border bg-card p-6"
      >
        <h2 className="text-lg font-black text-primary">كلمة مرور اللوحة</h2>
        <label className="text-sm font-bold">
          كلمة مرور جديدة
          <input
            type="password"
            className={`${inputCls} mt-1`}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={6}
            required
          />
        </label>
        <button type="submit" className={btnCls}>
          تغيير كلمة المرور
        </button>
      </form>
    </div>
  );
}
