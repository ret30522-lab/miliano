create extension if not exists pgcrypto with schema extensions;

create table public.menu_categories (
  id text primary key,
  label text not null,
  sort integer not null default 0,
  is_active boolean not null default true
);
create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category_id text not null references public.menu_categories(id) on delete cascade,
  name text not null,
  description text not null default '',
  price numeric(10,2) not null default 0,
  image_key text not null default '',
  tag text,
  sort integer not null default 0,
  is_available boolean not null default true,
  created_at timestamptz not null default now()
);
create table public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_key text not null default '',
  price numeric(10,2),
  sort integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create table public.store_settings (
  id boolean primary key default true,
  whatsapp text not null default '966552558372',
  phone text not null default '0552558372',
  hours text not null default 'مفتوح الآن · يغلق ١٢:٣٠ ص',
  branch_one text not null default 'العثيم مول، طريق خريص، النسيم الشرقي، الرياض 14241',
  branch_two text not null default 'حياة مول، طريق الملك عبدالعزيز، الملك فهد، الرياض 12272',
  delivery_enabled boolean not null default true,
  admin_password_hash text not null default encode(extensions.digest('milano2026','sha256'),'hex'),
  updated_at timestamptz not null default now(),
  constraint store_settings_single check (id)
);
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text,
  order_type text not null default 'pickup',
  notes text,
  items jsonb not null default '[]'::jsonb,
  total numeric(10,2) not null default 0,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

grant select on public.menu_categories to anon, authenticated;
grant select on public.menu_items to anon, authenticated;
grant select on public.offers to anon, authenticated;
grant select (id, whatsapp, phone, hours, branch_one, branch_two, delivery_enabled, updated_at) on public.store_settings to anon, authenticated;
grant insert on public.orders to anon, authenticated;
grant all on public.menu_categories to service_role;
grant all on public.menu_items to service_role;
grant all on public.offers to service_role;
grant all on public.store_settings to service_role;
grant all on public.orders to service_role;

alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.offers enable row level security;
alter table public.store_settings enable row level security;
alter table public.orders enable row level security;

create policy "public read categories" on public.menu_categories for select to anon, authenticated using (true);
create policy "public read items" on public.menu_items for select to anon, authenticated using (true);
create policy "public read offers" on public.offers for select to anon, authenticated using (true);
create policy "public read settings" on public.store_settings for select to anon, authenticated using (true);
create policy "public create orders" on public.orders for insert to anon, authenticated with check (true);

create index orders_created_at_idx on public.orders (created_at desc);

insert into public.menu_categories (id,label,sort) values ('pizza','البيتزا',0);
insert into public.menu_categories (id,label,sort) values ('burger','البرجر',10);
insert into public.menu_categories (id,label,sort) values ('pasta','الباستا',20);
insert into public.menu_categories (id,label,sort) values ('sides','الأطباق الجانبية',30);

