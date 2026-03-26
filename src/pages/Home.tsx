import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Star, Moon, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const heroImages = [
    "https://i.postimg.cc/hjX8fnmK/527950796-17962370048956338-8239750356956064453-n.jpg",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1931&auto=format&fit=crop"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleOrder = (itemName: string, price: string) => {
    // Convert Arabic numerals to English for calculation
    const arabicToEnglish = (str: string) => {
      const map: Record<string, string> = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
      return str.replace(/[٠-٩]/g, (d) => map[d]);
    };

    const numericPrice = parseInt(arabicToEnglish(price));

    addToCart({
      name: itemName,
      price: numericPrice,
      quantity: 1
    });

    toast.success(`تم إضافة ${itemName} إلى السلة`);

    // Optionally navigate to menu or show a toast
    // For now, we'll just let the cart open (handled by addToCart)
    // and maybe navigate to menu to show the cart if it's only there
    navigate('/menu');
  };

  return (
    <div className="w-full bg-islamic-pattern">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-88px)] w-full flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-[#0b0b0b]/40 z-10" />
          
          {/* Background Slideshow */}
          <AnimatePresence>
            <motion.img
              key={currentImageIndex}
              src={heroImages[currentImageIndex]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.6, scale: 1.05 }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 2, ease: "easeInOut" },
                scale: { duration: 10, ease: "linear" }
              }}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  currentImageIndex === idx 
                    ? "bg-islamic-green w-8 glow-green" 
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Glowing Coals Effect */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-orange-900/20 to-transparent z-10 pointer-events-none animate-coal-glow" />
          
          {/* Rising Embers */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: `${Math.random() * 100}%`, 
                  y: "110%", 
                  opacity: 0,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  y: "-10%", 
                  opacity: [0, 0.7, 0],
                  x: [`${Math.random() * 100}%`, `${Math.random() * 100 + (Math.random() * 10 - 5)}%`]
                }}
                transition={{ 
                  duration: Math.random() * 8 + 7, 
                  repeat: Infinity, 
                  delay: Math.random() * 10,
                  ease: "linear"
                }}
                className="absolute w-1 h-1 bg-orange-400 rounded-full blur-[1px] shadow-[0_0_10px_#fb923c]"
              />
            ))}
          </div>

          {/* Cinematic Lighting Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial-gradient from-islamic-green/10 to-transparent pointer-events-none z-10" />
        </div>

        <div className="relative z-20 text-center px-4 max-w-5xl mt-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Moon className="w-8 h-8 text-islamic-green fill-islamic-green/20" />
              </motion.div>
              <div className="h-px w-16 bg-islamic-green/40" />
              <Star className="w-6 h-6 text-islamic-green fill-islamic-green" />
              <div className="h-px w-16 bg-islamic-green/40" />
              <motion.div
                animate={{ rotate: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Moon className="w-8 h-8 text-islamic-green fill-islamic-green/20 -scale-x-100" />
              </motion.div>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-relaxed mb-8 text-white text-glow-white font-amiri tracking-tight max-w-4xl mx-auto">
              منذ 1945… <span className="text-islamic-green italic drop-shadow-[0_0_25px_rgba(15,143,61,0.6)]">ونحن نصنع الطعم الأصيل</span>
            </h2>
            
            <p className="text-xl md:text-3xl font-light mb-20 opacity-90 max-w-3xl mx-auto leading-relaxed text-white/90 font-cairo">
              رحلة من النكهات العريقة، نقدّمها اليوم بأسلوب فاخر يليق بك.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/menu"
                  className="w-full sm:w-auto px-12 py-4 border-2 border-islamic-green text-white hover:bg-islamic-green hover:glow-green font-bold rounded-full flex items-center justify-center gap-3 transition-all text-lg"
                >
                  اكتشف المنيو
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05, y: -2 }} className="flex flex-col items-center gap-2">
                <Link
                  to="/booking"
                  className="w-full sm:w-auto px-12 py-4 bg-islamic-green text-white font-bold rounded-full flex items-center justify-center gap-3 shadow-xl glow-green hover:glow-green-strong text-lg transition-all"
                >
                  احجز مكانك
                  <MapPin className="w-5 h-5" />
                </Link>
                <Link 
                  to="/branches"
                  className="text-white/60 hover:text-islamic-green text-sm font-cairo transition-all flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" />
                  موقعنا على الخريطة
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-islamic-green/5 blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-islamic-green" />
              <span className="text-islamic-green font-bold tracking-widest uppercase text-sm">سر الطعم</span>
            </div>
            <h3 className="text-4xl md:text-6xl text-white leading-tight font-bold font-amiri">
              وصفات متوارثة <br /> منذ عام ١٩٤٥
            </h3>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light font-cairo">
              <p>
                في "درويش الكبابجي"، السر ليس مجرد تتبيلة، بل هو إرث عائلي بدأ في عام ١٩٤٥. نحن نؤمن بأن الطعم الأصيل يأتي من الالتزام بالوصفات المتوارثة التي صقلها الزمن، مع اختيار أجود أنواع اللحوم البلدية الطازجة يومياً.
              </p>
              <p>
                كل قطعة لحم تلمس نارنا تحكي قصة شغف امتدت لأكثر من ٧٥ عاماً. نحافظ على سر الصنعة في اختيار قطعيات اللحم، وطريقة التتبيل اليدوية، والشواء على الفحم الطبيعي لنقدم لكم المذاق الذي لا يُنسى.
              </p>
            </div>
          </motion.div>

          {/* Atmosphere Gallery */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-12 gap-3 md:gap-4 h-[500px] md:h-[650px]">
              {/* Main Large Image */}
              <div className="col-span-7 md:col-span-8 relative group overflow-hidden rounded-2xl md:rounded-[2.5rem]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src="https://i.postimg.cc/HxxdhWq3/519685688-17960189759956338-438343215948428573-n.jpg" 
                  alt="أجواء درويش الكبابجي" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {/* Logo Overlay */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/20 z-20 shadow-lg">
                  <img 
                    src="https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg" 
                    alt="Logo" 
                    className="w-full h-full object-contain rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute bottom-4 right-4 z-20 md:bottom-8 md:right-8">
                  <div className="bg-islamic-green/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs md:text-sm font-bold font-cairo shadow-lg glow-green">
                    أجواء ملكية
                  </div>
                </div>
              </div>

              {/* Top Right Small Image */}
              <div className="col-span-5 md:col-span-4 relative group overflow-hidden rounded-2xl md:rounded-[2.5rem]">
                <img 
                  src="https://i.postimg.cc/W3gzn1gk/485207455-1085270556973135-3369557934857039915-n.jpg" 
                  alt="أجواء درويش الكبابجي" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {/* Logo Overlay */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/20 z-20 shadow-lg">
                  <img 
                    src="https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg" 
                    alt="Logo" 
                    className="w-full h-full object-contain rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 border-2 border-islamic-green/20 rounded-2xl md:rounded-[2.5rem] pointer-events-none" />
              </div>

              {/* Bottom Right Small Image */}
              <div className="col-span-12 md:col-span-4 md:absolute md:-bottom-12 md:-left-12 md:w-64 md:h-64 z-30 hidden md:block">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative group overflow-hidden rounded-3xl shadow-2xl border-4 border-[#0b0b0b]"
                >
                  <img 
                    src="https://i.postimg.cc/Cx2Kpq4H/519483418-17960189729956338-7503734636496332601-n.jpg" 
                    alt="تفاصيل المشويات" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Logo Overlay */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/20 z-20 shadow-lg">
                    <img 
                      src="https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg" 
                      alt="Logo" 
                      className="w-full h-full object-contain rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-0 bg-islamic-green/10 group-hover:bg-transparent transition-colors" />
                </motion.div>
              </div>
              
              {/* Mobile Only Bottom Image */}
              <div className="col-span-12 h-40 md:hidden relative group overflow-hidden rounded-2xl">
                <img 
                  src="https://i.postimg.cc/Cx2Kpq4H/519483418-17960189729956338-7503734636496332601-n.jpg" 
                  alt="تفاصيل المشويات" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 z-40">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative w-20 h-20 md:w-32 md:h-32 flex items-center justify-center"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                  </defs>
                  <text className="text-[10px] font-bold fill-islamic-green uppercase tracking-[2px]">
                    <textPath xlinkHref="#circlePath">
                      درويش الكبابجي • أصل المشويات • منذ ١٩٤٥ •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-islamic-green rounded-full flex items-center justify-center shadow-lg glow-green">
                    <span className="text-white font-bold text-xs md:text-lg font-amiri">١٩٤٥</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-32 px-6 md:px-12 bg-[#0b0b0b] relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-islamic-green/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center gap-2 mb-4"
            >
              <Star className="w-5 h-5 text-islamic-green fill-islamic-green" />
              <span className="text-islamic-green font-bold tracking-widest uppercase text-sm">الأكثر طلباً</span>
              <Star className="w-5 h-5 text-islamic-green fill-islamic-green" />
            </motion.div>
            <h3 className="text-4xl md:text-6xl text-white font-bold font-amiri">أيقونات درويش</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {[
              { name: "ميكس جريل درويش", desc: "تشكيلة فاخرة من الكباب، الكفتة، والريش مع الأرز البسمتي والمكسرات.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop", price: "٤٥٠" },
              { name: "طبق مشويات درويش", desc: "تشكيلة ملكية من أجود أنواع المشويات المحضرة على الفحم بتتبيلة درويش الخاصة.", img: "https://i.postimg.cc/76L3KcwF/484514054-1082508280582696-3054165405747853488-n.jpg", price: "٤٨٠" },
              { name: "موزة ضاني", desc: "موزة ضاني متبلة بعناية ومشوية على الفحم الهادئ لضمان الطراوة.", img: "https://i.postimg.cc/3RB8n8KY/486378011-1087613940072130-2386062496764035364-n.jpg", price: "٥٢٠" }
            ].map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                onClick={() => handleOrder(item.name, item.price)}
                className="group cursor-pointer bg-[#151515] p-5 rounded-[2.5rem] border border-white/5 hover:border-islamic-green/40 transition-all hover:glow-green relative overflow-hidden"
              >
                <div className="absolute top-6 right-6 z-20 bg-islamic-green text-white px-4 py-1 rounded-full text-xs font-bold font-cairo glow-green">
                  {item.price} ج.م
                </div>
                <div className="relative h-72 overflow-hidden rounded-[2rem] mb-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent opacity-60 z-10" />
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Logo Overlay */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20 z-20 shadow-lg">
                    <img 
                      src="https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg" 
                      alt="Logo" 
                      className="w-full h-full object-contain rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <h4 className="text-3xl font-bold text-islamic-green mb-3 font-amiri text-glow-white">{item.name}</h4>
                <p className="text-white/70 font-light leading-relaxed font-cairo text-base line-clamp-2">{item.desc}</p>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-islamic-green font-bold font-amiri text-lg">اطلب الآن</span>
                  <ArrowLeft className="w-5 h-5 text-islamic-green group-hover:-translate-x-2 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <Link
                to="/menu"
                className="inline-flex items-center gap-3 px-10 py-4 border border-islamic-green/50 text-white hover:bg-islamic-green hover:glow-green rounded-full transition-all duration-300 font-bold"
              >
                تصفح القائمة كاملة
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 md:px-12 bg-[#0b0b0b] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-islamic-green/5 blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-6xl text-white font-bold font-amiri">قالوا عنا</h3>
            <div className="w-24 h-1 bg-islamic-green mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "أحمد علي", comment: "أفضل مشويات في القاهرة بلا منازع. الطعم الأصيل والخدمة الممتازة.", role: "ناقد طعام" },
              { name: "سارة محمود", comment: "التجربة كانت رائعة، الأجواء هادئة وفاخرة والطعام طازج جداً.", role: "عميلة مميزة" },
              { name: "محمد حسن", comment: "درويش الكبابجي هو المكان المفضل لعائلتي منذ سنوات. جودة لا تتغير.", role: "رائد أعمال" }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#151515] p-10 rounded-[2.5rem] border border-white/5 relative group hover:border-islamic-green/30 transition-all"
              >
                <div className="absolute -top-6 -right-6">
                  <Moon className="w-14 h-14 text-islamic-green/10 fill-islamic-green/5 group-hover:fill-islamic-green/10 transition-all" />
                </div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-islamic-green fill-islamic-green" />
                  ))}
                </div>
                <p className="text-white/90 italic mb-8 font-cairo text-lg leading-relaxed">"{testimonial.comment}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-islamic-green/10 rounded-full flex items-center justify-center border border-islamic-green/20">
                    <span className="text-islamic-green font-bold text-xl font-amiri">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-bold font-cairo text-lg">{testimonial.name}</p>
                    <p className="text-islamic-green/60 text-xs font-cairo">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes coal-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
        .animate-coal-glow {
          animation: coal-glow 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
