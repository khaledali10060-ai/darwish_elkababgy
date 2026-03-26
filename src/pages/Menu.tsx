import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { MessageCircle, ShoppingCart, X, Plus, Minus, ExternalLink, Bike, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../context/CartContext";

const deliveryPlatforms = [
  { 
    name: "Talabat", 
    arName: "طلبات", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Talabat_logo.svg/2560px-Talabat_logo.svg.png",
    color: "bg-[#FF5A00]",
    link: "https://www.talabat.com/egypt"
  }
];

const categories = [
  { id: "grill", name: "المشويات الفاخرة", en: "The Grill" },
  { id: "tajines", name: "الطواجن والأورمة", en: "Heritage Tajines" },
  { id: "fatta", name: "الفتة", en: "Egyptian Fatta" },
  { id: "appetizers", name: "المقبلات والسلاطات", en: "Appetizers & Salads" },
  { id: "meals", name: "الوجبات والسندوتشات", en: "Quick Meals" },
  { id: "beverages", name: "المشروبات", en: "Beverages" },
];

type MenuItem = {
  name: string;
  description?: string;
  image?: string;
  price?: number | string;
  prices?: {
    [key: string]: number;
  };
};

const menuData: Record<string, MenuItem[]> = {
  grill: [
    { name: "كباب وكفتة ضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "تشكيلة مميزة من الكباب والكفتة الضاني المشوية على الفحم", prices: { "كيلو": 655, "نص كيلو": 493, "ربع كيلو": 332 } },
    { name: "كباب وكفتة بتلو", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "لحم بتلو طازج مشوي بتتبيلة درويش الخاصة", prices: { "كيلو": 680, "نص كيلو": 513, "ربع كيلو": 350 } },
    { name: "ريش ضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "ريش ضاني مختارة بعناية ومشوية لدرجة الكمال", prices: { "كيلو": 770, "نص كيلو": 580, "ربع كيلو": 395 } },
    { name: "ريش بتلو", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "ريش بتلو طرية وغنية بالعصارة", prices: { "كيلو": 780, "نص كيلو": 580, "ربع كيلو": 395 } },
    { name: "ريش بيت كلاوي", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "قطع مميزة من ريش بيت الكلاوي", prices: { "كيلو": 770, "نص كيلو": 580, "ربع كيلو": 395 } },
    { name: "كباب ضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "قطع كباب ضاني صافي مشوية على الفحم", prices: { "كيلو": 710, "نص كيلو": 535, "ربع كيلو": 357 } },
    { name: "كباب بتلو", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "قطع كباب بتلو صافي تذوب في الفم", prices: { "كيلو": 750, "نص كيلو": 565, "ربع كيلو": 377 } },
    { name: "فلتو ضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "عرق فلتو ضاني مشوي بتتبيلة الأعشاب", prices: { "كيلو": 770, "نص كيلو": 580, "ربع كيلو": 387 } },
    { name: "كفتة ضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "كفتة ضاني مفرومة مع التوابل الشرقية", prices: { "كيلو": 625, "نص كيلو": 471, "ربع كيلو": 315 } },
    { name: "طرب ضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "كفتة مغلفة بمنديل الطرب المشوي", prices: { "كيلو": 650, "نص كيلو": 491, "ربع كيلو": 327 } },
    { name: "كفتة كندوز", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "كفتة لحم كندوز بلدي مشوية", prices: { "كيلو": 545, "نص كيلو": 411, "ربع كيلو": 275 } },
    { name: "طرب كندوز", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طرب محشو بكفتة الكندوز المتبلة", prices: { "كيلو": 575, "نص كيلو": 433, "ربع كيلو": 290 } },
    { name: "نيفة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "لحم الماعز المشوي على الطريقة التقليدية", prices: { "كيلو": 680, "نص كيلو": 513, "ربع كيلو": 350 } },
    { name: "سجق ضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "سجق بلدي مشوي على الفحم", prices: { "كيلو": 610, "نص كيلو": 460, "ربع كيلو": 308 } },
    { name: "كبد وكلاوي", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "تشكيلة من الكبدة والكلاوي المشوية", prices: { "كيلو": 570, "نص كيلو": 430, "ربع كيلو": 290 } },
    { name: "مخاصي", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "مخاصي مشوية بتتبيلة درويش", prices: { "كيلو": 520, "نص كيلو": 392, "ربع كيلو": 260 } },
    { name: "شيش طاووق", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "قطع الدجاج المتبلة والمشوية مع الخضروات", prices: { "كيلو": 350, "نص كيلو": 266, "ربع كيلو": 180 } },
    { name: "كباب دجاج", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "كفتة دجاج مشوية خفيفة ولذيذة", prices: { "كيلو": 350, "نص كيلو": 266, "ربع كيلو": 180 } },
    { name: "نصف فرخة مشوية", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "نصف دجاجة مشوية على الفحم", price: 245 },
    { name: "نصف فرخة مشوية قطع", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "نصف دجاجة مقطعة ومشوية", price: 250 },
    { name: "صدور بانية", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "صدور دجاج مقلية ومقرمشة", prices: { "كيلو": 365, "نص كيلو": 277, "ربع كيلو": 188 } },
    { name: "ورقة لحمة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "لحم مطهو بالفرن مع الخضروات والتوابل", price: 375 },
    { name: "ورقة سجق", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "سجق بلدي مطهو بالفرن مع الخضروات", price: 335 },
    { name: "ورقة كبدة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "كبدة إسكندراني مطهوة في الفرن", price: 335 },
    { name: "ورقة موزة ضاني مخلية بالخضار", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "موزة ضاني مخلية مطهوة ببطء مع الخضار", price: 615 },
    { name: "سجق جريل", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "سجق مشوي على الجريل", price: 330 },
    { name: "كبده وكلاوي جريل", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "كبدة وكلاوي مشوية على الجريل", price: 335 },
    { name: "مخاصي جريل", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "مخاصي مشوية على الجريل", price: 310 },
    { name: "طاسة الأكيل (كبدة وسجق ومخاصي)", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "تشكيلة الأكيل المميزة في طاسة ساخنة", price: 375 },
  ],
  tajines: [
    { name: "أورمة أوزي ضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن لحم الأوزي المطهو ببطء مع البصل", price: 640 },
    { name: "أورمة ضلع ضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن ضلوع ضاني مع البصل المكرمل", price: 615 },
    { name: "أورمة موزة ضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "موزة ضاني مطهوة في طاجن فخار", price: 635 },
    { name: "أورمة رقبة ضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن رقبة ضاني غني بالنكهات", price: 620 },
    { name: "أورمة هبرة ضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن لحم هبرة ضاني صافي", price: 620 },
    { name: "بامية باللحمة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن بامية تقليدي مع قطع اللحم", price: 335 },
    { name: "ورق عنب كوارع", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن ورق عنب محشو ومطهو مع الكوارع", price: 410 },
    { name: "عكاوي بالبصل", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن عكاوي مطهو ببطء مع البصل", price: 470 },
    { name: "لحمة بالبصل", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن لحم كباب حلة بالبصل", price: 375 },
    { name: "ملوخية", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن ملوخية مصرية أصيلة بالطشة", price: 110 },
    { name: "بطاطس باللحمة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن بطاطس في الفرن مع اللحم", price: 325 },
    { name: "ورق عنب باللحمة البتلو", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن ورق عنب مع شرائح اللحم البتلو", price: 395 },
    { name: "مسقعة باللحمة المفرومة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن مسقعة بلدي باللحم المفروم", price: 230 },
    { name: "ترويقة ضاني بالبصل", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن لحم ضاني مميز بالبصل", price: 445 },
    { name: "مكرونة بشاميل", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن مكرونة بالبشاميل واللحم المفروم", price: 175 },
    { name: "أرز معمر بالحمام", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن أرز معمر فلاحي محشو بالحمام", price: 335 },
    { name: "أرز معمر باللحمة البتلو", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن أرز معمر فلاحي بقطع اللحم البتلو", price: 410 },
    { name: "طاجن تورلي باللحمة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن خضروات مشكلة مع اللحم", price: 330 },
    { name: "طاجن درويش (كوارع - عكاوي - مخاصي)", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "طاجن درويش الخاص والمميز", price: 475 },
    { name: "حمام محشي أرز", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "حمام بلدي محشو بخلطة الأرز المميزة", price: 225 },
    { name: "نصف فراخ بلدي محمرة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "نصف دجاجة بلدي محمرة بالسمن", price: 300 },
    { name: "نصف بط بالمرتة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "نصف بطة محشوة بالمرتة الدمياطي", price: 400 },
    { name: "لحمة محمرة بالسمنه الفلاحي", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "قطع لحم محمرة بالسمن البلدي", price: 380 },
    { name: "كبده محمرة بالسمنه الفلاحي", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "كبدة محمرة بالسمن البلدي", price: 335 },
    { name: "سجق محمر بالسمنه الفلاحي", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "سجق محمر بالسمن البلدي", price: 335 },
  ],
  fatta: [
    { name: "فتة كوارع", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "فتة مصرية أصيلة مع قطع الكوارع المخلية", price: 480 },
    { name: "فتة باللحمة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "فتة بالخل والثوم مع قطع اللحم المحمرة", price: 405 },
    { name: "فتة بالموزة الضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "فتة مميزة مع الموزة الضاني", price: 630 },
    { name: "فتة موزة ضاني مخلية", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "فتة مع لحم الموزة الضاني المخلية", price: 630 },
    { name: "فتة موزة بتلو", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "فتة مع الموزة البتلو الطرية", price: 500 },
    { name: "فتة أوزي ضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "فتة مع لحم الأوزي الضاني", price: 580 },
    { name: "فتة رقبة ضاني", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "فتة مع لحم الرقبة الضاني", price: 555 },
    { name: "فتة سادة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "فتة مصرية بالخل والثوم وصلصة الطماطم", price: 110 },
  ],
  appetizers: [
    { name: "شوربة لسان عصفور", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 72 },
    { name: "شوربة كوارع", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 190 },
    { name: "شوربة حمام بالفريك", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 117 },
    { name: "شوربة درويش (كوارع وعكاوي)", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 199 },
    { name: "شوربة فراخ بالكريمة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 97 },
    { name: "طحينة / زبادي", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 49 },
    { name: "بابا غنوج / سلطة خضراء", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 53 },
    { name: "ثومية", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 58 },
    { name: "خيار مخلل", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 43 },
    { name: "بطاطس متبلة / طماطم متبلة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 48 },
    { name: "باذنجان متبل", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 51 },
    { name: "بنجر", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 65 },
    { name: "طرشي", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 35 },
    { name: "ورق عنب", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 115 },
    { name: "ممبار", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 115 },
    { name: "رقاق باللحمة المفرومة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 185 },
    { name: "سمبوسك جبنة (٤ قطع)", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 112 },
    { name: "كبيبة (٤ قطع)", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 120 },
    { name: "دولمة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 133 },
    { name: "حلة محشي كرنب (تكفي فردين)", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 133 },
    { name: "سجق دبس رمان", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 310 },
    { name: "مقبلات درويش (ممبار - ورق عنب - محشي مشكل - كبيبة - سمبوسك جبنة - بطاطس محمرة)", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 288 },
    { name: "محاشي مشكل (ممبار - ورق عنب - دولمة)", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 210 },
    { name: "مقبلات مشكل (٤ قطع كبيبة - ٤ قطع سمبوسك جبنة - بطاطس محمرة)", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 222 },
    { name: "بطاطس محمرة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 80 },
    { name: "خضار سوتيه", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 90 },
  ],
  meals: [
    { name: "درويش مكس درويش", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "كباب - كفتة - كباب فراخ - حمام مشوي", price: 545 },
    { name: "مكس جريل", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "كباب - كفتة - شيش طاووق - رقاق", price: 500 },
    { name: "مشاوي فراخ", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "كباب فراخ - شيش طاووق - ربع فرخة شيش", price: 350 },
    { name: "مشاوي لحوم", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", description: "كفتة - سجق - كبدة - مخاصي", price: 420 },
    { name: "كباب فراخ", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 300 },
    { name: "حمام مشوي و كفتة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 330 },
    { name: "حمام مشوي (عدد ٢)", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 350 },
    { name: "فراخ بانية", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 285 },
    { name: "وجبة فراخ وكفتة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 260 },
    { name: "وجبة نصف فرخة مشوية", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 260 },
    { name: "وجبة نصف فرخة مشوية قطع", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 260 },
    { name: "وجبة كفتة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 225 },
    { name: "وجبة ربع فرخة وراك", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 150 },
    { name: "وجبة ربع فرخة صدور", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 165 },
    { name: "وجبة شيش طاووق", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 235 },
    { name: "وجبة شيش طاووق وكفتة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 260 },
    { name: "ساندوتش كباب", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 175 },
    { name: "ساندوتش كفتة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 130 },
    { name: "ساندوتش طرب", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 160 },
    { name: "حواوشي", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 135 },
    { name: "ساندوتش سجق", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 120 },
    { name: "ساندوتش شيش طاووق", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 115 },
    { name: "أرز أبيض", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 70 },
    { name: "أرز بالشعرية", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 78 },
    { name: "أرز بني بسمتي", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 88 },
    { name: "أرز بني بسمتي مكسرات", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 112 },
    { name: "اسباجتي بصوص الطماطم", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 115 },
    { name: "اسباجتي باللحمة المفرومة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 170 },
  ],
  beverages: [
    { name: "كوكاكولا", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 35 },
    { name: "سبرايت", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 35 },
    { name: "شويبس", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 35 },
    { name: "بيريل", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 45 },
    { name: "مياة معدنية صغيرة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 23 },
    { name: "مياة معدنية كبيرة", image: "https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg", price: 40 },
  ],
};

export default function Menu() {
  const [activeSection, setActiveSection] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  
  // Cart Context
  const { 
    cart, 
    addToCart, 
    updateQuantity, 
    totalItems, 
    totalPrice, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  const filteredMenuData = Object.entries(menuData).reduce((acc, [category, items]) => {
    const categoryName = categories.find(c => c.id === category)?.name || "";
    
    const filteredItems = items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filteredItems.length > 0) {
      acc[category] = filteredItems;
    }
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const filteredCategories = categories.filter(category => 
    filteredMenuData[category.id] && filteredMenuData[category.id].length > 0
  );

  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    phone: "",
    address: "",
    branch: "التجمع الخامس"
  });

  const branches = [
    "التجمع الخامس",
    "العبور",
    "الشروق",
    "مصر الجديدة"
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const category of categories) {
        const element = sectionRefs.current[category.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(category.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      const offset = 140;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const updateCart = (item: MenuItem, weight: string | undefined, price: number, delta: number) => {
    if (delta > 0) {
      addToCart({
        name: item.name,
        weight,
        price,
        quantity: 1
      });
      toast.success(`تم إضافة ${item.name} ${weight ? `(${weight})` : ''} إلى السلة`);
    } else {
      const cartKey = weight ? `${item.name}-${weight}` : item.name;
      updateQuantity(cartKey, delta);
    }
  };

  return (
    <div className="min-h-screen bg-matte-black font-cairo text-white pb-24 bg-islamic-pattern">
      {/* Header - Mobile Only */}
      <div className="pt-24 pb-6 px-4 text-center lg:hidden relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-islamic-green/10 blur-2xl -z-10 rounded-full" />
        <h1 className="text-4xl md:text-5xl font-amiri font-bold text-islamic-green mb-2 text-glow-white">قائمة الطعام</h1>
        <p className="text-islamic-green/80 text-lg font-light tracking-wide font-amiri">Darwish El Kababgy Menu</p>
      </div>

      {/* Mobile Sticky Navigation (Horizontal Scroll) */}
      <div className="lg:hidden sticky top-[60px] md:top-[72px] z-40 bg-matte-black/90 backdrop-blur-md border-b border-white/5 shadow-sm">
        <div className="flex overflow-x-auto hide-scrollbar py-4 px-4 gap-3 snap-x">
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToSection(category.id)}
              className={`flex-shrink-0 snap-center px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeSection === category.id
                  ? "bg-islamic-green text-white glow-green"
                  : "bg-[#151515] text-white/70 border border-white/5"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Desktop Sidebar (Right Side due to RTL) */}
        <div className="hidden lg:block w-1/3 xl:w-1/4 shrink-0 border-l border-white/5 bg-matte-black">
          <div className="sticky top-[88px] h-[calc(100vh-88px)] overflow-y-auto p-8 xl:p-12 flex flex-col gap-2 hide-scrollbar">
            <div className="mb-12">
              <h1 className="text-5xl font-amiri font-bold text-islamic-green mb-2 text-glow-white">قائمة الطعام</h1>
              <p className="text-islamic-green/80 text-xl font-light tracking-wide font-amiri">Darwish El Kababgy</p>
            </div>
            
            <h3 className="font-amiri text-2xl text-white mb-4 px-4 border-b border-white/5 pb-4">الأقسام</h3>
            {filteredCategories.map(category => (
              <button
                key={category.id}
                onClick={() => scrollToSection(category.id)}
                className={`text-right px-6 py-4 rounded-2xl transition-all font-bold text-xl ${
                  activeSection === category.id 
                    ? 'bg-islamic-green text-white shadow-lg glow-green' 
                    : 'text-white/60 hover:bg-white/5 hover:text-islamic-green'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content (Left Side due to RTL) */}
        <div className="w-full lg:w-2/3 xl:w-3/4 p-4 md:p-8 lg:p-12 xl:p-16 space-y-24">
          
          {/* Search Bar */}
          <div className="mb-12 relative">
            <input
              type="text"
              placeholder="ابحث عن صنف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pr-12 rounded-full bg-[#151515] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-islamic-green transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Delivery Platforms Section */}
          <section data-aos="fade-down" className="mb-16">
            <div className="flex flex-col items-center justify-center text-center gap-4">
              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl font-amiri font-bold text-islamic-green">
                  اطلب الآن أونلاين
                </h2>
                <p className="text-white/50 text-xs md:text-sm font-cairo">
                  استمتع بمشويات درويش الكبابجي في منزلك عبر منصة طلبات
                </p>
              </div>
              
              <div className="flex justify-center">
                {deliveryPlatforms.map((platform) => (
                  <motion.a
                    key={platform.name}
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex flex-row items-center justify-center gap-3 px-10 py-3 rounded-lg ${platform.color} shadow-lg transition-all group`}
                  >
                    <img 
                      src={platform.logo} 
                      alt={platform.name} 
                      className="h-5 object-contain brightness-0 invert opacity-90 group-hover:opacity-100"
                    />
                    <div className="w-px h-5 bg-white/20" />
                    <span className="text-white font-bold font-cairo text-base flex items-center gap-2">
                      اطلب من {platform.arName}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>

          {filteredCategories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              ref={(el) => (sectionRefs.current[category.id] = el)}
              className="scroll-mt-40"
            >
              <div className="mb-10 flex flex-col items-start border-b border-white/5 pb-4">
                <h2 className="text-3xl md:text-4xl font-amiri font-bold text-islamic-green mb-1 text-glow-white">{category.name}</h2>
                <p className="text-white/40 text-sm uppercase tracking-widest font-amiri">{category.en}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredMenuData[category.id].map((item, idx) => {
                  const hasWeights = !!item.prices;
                  const singleQty = !hasWeights ? (cart[item.name]?.quantity || 0) : 0;

                  return (
                    <div
                      key={idx}
                      data-aos="fade-up"
                      data-aos-delay={(idx % 10) * 50}
                      className="group bg-[#151515] border border-white/5 rounded-3xl overflow-hidden hover:-translate-y-1 hover:border-islamic-green/30 hover:glow-green transition-all duration-300 flex flex-col p-4 gap-4 shadow-sm"
                    >
                      {/* Top: Image and Text */}
                      <div className="flex flex-row-reverse gap-4">
                        {/* Image - Left Side (RTL) */}
                        <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-2xl overflow-hidden bg-matte-black border border-white/5 group-hover:border-islamic-green/30 transition-colors">
                          <img 
                            src={item.image || `https://picsum.photos/seed/food,${encodeURIComponent(item.name)}/400/400`} 
                            alt={item.name}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                          />
                          {/* Logo Overlay */}
                          <div className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/20 z-20 shadow-lg">
                            <img 
                              src="https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg" 
                              alt="Logo" 
                              className="w-full h-full object-contain rounded-full"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-matte-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Content - Right Side */}
                        <div className="flex flex-col flex-grow py-1 text-right">
                          <h3 className="text-lg sm:text-xl font-bold text-islamic-green leading-snug font-amiri">{item.name}</h3>
                          {item.description && (
                            <p className="text-xs sm:text-sm text-white/60 mt-2 line-clamp-2 leading-relaxed font-cairo">{item.description}</p>
                          )}
                          
                          {/* Single Price (if no weights) */}
                          {!hasWeights && (
                            <div className="mt-auto pt-2 flex items-end justify-between flex-row-reverse">
                              <span className="text-xl sm:text-2xl font-bold text-white font-amiri">{item.price} <span className="text-xs text-white/40 font-normal">- ج.م</span></span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bottom: Weights or Add Button */}
                      {hasWeights ? (
                        <div className="flex flex-col gap-2 mt-1">
                          {Object.entries(item.prices!).map(([weight, price]) => {
                            const cartKey = `${item.name}-${weight}`;
                            const qty = cart[cartKey]?.quantity || 0;
                            return (
                              <div 
                                key={weight} 
                                className={`flex flex-row-reverse items-center justify-between rounded-xl p-3 border transition-all duration-300 w-full ${
                                  qty > 0 
                                    ? "bg-islamic-green/10 border-islamic-green/40 shadow-[0_0_15px_rgba(15,143,61,0.1)]" 
                                    : "bg-matte-black/50 border-white/5 hover:bg-matte-black"
                                }`}
                              >
                                <span className={`text-xs sm:text-sm font-bold min-w-[60px] text-right font-cairo ${qty > 0 ? "text-islamic-green" : "text-white/80"}`}>{weight}</span>
                                <span className="text-islamic-green font-bold text-base text-center flex-1 font-amiri">{price} ج.م</span>
                                
                                <div className="min-w-[100px]">
                                  {qty > 0 ? (
                                    <div className="flex items-center gap-2 bg-[#151515] rounded-lg p-1 border border-white/10 shadow-sm w-full justify-center">
                                      <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateCart(item, weight, price, -1)} className="w-6 h-6 flex items-center justify-center bg-matte-black rounded-md text-white hover:text-islamic-green transition-colors"><Minus className="w-3 h-3" /></motion.button>
                                      <motion.span key={qty} initial={{ scale: 1.5, color: "#0f8f3d" }} animate={{ scale: 1, color: "#ffffff" }} className="text-sm font-bold w-5 text-center font-cairo">{qty}</motion.span>
                                      <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateCart(item, weight, price, 1)} className="w-6 h-6 flex items-center justify-center bg-islamic-green text-white rounded-md transition-colors"><Plus className="w-3 h-3" /></motion.button>
                                    </div>
                                  ) : (
                                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => updateCart(item, weight, price, 1)} className="text-xs sm:text-sm font-bold bg-islamic-green hover:glow-green text-white px-5 py-2 rounded-xl transition-all w-full font-cairo">
                                      أضف
                                    </motion.button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex justify-start mt-1">
                          {singleQty > 0 ? (
                            <div className="flex items-center gap-3 bg-[#151515] rounded-xl p-1.5 border border-white/10 shadow-sm">
                              <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateCart(item, undefined, item.price as number, -1)} className="w-8 h-8 flex items-center justify-center bg-matte-black rounded-lg text-white hover:text-islamic-green transition-colors"><Minus className="w-4 h-4" /></motion.button>
                              <motion.span key={singleQty} initial={{ scale: 1.5, color: "#0f8f3d" }} animate={{ scale: 1, color: "#ffffff" }} className="text-base font-bold w-6 text-center font-cairo">{singleQty}</motion.span>
                              <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateCart(item, undefined, item.price as number, 1)} className="w-8 h-8 flex items-center justify-center bg-islamic-green text-white rounded-lg transition-colors"><Plus className="w-4 h-4" /></motion.button>
                            </div>
                          ) : (
                            <motion.button whileTap={{ scale: 0.95 }} onClick={() => updateCart(item, undefined, item.price as number, 1)} className="bg-islamic-green hover:glow-green text-white text-xs sm:text-sm font-bold px-8 py-2 rounded-xl transition-all shadow-sm font-cairo">
                              أضف
                            </motion.button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