insert into public.menu_items (slug,category_id,name,description,price,image_key,tag,sort) values
('pizza-supreme','pizza','سوبريم','شرائح البيبروني مع الخضروات الطازجة وصلصة البيتزا الساخنة الخاصة والموزاريلا',35,'pizza-supreme.jpg','الأكثر طلباً',0),
('pizza-fajita','pizza','فاهيتا','قطع فاهيتا الدجاج بالتتبيلة المكسيكية مع الفلفل الأخضر والزيتون الأسود والموزاريلا',35,'pizza-fajita.jpg',null,10),
('pizza-pesto-chicken','pizza','بيستو تشيكن','قطع صدور الدجاج بتتبيلة البهارات الإيطالية وصلصة الريحان الخاصة والموزاريلا',35,'pizza-pesto.jpg','وصفة مليانو',20),
('pizza-cheese-zaatar','pizza','جبنة وزعتر','مزيج الجبنة اللذيذة مع الزعتر والموزاريلا',25,'pizza-zaatar.jpg',null,30),
('pizza-cheese-lovers','pizza','تشيز لافرز','خلطة الأجبان اللذيذة مع صلصة البيتزا الساخنة والموزاريلا',35,'pizza-cheese.jpg',null,40),
('pizza-veggie','pizza','فيجي (خضار)','مزيج من الفلفل الأخضر والزيتون الأسود وشرائح البصل والفطر مع صلصة البيتزا والموزاريلا',25,'pizza-veggie.jpg',null,50),
('pizza-ranch-chicken','pizza','رانش تشيكن','دجاج مشوي مع صوص الرانش الممزوج بجبنة الموزاريلا',35,'pizza-ranch.jpg','الأكثر طلباً',60),
('pizza-labneh-honey','pizza','لبنة بالعسل','لبنة طازجة مغطاة بالعسل مع جبنة الموزاريلا',25,'pizza-labneh-honey.jpg',null,70),
('pizza-labneh-thyme','pizza','لبنة وزعتر','مزيج من اللبنة الطازجة والزعتر',25,'pizza-labneh-thyme.jpg',null,80),
('pizza-liquid-fajita','pizza','فاهيتا بالجبن السائل','قطع دجاج الفاهيتا بالتتبيلة المكسيكية مع الزيتون الأسود والفلفل الأخضر والجبن السائل والموزاريلا',35,'pizza-fajita.jpg',null,90),
('pizza-buffalo','pizza','بافلو تشيكن','قطع دجاج البافلو المتبل مع شرائح البصل والفلفل الأخضر والزيتون الأسود والموزاريلا',35,'pizza-buffalo.jpg',null,100),
('pizza-margherita','pizza','مارغريتا','مزيج من التوابل الإيطالية الفاخرة مع جبن الموزاريلا وصلصة البيتزا الساخنة الخاصة',25,'pizza-margherita.jpg',null,110),
('pizza-super-supreme','pizza','سوبر سوبريم','شرائح البيبروني مع الفلفل والخضروات الطازجة مع صلصة البيتزا الساخنة الخاصة والموزاريلا',35,'pizza-supreme.jpg',null,120),
('pizza-bbq','pizza','بي بي كيو تشيكن','قطع صدور الدجاج المشوية مع شرائح البصل وخليط صوص الباربيكيو مع الجبن السائل والموزاريلا',35,'pizza-bbq.jpg',null,130),
('pizza-liquid-cheese','pizza','جبن سائل','مزيج من الجبن الفرنسي السائل مع الموزاريلا',25,'pizza-liquid-cheese.jpg',null,140),
('pizza-super-ranch','pizza','سوبر رانش','قطع الدجاج المتبلة مع صوص الرانش الخاص على طبقة من صلصة الجبن السائل مغطاة بالموزاريلا',35,'pizza-ranch.jpg',null,150),
('pizza-sausage','pizza','سوسيج','شرائح البيبروني مع الفلفل والخضروات الطازجة والفطر والزيتون الأسود مع صلصة البيتزا والموزاريلا',25,'pizza-sausage.jpg',null,160),
('burger-chicken','burger','تشيكن برجر','دجاج مقرمش مع الخس والمايونيز الخاص',17,'burger-chicken.jpg','الأكثر طلباً',0),
('pasta-alfredo','pasta','فيتوتشيني ألفريدو','باستا فيتوتشيني مع صلصة الألفريدو البيضاء وقطع الدجاج بالتتبيلة المكسيكية والفلفل الرومي الملون',28,'pasta-alfredo.jpg','الأكثر طلباً',0),
('pasta-classic-fettuccine','pasta','فيتوتشيني كلاسيك','باستا فيتوتشيني محضرة بالصوص الأبيض الكلاسيكي',28,'pasta-alfredo.jpg',null,10),
('pasta-cajun','pasta','باستا كيجن','باستا ببهارات الكيجن مع الفلفل الرومي الملون وجبنة البارميزان',28,'pasta-cajun.jpg',null,20),
('pasta-pesto','pasta','مليانو بيستو','باستا محضرة بصلصة البيستو (الريحان) الخاصة بنا',28,'pasta-pesto.jpg','وصفة مليانو',30),
('pasta-special','pasta','سبيشل باستا','باستا مليانو الخاصة',28,'pasta-arrabiata.jpg',null,40),
('pasta-pepperoni','pasta','بيبروني باستا','باستا غنية بصلصة الطماطم وشرائح البيبروني وجبنة الموزاريلا',28,'pasta-pepperoni.jpg',null,50),
('pasta-classic','pasta','كلاسيك باستا','باستا كلاسيكية مع الفلفل الرومي الملون وجبنة الموزاريلا',28,'pasta-cajun.jpg',null,60),
('pasta-pesto-fettuccine','pasta','بيستو فيتوتشيني','مكرونة فيتوتشيني بصلصة الريحان الطازجة',28,'pasta-pesto.jpg',null,70),
('pasta-arrabiata','pasta','فيتوتشيني أرابياتا','باستا فيتوتشيني بصلصة الطماطم الحارة (أرابياتا)',28,'pasta-arrabiata.jpg',null,80),
('pasta-chicken-red','pasta','باستا الدجاج بالصلصة الحمراء','باستا بصلصة الطماطم الحمراء مع قطع الدجاج المشوي',28,'pasta-pepperoni.jpg',null,90),
('salad-milano','sides','سلطة مليانو','تشكيلة من الخضار الطازجة بصلصتنا الخاصة',12,'salad.jpg',null,0),
('salad-mexican','sides','سلطة مليانو المكسيكية','خس وقطع الخبز المحمص',12,'salad-mexican.jpg',null,10),
('fries-wedges','sides','بطاطس ويدجز','فرايز ويدجز مقلية مقرمشة',12,'fries-wedges.jpg',null,20),
('fries-french','sides','بطاطس مقلية','بطاطس أصابع مقلية',9,'fries.jpg',null,30),
('wraps-cheese-roll','sides','رول الدجاج بالجبن','قطع دجاج مشوية مع فلفل رومي ملون وجبن موزاريلا وصوص خاص',14,'wraps.jpg',null,40),
('kids-meal','sides','وجبة الأطفال','وجبة شهية وممتعة للأطفال',14,'kids-meal.jpg',null,50);

insert into public.offers (title, image_key, price, sort) values
('عرض الكرم — ٣ بيتزا وباستا و٣ سلطات','offer-karam-49.jpg',49,0),
('عرض الكرم — ٣ بيتزا وباستا و٣ مشروبات','offer-karam-96.jpg',96,10);

insert into public.store_settings (id) values (true);