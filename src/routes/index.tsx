import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categories, type MenuItem } from "@/lib/menu";
import logoAsset from "@/assets/logo.jpg.asset.json";
import pizzaHero from "@/assets/pizza.jpg";
import boxAsset from "@/assets/box.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مليانو بيتزا | اطلب أونلاين عبر واتساب" },
      {
        name: "description",
        content:
          "مليانو بيتزا في العثيم مول بالرياض — بيتزا، برجر، باستا وبطاطس محشوة. اطلب الآن عبر واتساب 0552558372. تقييم 4.9 من 452 مراجعة.",
      },
      { property: "og:title", content: "مليانو بيتزا | اطلب أونلاين عبر واتساب" },
      {
        property: "og:description",
        content: "اللذة تبدأ من هنا — اطلب من منيو مليانو بيتزا وأرسل طلبك عبر واتساب.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP = "966552558372";
const CUSTOMER_INFO_KEY = "miliano-customer-info";

type Cart = Record<string, number>;
type OrderType = "pickup" | "delivery";
type CustomerInfo = {
  name: string;
  phone: string;
  address: string;
};

function Index() {
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCat, setActiveCat] = useState("pizza");
  const [orderType, setOrderType] = useState<OrderType>("pickup");
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  // Load saved customer info on mount
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(CUSTOMER_INFO_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as CustomerInfo;
        setCustomerInfo({
          name: parsed.name || "",
          phone: parsed.phone || "",
          address: parsed.address || "",
        });
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  // Auto-save customer info whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(CUSTOMER_INFO_KEY, JSON.stringify(customerInfo));
    }
  }, [customerInfo]);

  const { count, total, lines } = useMemo(() => {
    let count = 0;
    let total = 0;
    const lines: { item: MenuItem; qty: number }[] = [];
    for (const cat of categories) {
      for (const item of cat.items) {
        const qty = cart[item.id] ?? 0;
        if (qty > 0) {
          count += qty;
          total += qty * item.price;
          lines.push({ item, qty });
        }
      }
    }
    return { count, total, lines };
  }, [cart]);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const remove = (id: string) =>
    setCart((c) => {
      const qty = c[id] ?? 0;
      const next = { ...c };
      if (qty <= 1) delete next[id];
      else next[id] = qty - 1;
      return next;
    });

  const orderViaWhatsApp = () => {
    const body = lines
      .map((l) => `• ${l.item.name} × ${l.qty} = ${l.qty * l.item.price} ر.س`)
      .join("\n");
    const typeLine =
      orderType === "pickup"
        ? "طريقة الاستلام: الاستلام من المتجر"
        : `طريقة الاستلام: التوصيل\nالعنوان: ${address || "لم يُحدد بعد"}`;
    const text = encodeURIComponent(
      `السلام عليكم، أود الطلب من مليانو بيتزا:\n\n${body}\n\n${typeLine}\n\nالإجمالي: ${total} ر.س`,
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="شعار مليانو بيتزا"
              className="h-12 w-12 rounded-full border-2 border-accent object-cover"
            />
            <div>
              <p className="text-lg font-extrabold leading-tight text-primary">مليانو بيتزا</p>
              <p className="text-xs text-muted-foreground">العثيم مول · الرياض</p>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground sm:flex">
              ★ 4.9 <span className="text-muted-foreground">(452)</span>
            </span>
            <button
              onClick={() => setCartOpen(true)}
              className="relative rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-90"
            >
              السلة
              {count > 0 && (
                <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div className="text-center md:text-right">
            <p className="mb-3 inline-block rounded-full border border-primary-foreground/30 px-4 py-1 text-sm">
              مفتوح الآن · يغلق ١٢:٣٠ ص
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              اللذة تبدأ من هنا
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              بيتزا على أصولها، برجر مقرمش، وباستا كريمية — اختر طلبك وأرسله لنا على واتساب بضغطة واحدة.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href="#menu"
                className="rounded-full bg-accent px-7 py-3 text-base font-extrabold text-accent-foreground shadow-lg transition hover:brightness-110"
              >
                تصفح المنيو واطلب
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-primary-foreground/40 px-7 py-3 text-base font-bold transition hover:bg-primary-foreground/10"
              >
                واتساب مباشر
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <img
              src={pizzaHero}
              alt="بيتزا بيبروني من مليانو بيتزا"
              width={1024}
              height={1280}
              className="animate-float-slow w-full rounded-3xl border-4 border-accent/60 object-cover shadow-2xl"
            />
            <div className="absolute -bottom-4 right-4 rounded-2xl bg-background px-4 py-2 text-sm font-bold text-foreground shadow-xl">
              ★ 4.9 — أعلى تقييم في النسيم
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border bg-accent py-2" dir="ltr">
        <div className="animate-marquee flex w-[200%] gap-8 whitespace-nowrap text-sm font-extrabold text-accent-foreground">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-8">
              {["بيتزا طازجة", "عجينة يومية", "جبنة موزاريلا 100%", "توصيل سريع", "اللذة تبدأ من هنا"].map(
                (t) => (
                  <span key={t}>✦ {t}</span>
                ),
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Menu */}
      <main id="menu" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-black text-primary md:text-4xl">قائمة الطعام</h2>
        <p className="mt-2 text-center text-muted-foreground">
          أضف ما يعجبك للسلة، ثم أرسل الطلب عبر واتساب
        </p>

        <div className="sticky top-[73px] z-30 mt-8 flex gap-2 overflow-x-auto bg-background/95 py-3 backdrop-blur">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCat(c.id);
                document.getElementById(`cat-${c.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition ${
                activeCat === c.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {categories.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-36 pt-10">
            <h3 className="mb-6 flex items-center gap-3 text-2xl font-extrabold text-primary">
              {cat.label}
              <span className="h-px flex-1 bg-border" />
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item) => {
                const qty = cart[item.id] ?? 0;
                return (
                  <article
                    key={item.id}
                    className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      {item.tag && (
                        <span className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-foreground">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-lg font-extrabold">{item.name}</h4>
                        <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-sm font-extrabold text-primary">
                          {item.price} ر.س
                        </span>
                      </div>
                      <p className="mt-1 min-h-10 text-sm text-muted-foreground">{item.desc}</p>
                      {qty === 0 ? (
                        <button
                          onClick={() => add(item.id)}
                          className="mt-4 w-full rounded-full bg-primary py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
                        >
                          أضف للسلة +
                        </button>
                      ) : (
                        <div className="mt-4 flex items-center justify-between rounded-full bg-secondary p-1">
                          <button
                            onClick={() => add(item.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground"
                            aria-label="زيادة الكمية"
                          >
                            +
                          </button>
                          <span className="text-base font-extrabold">{qty}</span>
                          <button
                            onClick={() => remove(item.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-lg font-bold text-foreground"
                            aria-label="تقليل الكمية"
                          >
                            −
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* About / packaging */}
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
          <img
            src={boxAsset.url}
            alt="تغليف مليانو برجر الأخضر المميز"
            loading="lazy"
            className="w-full rounded-3xl object-cover shadow-xl"
          />
          <div className="text-center md:text-right">
            <h2 className="text-3xl font-black text-primary">تغليف يليق بالطعم</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              كل طلب يوصلك بتغليفنا الأخضر المميز — «اللذة تبدأ من هنا». نحضّر كل شيء طازجاً عند الطلب،
              من العجينة إلى الصوصات الخاصة.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-6 md:justify-start">
              <div>
                <p className="text-3xl font-black text-accent">+452</p>
                <p className="text-sm text-muted-foreground">مراجعة خمس نجوم</p>
              </div>
              <div>
                <p className="text-3xl font-black text-accent">2024</p>
                <p className="text-sm text-muted-foreground">سنة التأسيس</p>
              </div>
              <div>
                <p className="text-3xl font-black text-accent">4.9</p>
                <p className="text-sm text-muted-foreground">تقييم العملاء</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-center md:grid-cols-3 md:text-right">
          <div>
            <img
              src={logoAsset.url}
              alt="شعار مليانو بيتزا"
              className="mx-auto h-20 w-20 rounded-2xl border-2 border-accent object-cover md:mx-0"
            />
            <p className="mt-3 font-extrabold">مليانو بيتزا — تأسست 2024</p>
          </div>
          <div>
            <h4 className="font-extrabold text-accent">الموقع والدوام</h4>
            <p className="mt-2 text-sm text-primary-foreground/80">
              العثيم مول، طريق خريص، النسيم الشرقي، الرياض 14241
            </p>
            <p className="mt-1 text-sm text-primary-foreground/80">يومياً حتى ١٢:٣٠ منتصف الليل</p>
          </div>
          <div>
            <h4 className="font-extrabold text-accent">اطلب الآن</h4>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block rounded-full bg-accent px-6 py-2 font-bold text-accent-foreground transition hover:brightness-110"
              dir="ltr"
            >
              055 255 8372
            </a>
          </div>
        </div>
      </footer>

      {/* Floating cart button */}
      {count > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full bg-accent px-6 py-3 font-extrabold text-accent-foreground shadow-2xl transition hover:brightness-110"
        >
          عرض السلة · {count} منتج · {total} ر.س
        </button>
      )}

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noreferrer"
        aria-label="تواصل عبر واتساب"
        className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.759.987.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setCartOpen(false)}
            aria-label="إغلاق السلة"
          />
          <aside className="relative flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-border p-5">
              <h3 className="text-xl font-extrabold text-primary">سلة الطلب</h3>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full bg-secondary px-3 py-1 text-sm font-bold"
              >
                إغلاق ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {lines.length === 0 ? (
                <p className="mt-10 text-center text-muted-foreground">
                  السلة فارغة — أضف أطباقك المفضلة من المنيو
                </p>
              ) : (
                <ul className="space-y-4">
                  {lines.map(({ item, qty }) => (
                    <li key={item.id} className="flex items-center gap-3 rounded-2xl border border-border p-3">
                      <img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.price} ر.س</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => add(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground"
                          aria-label="زيادة"
                        >
                          +
                        </button>
                        <span className="w-5 text-center font-bold">{qty}</span>
                        <button
                          onClick={() => remove(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary"
                          aria-label="نقصان"
                        >
                          −
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {lines.length > 0 && (
              <div className="border-t border-border p-5">
                <div className="mb-4 space-y-3">
                  <p className="text-sm font-bold text-muted-foreground">طريقة الاستلام</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setOrderType("pickup")}
                      className={`flex-1 rounded-full py-2 text-sm font-bold transition ${
                        orderType === "pickup"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-muted"
                      }`}
                    >
                      الاستلام من المتجر
                    </button>
                    <button
                      onClick={() => setOrderType("delivery")}
                      className={`flex-1 rounded-full py-2 text-sm font-bold transition ${
                        orderType === "delivery"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-muted"
                      }`}
                    >
                      التوصيل
                    </button>
                  </div>
                  {orderType === "delivery" && (
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="اكتب عنوان التوصيل بالتفصيل..."
                      className="w-full rounded-2xl border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      rows={3}
                    />
                  )}
                </div>
                <div className="mb-4 flex items-center justify-between text-lg font-extrabold">
                  <span>الإجمالي</span>
                  <span className="text-accent">{total} ر.س</span>
                </div>
                <button
                  onClick={orderViaWhatsApp}
                  className="w-full rounded-full bg-primary py-3.5 text-base font-extrabold text-primary-foreground transition hover:opacity-90"
                >
                  إرسال الطلب عبر واتساب
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
