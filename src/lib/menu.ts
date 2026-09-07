import pizzaImg from "@/assets/pizza.jpg";
import burgerImg from "@/assets/burger.jpg.asset.json";
import friesImg from "@/assets/fries.jpg.asset.json";
import pastaRedImg from "@/assets/pasta-red.jpg.asset.json";
import pastaWhiteImg from "@/assets/pasta-white.jpg.asset.json";
import saladImg from "@/assets/salad.jpg.asset.json";
import wrapsImg from "@/assets/wraps.jpg.asset.json";

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
        id: "pizza-pepperoni",
        name: "بيتزا بيبروني",
        desc: "صلصة طماطم إيطالية، موزاريلا ذائبة، شرائح بيبروني",
        price: 32,
        image: pizzaImg,
        tag: "الأكثر طلباً",
      },
      {
        id: "pizza-margherita",
        name: "بيتزا مارغريتا",
        desc: "موزاريلا طازجة، ريحان، صلصة طماطم على عجينة مخبوزة بالحطب",
        price: 28,
        image: pizzaImg,
      },
      {
        id: "pizza-ranch",
        name: "بيتزا الرانش بالدجاج",
        desc: "دجاج مقرمش، صوص رانش خاص، جبنة موزاريلا — الأشهر عندنا",
        price: 35,
        image: pizzaImg,
        tag: "وصفة مليانو",
      },
    ],
  },
  {
    id: "burger",
    label: "البرجر",
    items: [
      {
        id: "burger-crispy",
        name: "مليانو كرسبي برجر",
        desc: "دجاجة مقرمشة، جبنة ذائبة، خس طازج، صوصنا الخاص",
        price: 24,
        image: burgerImg.url,
        tag: "الأكثر طلباً",
      },
    ],
  },
  {
    id: "pasta",
    label: "الباستا",
    items: [
      {
        id: "pasta-red",
        name: "بيني بالصلصة الحمراء",
        desc: "صلصة طماطم غنية، بارميزان، ريحان طازج",
        price: 26,
        image: pastaRedImg.url,
      },
      {
        id: "pasta-white",
        name: "ألفريدو كريمي",
        desc: "سباغيتي بصوص كريمي ناعم وأوراق ريحان",
        price: 27,
        image: pastaWhiteImg.url,
      },
    ],
  },
  {
    id: "sides",
    label: "الأطباق الجانبية",
    items: [
      {
        id: "fries-loaded",
        name: "بطاطس محشوة بالجبن",
        desc: "بطاطس مقرمشة مغطاة بالدجاج وصوص الجبن الذائب",
        price: 18,
        image: friesImg.url,
        tag: "وصفة مليانو",
      },
      {
        id: "salad-fresh",
        name: "سلطة مليانو",
        desc: "خس طازج، جبنة فيتا، طماطم كرزية، بصل مخلل",
        price: 16,
        image: saladImg.url,
      },
      {
        id: "wraps",
        name: "رولات الدجاج المشوية",
        desc: "خبز تورتيلا محمص محشو بالدجاج والخضار",
        price: 20,
        image: wrapsImg.url,
      },
    ],
  },
];

export const allItems = categories.flatMap((c) => c.items);
