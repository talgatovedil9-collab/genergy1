import { Product, Order, User, Notification, Promo } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "G-Energy Synthetic 5W-30",
    viscosity: "5W-30",
    type: "engine",
    volume: 4,
    price: 3490,
    image: "/products/synthetic-5w30.png",
    specs: { api: "API SN/CF", acea: "ACEA C3", oem: ["MB 229.51", "VW 504.00/507.00"] },
    stock: 48,
    brand: "G-Energy",
    description: "Полностью синтетическое моторное масло для бензиновых и дизельных двигателей с сажевым фильтром (DPF). Обеспечивает максимальную защиту при увеличенных интервалах замены."
  },
  {
    id: "2",
    name: "G-Energy Expert L 10W-40",
    viscosity: "10W-40",
    type: "engine",
    volume: 4,
    price: 5700,
    image: "/products/expert-l-10w40.png",
    specs: { api: "API SL/CF", acea: "ACEA A3/B4", oem: ["MB 229.1", "VW 501.01/505.00"] },
    stock: 32,
    brand: "G-Energy",
    description: "Полусинтетическое моторное масло для бензиновых и дизельных двигателей без сажевого фильтра. Высокие эксплуатационные характеристики."
  },
  {
    id: "3",
    name: "G-Energy Far East 0W-20",
    viscosity: "0W-20",
    type: "engine",
    volume: 4,
    price: 3990,
    image: "/products/far-east-0w20.png",
    specs: { api: "API SN", acea: "ILSAC GF-5", oem: ["Toyota", "Honda", "Nissan"] },
    stock: 15,
    brand: "G-Energy",
    description: "Полностью синтетическое моторное масло для современных бензиновых двигателей азиатских производителей с системой нейтрализации выхлопных газов."
  },
  {
    id: "4",
    name: "G-Energy F Synth 5W-40",
    viscosity: "5W-40",
    type: "engine",
    volume: 4,
    price: 4200,
    image: "/products/f-synth-5w40.png",
    specs: { api: "API SN/SM/CF", acea: "ACEA A3/B4", oem: ["MB 229.5", "BMW LL-01", "VW 502.00/505.00"] },
    stock: 56,
    brand: "G-Energy",
    description: "Полностью синтетическое моторное масло высшего класса для европейских автомобилей с увеличенным интервалом замены."
  },
  {
    id: "5",
    name: "G-Energy Service Line W 5W-30",
    viscosity: "5W-30",
    type: "engine",
    volume: 4,
    price: 2890,
    image: "/products/service-line-5w30.png",
    specs: { api: "API SN", acea: "ACEA C2", oem: ["PSA B71 2290"] },
    stock: 120,
    brand: "G-Energy",
    description: "Синтетическое моторное масло для сервисного применения. Оптимальное соотношение цена/качество."
  },
  {
    id: "6",
    name: "G-Energy Antifreeze 40",
    viscosity: "—",
    type: "antifreeze",
    volume: 5,
    price: 1250,
    image: "/products/antifreeze-40.png",
    specs: { api: "GOST 28084-89", acea: "—", oem: [] },
    stock: 200,
    brand: "G-Energy",
    description: "Концентрат антифриза на основе этиленгликоля. Защита от замерзания до -40°C."
  },
  {
    id: "7",
    name: "G-Energy Transmission ATF",
    viscosity: "—",
    type: "transmission",
    volume: 4,
    price: 3100,
    image: "/products/transmission-atf.png",
    specs: { api: "Dexron VI", acea: "—", oem: ["Allison TES-295", "ZF TE-ML 14C"] },
    stock: 28,
    brand: "G-Energy",
    description: "Синтетическое трансмиссионное масло для автоматических коробок передач."
  },
  {
    id: "8",
    name: "G-Energy Grease Lithium EP-2",
    viscosity: "—",
    type: "grease",
    volume: 0.4,
    price: 450,
    image: "/products/grease-ep2.png",
    specs: { api: "NLGI 2", acea: "—", oem: [] },
    stock: 350,
    brand: "G-Energy",
    description: "Многоцелевая литиевая смазка с противозадирными свойствами."
  },
  {
    id: "9",
    name: "G-Energy Hydraulic HLP 46",
    viscosity: "46",
    type: "hydraulic",
    volume: 20,
    price: 8900,
    image: "/products/hydraulic-hlp46.png",
    specs: { api: "DIN 51524 Part 2", acea: "—", oem: [] },
    stock: 12,
    brand: "G-Energy",
    description: "Гидравлическое масло для стационарных и мобильных гидросистем."
  },
  {
    id: "10",
    name: "G-Energy Expert L 5W-30",
    viscosity: "5W-30",
    type: "engine",
    volume: 4,
    price: 5200,
    image: "/products/expert-l-5w30.png",
    specs: { api: "API SL/CF", acea: "ACEA A3/B4", oem: ["MB 229.1", "VW 501.01/505.00", "AVTOVAZ"] },
    stock: 64,
    brand: "G-Energy",
    description: "Полусинтетическое моторное масло для бензиновых и дизельных двигателей."
  }
];

