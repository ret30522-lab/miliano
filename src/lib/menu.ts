import pizzaImg from "@/assets/products/pizza.jpg";
import burgerImg from "@/assets/products/burger.jpg";
import friesImg from "@/assets/products/fries.jpg";
import pastaRedImg from "@/assets/products/pasta-red.jpg";
import pastaWhiteImg from "@/assets/products/pasta-white.jpg";
import saladImg from "@/assets/products/salad.jpg";
import wrapsImg from "@/assets/products/wraps.jpg";

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  tag?: string;
};

export type Category = { id: string; label: string; items: MenuItem[] };

export const categories: Category[] = [
  {
    id: "pizza",
    label: "البيتزا",
    items: [
      {
        id: "pizza-supreme",
        name: "سوبريم",
        desc: "شرائح البيبروني مع الخضروات الطازجة وصلصة البيتزا الساخنة الخاصة والموزاريلا",
        price: 35,
        image: pizzaImg,
        tag: "الأكثر طلباً",
      },
      {
        id: "pizza-fajita",
        name: "فاهيتا",
        desc: "قطع فاهيتا الدجاج بالتتبيلة المكسيكية مع الفلفل الأخضر والزيتون الأسود والموزاريلا",
        price: 35,
        image: pizzaImg,
      },
      {
        id: "pizza-pesto-chicken",
        name: "بيستو تشيكن",
        desc: "قطع صدور الدجاج بتتبيلة البهارات الإيطالية وصلصة الريحان الخاصة والموزاريلا",
        price: 35,
        image: pizzaImg,
        tag: "وصفة مليانو",
      },
      {
        id: "pizza-cheese-zaatar",
        name: "جبنة وزعتر",
        desc: "مزيج الجبنة اللذيذة مع الزعتر والموزاريلا",
        price: 25,
        image: pizzaImg,
      },
      {
        id: "pizza-cheese-lovers",
        name: "تشيز لافرز",
        desc: "خلطة الأجبان اللذيذة مع صلصة البيتزا الساخنة والموزاريلا",
        price: 35,
        image: pizzaImg,
      },
      {
        id: "pizza-veggie",
        name: "فيجي (خضار)",
        desc: "مزيج من الفلفل الأخضر والزيتون الأسود وشرائح البصل والفطر مع صلصة البيتزا والموزاريلا",
        price: 25,
        image: pizzaImg,
      },
      {
        id: "pizza-ranch-chicken",
        name: "رانش تشيكن",
        desc: "دجاج مشوي مع صوص الرانش الممزوج بجبنة الموزاريلا",
        price: 35,
        image: pizzaImg,
        tag: "الأكثر طلباً",
      },
      {
        id: "pizza-labneh-honey",
        name: "لبنة بالعسل",
        desc: "لبنة طازجة مغطاة بالعسل مع جبنة الموزاريلا",
        price: 25,
        image: pizzaImg,
      },
      {
        id: "pizza-labneh-thyme",
        name: "لبنة وزعتر",
        desc: "مزيج من اللبنة الطازجة والزعتر",
        price: 25,
        image: pizzaImg,
      },
      {
        id: "pizza-liquid-fajita",
        name: "فاهيتا بالجبن السائل",
        desc: "قطع دجاج الفاهيتا بالتتبيلة المكسيكية مع الزيتون الأسود والفلفل الأخضر والجبن السائل والموزاريلا",
        price: 35,
        image: pizzaImg,
      },
      {
        id: "pizza-buffalo",
        name: "بافلو تشيكن",
        desc: "قطع دجاج البافلو المتبل مع شرائح البصل والفلفل الأخضر والزيتون الأسود والموزاريلا",
        price: 35,
        image: pizzaImg,
      },
      {
        id: "pizza-margherita",
        name: "مارغريتا",
        desc: "مزيج من التوابل الإيطالية الفاخرة مع جبن الموزاريلا وصلصة البيتزا الساخنة الخاصة",
        price: 25,
        image: pizzaImg,
      },
      {
        id: "pizza-super-supreme",
        name: "سوبر سوبريم",
        desc: "شرائح البيبروني مع الفلفل والخضروات الطازجة مع صلصة البيتزا الساخنة الخاصة والموزاريلا",
        price: 35,
        image: pizzaImg,
      },
      {
        id: "pizza-bbq",
        name: "بي بي كيو تشيكن",
        desc: "قطع صدور الدجاج المشوية مع شرائح البصل وخليط صوص الباربيكيو مع الجبن السائل والموزاريلا",
        price: 35,
        image: pizzaImg,
      },
      {
        id: "pizza-liquid-cheese",
        name: "جبن سائل",
        desc: "مزيج من الجبن الفرنسي السائل مع الموزاريلا",
        price: 25,
        image: pizzaImg,
      },
      {
        id: "pizza-super-ranch",
        name: "سوبر رانش",
        desc: "قطع الدجاج المتبلة مع صوص الرانش الخاص على طبقة من صلصة الجبن السائل مغطاة بالموزاريلا",
        price: 35,
        image: pizzaImg,
      },
      {
        id: "pizza-sausage",
        name: "سوسيج",
        desc: "شرائح البيبروني مع الفلفل والخضروات الطازجة والفطر والزيتون الأسود مع صلصة البيتزا والموزاريلا",
        price: 25,
        image: pizzaImg,
      },
    ],
  },
  {
    id: "pasta",
    label: "الباستا",
    items: [
      {
        id: "pasta-alfredo",
        name: "فيتوتشيني ألفريدو",
        desc: "باستا فيتوتشيني مع صلصة الألفريدو البيضاء وقطع الدجاج بالتتبيلة المكسيكية والفلفل الرومي الملون",
        price: 28,
        image: pastaWhiteImg,
        tag: "الأكثر طلباً",
      },
      {
        id: "pasta-classic-fettuccine",
        name: "فيتوتشيني كلاسيك",
        desc: "باستا فيتوتشيني محضرة بالصوص الأبيض الكلاسيكي",
        price: 28,
        image: pastaWhiteImg,
      },
      {
        id: "pasta-cajun",
        name: "باستا كيجن",
        desc: "باستا ببهارات الكيجن مع الفلفل الرومي الملون وجبنة البارميزان",
        price: 28,
        image: pastaRedImg,
      },
      {
        id: "pasta-pesto",
        name: "مليانو بيستو",
        desc: "باستا محضرة بصلصة البيستو (الريحان) الخاصة بنا",
        price: 28,
        image: pastaWhiteImg,
        tag: "وصفة مليانو",
      },
      {
        id: "pasta-special",
        name: "سبيشل باستا",
        desc: "باستا مليانو الخاصة",
        price: 28,
        image: pastaRedImg,
      },
      {
        id: "pasta-pepperoni",
        name: "بيبروني باستا",
        desc: "باستا غنية بصلصة الطماطم وشرائح البيبروني وجبنة الموزاريلا",
        price: 28,
        image: pastaRedImg,
      },
      {
        id: "pasta-classic",
        name: "كلاسيك باستا",
        desc: "باستا كلاسيكية مع الفلفل الرومي الملون وجبنة الموزاريلا",
        price: 28,
        image: pastaRedImg,
      },
      {
        id: "pasta-pesto-fettuccine",
        name: "بيستو فيتوتشيني",
        desc: "مكرونة فيتوتشيني بصلصة الريحان الطازجة",
        price: 28,
        image: pastaWhiteImg,
      },
      {
        id: "pasta-arrabiata",
        name: "فيتوتشيني أرابياتا",
        desc: "باستا فيتوتشيني بصلصة الطماطم الحارة (أرابياتا)",
        price: 28,
        image: pastaRedImg,
      },
      {
        id: "pasta-chicken-red",
        name: "باستا الدجاج بالصلصة الحمراء",
        desc: "باستا بصلصة الطماطم الحمراء مع قطع الدجاج المشوي",
        price: 28,
        image: pastaRedImg,
      },
    ],
  },
  {
    id: "sides",
    label: "الأطباق الجانبية",
    items: [
      {
        id: "salad-milano",
        name: "سلطة مليانو",
        desc: "تشكيلة من الخضار الطازجة بصلصتنا الخاصة",
        price: 12,
        image: saladImg,
      },
      {
        id: "salad-mexican",
        name: "سلطة مليانو المكسيكية",
        desc: "خس وقطع الخبز المحمص",
        price: 12,
        image: saladImg,
      },
      {
        id: "fries-wedges",
        name: "بطاطس ويدجز",
        desc: "فرايز ويدجز مقلية مقرمشة",
        price: 12,
        image: friesImg,
      },
      {
        id: "fries-french",
        name: "بطاطس مقلية",
        desc: "بطاطس أصابع مقلية",
        price: 9,
        image: friesImg,
      },
      {
        id: "wraps-cheese-roll",
        name: "رول الدجاج بالجبن",
        desc: "قطع دجاج مشوية مع فلفل رومي ملون وجبن موزاريلا وصوص خاص",
        price: 14,
        image: wrapsImg,
      },
      {
        id: "kids-meal",
        name: "وجبة الأطفال",
        desc: "وجبة شهية وممتعة للأطفال",
        price: 14,
        image: friesImg,
      },
    ],
  },
];

export const allItems = categories.flatMap((c) => c.items);

// Keep burger image referenced so the build keeps it available
void burgerImg;
