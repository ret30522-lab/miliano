import pizzaImg from "@/assets/products/pizza.jpg";
import pizzaSupreme from "@/assets/products/pizza-supreme.jpg";
import pizzaFajita from "@/assets/products/pizza-fajita.jpg";
import pizzaPesto from "@/assets/products/pizza-pesto.jpg";
import pizzaZaatar from "@/assets/products/pizza-zaatar.jpg";
import pizzaCheese from "@/assets/products/pizza-cheese.jpg";
import pizzaVeggie from "@/assets/products/pizza-veggie.jpg";
import pizzaRanch from "@/assets/products/pizza-ranch.jpg";
import pizzaLabnehHoney from "@/assets/products/pizza-labneh-honey.jpg";
import pizzaLabnehThyme from "@/assets/products/pizza-labneh-thyme.jpg";
import pizzaBuffalo from "@/assets/products/pizza-buffalo.jpg";
import pizzaMargherita from "@/assets/products/pizza-margherita.jpg";
import pizzaBbq from "@/assets/products/pizza-bbq.jpg";
import pizzaLiquidCheese from "@/assets/products/pizza-liquid-cheese.jpg";
import pizzaSausage from "@/assets/products/pizza-sausage.jpg";
import pastaAlfredo from "@/assets/products/pasta-alfredo.jpg";
import pastaPestoImg from "@/assets/products/pasta-pesto.jpg";
import pastaCajun from "@/assets/products/pasta-cajun.jpg";
import pastaPepperoni from "@/assets/products/pasta-pepperoni.jpg";
import pastaArrabiata from "@/assets/products/pasta-arrabiata.jpg";
import kidsMealImg from "@/assets/products/kids-meal.jpg";
import wedgesImg from "@/assets/products/fries-wedges.jpg";
import saladMexican from "@/assets/products/salad-mexican.jpg";
import burgerDouble from "@/assets/products/burger-double.jpg";
import burgerChicken from "@/assets/products/burger-chicken.jpg";

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
        image: pizzaSupreme,
        tag: "الأكثر طلباً",
      },
      {
        id: "pizza-fajita",
        name: "فاهيتا",
        desc: "قطع فاهيتا الدجاج بالتتبيلة المكسيكية مع الفلفل الأخضر والزيتون الأسود والموزاريلا",
        price: 35,
        image: pizzaFajita,
      },
      {
        id: "pizza-pesto-chicken",
        name: "بيستو تشيكن",
        desc: "قطع صدور الدجاج بتتبيلة البهارات الإيطالية وصلصة الريحان الخاصة والموزاريلا",
        price: 35,
        image: pizzaPesto,
        tag: "وصفة مليانو",
      },
      {
        id: "pizza-cheese-zaatar",
        name: "جبنة وزعتر",
        desc: "مزيج الجبنة اللذيذة مع الزعتر والموزاريلا",
        price: 25,
        image: pizzaZaatar,
      },
      {
        id: "pizza-cheese-lovers",
        name: "تشيز لافرز",
        desc: "خلطة الأجبان اللذيذة مع صلصة البيتزا الساخنة والموزاريلا",
        price: 35,
        image: pizzaCheese,
      },
      {
        id: "pizza-veggie",
        name: "فيجي (خضار)",
        desc: "مزيج من الفلفل الأخضر والزيتون الأسود وشرائح البصل والفطر مع صلصة البيتزا والموزاريلا",
        price: 25,
        image: pizzaVeggie,
      },
      {
        id: "pizza-ranch-chicken",
        name: "رانش تشيكن",
        desc: "دجاج مشوي مع صوص الرانش الممزوج بجبنة الموزاريلا",
        price: 35,
        image: pizzaRanch,
        tag: "الأكثر طلباً",
      },
      {
        id: "pizza-labneh-honey",
        name: "لبنة بالعسل",
        desc: "لبنة طازجة مغطاة بالعسل مع جبنة الموزاريلا",
        price: 25,
        image: pizzaLabnehHoney,
      },
      {
        id: "pizza-labneh-thyme",
        name: "لبنة وزعتر",
        desc: "مزيج من اللبنة الطازجة والزعتر",
        price: 25,
        image: pizzaLabnehThyme,
      },
      {
        id: "pizza-liquid-fajita",
        name: "فاهيتا بالجبن السائل",
        desc: "قطع دجاج الفاهيتا بالتتبيلة المكسيكية مع الزيتون الأسود والفلفل الأخضر والجبن السائل والموزاريلا",
        price: 35,
        image: pizzaFajita,
      },
      {
        id: "pizza-buffalo",
        name: "بافلو تشيكن",
        desc: "قطع دجاج البافلو المتبل مع شرائح البصل والفلفل الأخضر والزيتون الأسود والموزاريلا",
        price: 35,
        image: pizzaBuffalo,
      },
      {
        id: "pizza-margherita",
        name: "مارغريتا",
        desc: "مزيج من التوابل الإيطالية الفاخرة مع جبن الموزاريلا وصلصة البيتزا الساخنة الخاصة",
        price: 25,
        image: pizzaMargherita,
      },
      {
        id: "pizza-super-supreme",
        name: "سوبر سوبريم",
        desc: "شرائح البيبروني مع الفلفل والخضروات الطازجة مع صلصة البيتزا الساخنة الخاصة والموزاريلا",
        price: 35,
        image: pizzaSupreme,
      },
      {
        id: "pizza-bbq",
        name: "بي بي كيو تشيكن",
        desc: "قطع صدور الدجاج المشوية مع شرائح البصل وخليط صوص الباربيكيو مع الجبن السائل والموزاريلا",
        price: 35,
        image: pizzaBbq,
      },
      {
        id: "pizza-liquid-cheese",
        name: "جبن سائل",
        desc: "مزيج من الجبن الفرنسي السائل مع الموزاريلا",
        price: 25,
        image: pizzaLiquidCheese,
      },
      {
        id: "pizza-super-ranch",
        name: "سوبر رانش",
        desc: "قطع الدجاج المتبلة مع صوص الرانش الخاص على طبقة من صلصة الجبن السائل مغطاة بالموزاريلا",
        price: 35,
        image: pizzaRanch,
      },
      {
        id: "pizza-sausage",
        name: "سوسيج",
        desc: "شرائح البيبروني مع الفلفل والخضروات الطازجة والفطر والزيتون الأسود مع صلصة البيتزا والموزاريلا",
        price: 25,
        image: pizzaSausage,
      },
    ],
  },
  {
    id: "burger",
    label: "البرجر",
    items: [
      {
        id: "burger-classic",
        name: "برجر كلاسيك",
        desc: "لحم مشوي طازج مع الجبنة والخس والطماطم وصوصنا الخاص",
        price: 22,
        image: burgerImg,
      },
      {
        id: "burger-cheese",
        name: "تشيز برجر",
        desc: "لحم مشوي مع طبقة إضافية من الجبنة الذائبة",
        price: 25,
        image: burgerImg,
        tag: "الأكثر طلباً",
      },
      {
        id: "burger-double",
        name: "دبل برجر",
        desc: "قطعتان لحم مشوي مع الجبنة والخضار الطازجة",
        price: 32,
        image: burgerDouble,
      },
      {
        id: "burger-chicken",
        name: "تشيكن برجر",
        desc: "دجاج مقرمش مع الخس والمايونيز الخاص",
        price: 20,
        image: burgerChicken,
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
        image: pastaAlfredo,
        tag: "الأكثر طلباً",
      },
      {
        id: "pasta-classic-fettuccine",
        name: "فيتوتشيني كلاسيك",
        desc: "باستا فيتوتشيني محضرة بالصوص الأبيض الكلاسيكي",
        price: 28,
        image: pastaAlfredo,
      },
      {
        id: "pasta-cajun",
        name: "باستا كيجن",
        desc: "باستا ببهارات الكيجن مع الفلفل الرومي الملون وجبنة البارميزان",
        price: 28,
        image: pastaCajun,
      },
      {
        id: "pasta-pesto",
        name: "مليانو بيستو",
        desc: "باستا محضرة بصلصة البيستو (الريحان) الخاصة بنا",
        price: 28,
        image: pastaPestoImg,
        tag: "وصفة مليانو",
      },
      {
        id: "pasta-special",
        name: "سبيشل باستا",
        desc: "باستا مليانو الخاصة",
        price: 28,
        image: pastaArrabiata,
      },
      {
        id: "pasta-pepperoni",
        name: "بيبروني باستا",
        desc: "باستا غنية بصلصة الطماطم وشرائح البيبروني وجبنة الموزاريلا",
        price: 28,
        image: pastaPepperoni,
      },
      {
        id: "pasta-classic",
        name: "كلاسيك باستا",
        desc: "باستا كلاسيكية مع الفلفل الرومي الملون وجبنة الموزاريلا",
        price: 28,
        image: pastaCajun,
      },
      {
        id: "pasta-pesto-fettuccine",
        name: "بيستو فيتوتشيني",
        desc: "مكرونة فيتوتشيني بصلصة الريحان الطازجة",
        price: 28,
        image: pastaPestoImg,
      },
      {
        id: "pasta-arrabiata",
        name: "فيتوتشيني أرابياتا",
        desc: "باستا فيتوتشيني بصلصة الطماطم الحارة (أرابياتا)",
        price: 28,
        image: pastaArrabiata,
      },
      {
        id: "pasta-chicken-red",
        name: "باستا الدجاج بالصلصة الحمراء",
        desc: "باستا بصلصة الطماطم الحمراء مع قطع الدجاج المشوي",
        price: 28,
        image: pastaPepperoni,
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
        image: saladMexican,
      },
      {
        id: "fries-wedges",
        name: "بطاطس ويدجز",
        desc: "فرايز ويدجز مقلية مقرمشة",
        price: 12,
        image: wedgesImg,
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
        image: kidsMealImg,
      },
    ],
  },
];

export const allItems = categories.flatMap((c) => c.items);