export const orders: Order[] = [
  {
    id: "1",
    number: "12345",
    date: "12.05.2024",
    status: "delivered",
    items: [
      { ...products[0], quantity: 2 },
      { ...products[1], quantity: 1 },
      { ...products[5], quantity: 1 }
    ],
    total: 13930,
    bonusEarned: 1390,
    bonusUsed: 0,
    deliveryAddress: "г. Бишкек, ул. Льва Толстого, 123",
    deliveryDate: "15.05.2024",
    comment: ""
  },
  {
    id: "2",
    number: "12344",
    date: "05.05.2024",
    status: "delivered",
    items: [
      { ...products[3], quantity: 2 },
      { ...products[4], quantity: 1 }
    ],
    total: 9150,
    bonusEarned: 915,
    bonusUsed: 500,
    deliveryAddress: "г. Бишкек, ул. Логвиненко, 1",
    deliveryDate: "08.05.2024"
  },
  {
    id: "3",
    number: "12343",
    date: "28.04.2024",
    status: "delivered",
    items: [
      { ...products[0], quantity: 1 },
      { ...products[6], quantity: 1 }
    ],
    total: 7700,
    bonusEarned: 770,
    bonusUsed: 0,
    deliveryAddress: "г. Бишкек, ул. Льва Толстого, 123",
    deliveryDate: "30.04.2024"
  },
  {
    id: "4",
    number: "12342",
    date: "20.04.2024",
    status: "delivered",
    items: [
      { ...products[1], quantity: 1 }
    ],
    total: 5700,
    bonusEarned: 570,
    bonusUsed: 0,
    deliveryAddress: "г. Бишкек, ул. Льва Толстого, 123",
    deliveryDate: "22.04.2024"
  }
];

export const user: User = {
  companyName: "СТО «Форсаж»",
  inn: "7701234567",
  phone: "+996 555 123 456",
  email: "forsage@sto.kg",
  address: "г. Бишкек, ул. Льва Толстого, 123",
  loyaltyTier: "gold",
  bonusBalance: 12560,
  bonusPending: 930,
  totalSpent: 560000,
  tierThreshold: 1000000
};

export const notifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Заказ №12345 отгружен",
    message: "Ваш заказ передан в доставку. Ориентировочная дата: 15.05.2024",
    date: "12.05.2024 16:45",
    read: false
  },
  {
    id: "2",
    type: "bonus",
    title: "Начислены бонусы",
    message: "+1 390 COM за заказ №12345",
    date: "12.05.2024 16:45",
    read: false
  },
  {
    id: "3",
    type: "promo",
    title: "Акция! Скидка 15%",
    message: "На моторные масла G-Energy Synthetic до 31.05.2024",
    date: "10.05.2024 09:00",
    read: true
  },
  {
    id: "4",
    type: "reminder",
    title: "Напоминание о заказе",
    message: "Вы часто заказываете этот товар. Пора пополнить запасы!",
    date: "08.05.2024 14:30",
    read: true
  }
];

export const promos: Promo[] = [
  {
    id: "1",
    title: "Скидка 15% на моторные масла",
    discount: "-15%",
    productId: "1",
    endDate: "31.05.2024",
    image: "/promo/promo1.jpg"
  },
  {
    id: "2",
    title: "Бонус x2 за заказ от 20 000 COM",
    discount: "2x",
    endDate: "15.06.2024",
    image: "/promo/promo2.jpg"
  }
];

export const bonusHistory = [
  { id: "1", type: "credit" as const, amount: 1390, description: "За заказ №12345", date: "12.05.2024" },
  { id: "2", type: "credit" as const, amount: 915, description: "За заказ №12344", date: "05.05.2024" },
  { id: "3", type: "debit" as const, amount: 500, description: "Списание бонусов", date: "03.05.2024" },
  { id: "4", type: "credit" as const, amount: 770, description: "За заказ №12343", date: "28.04.2024" },
  { id: "5", type: "credit" as const, amount: 570, description: "За заказ №12342", date: "20.04.2024" }
];
