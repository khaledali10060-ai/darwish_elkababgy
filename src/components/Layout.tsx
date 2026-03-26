import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, UtensilsCrossed, Facebook, Instagram, Twitter, MapPin, Menu as MenuIcon, X, ShoppingCart } from "lucide-react";
import InstagramFeed from "./InstagramFeed";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "القائمة", path: "/menu" },
    { name: "الفروع", path: "/branches" },
  ];

  return (
    <div className="min-h-screen selection:bg-islamic-green selection:text-white bg-matte-black overflow-x-hidden flex flex-col font-cairo text-white">
      <CartDrawer />
      {/* Glassmorphism Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-12 md:py-4 bg-matte-black/80 backdrop-blur-lg border-b border-white/5">
        {/* Right: Logo & Founded Year */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <img 
              src="https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg" 
              alt="درويش الكبابجي" 
              className="h-10 md:h-14 w-auto rounded-lg object-contain transition-transform duration-500 group-hover:scale-105 shadow-sm border border-white/10"
            />
            <div className="flex flex-col">
              <h1 className="text-sm sm:text-xl md:text-2xl font-bold tracking-wider text-white whitespace-nowrap font-amiri">
                درويش الكبابجي
              </h1>
              <span className="text-[8px] sm:text-[10px] md:text-xs italic opacity-70 text-islamic-green">
                تأسس عام ١٩٤٥
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg font-semibold transition-all hover:text-islamic-green hover:text-glow-white ${
                location.pathname === link.path ? "text-islamic-green" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/booking"
            className="text-lg font-semibold text-white bg-islamic-green px-6 py-2 rounded-full hover:glow-green transition-all"
          >
            احجز الآن
          </Link>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white hover:text-islamic-green transition-colors group"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-islamic-green text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-matte-black glow-green">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Left: Hot Line Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:gap-4">
          <motion.a
            href="https://wa.me/201272991000"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-6 md:py-2 bg-[#151515] border border-islamic-green/20 rounded-full shadow-lg group hover:glow-green transition-all"
          >
            <div className="p-1 md:p-1.5 bg-islamic-green rounded-full text-white group-hover:rotate-12 transition-transform">
              <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="flex flex-col items-start leading-none text-white">
              <span className="text-[8px] md:text-[10px] opacity-70">واتساب</span>
              <span className="text-sm md:text-lg font-bold tracking-tighter" dir="ltr">01272991000</span>
            </div>
          </motion.a>

          <motion.a
            href="tel:15960"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-6 md:py-2 bg-[#151515] border border-islamic-green/20 rounded-full shadow-lg group hover:glow-green transition-all"
          >
            <div className="p-1 md:p-1.5 bg-islamic-green rounded-full text-white group-hover:rotate-12 transition-transform">
              <Phone className="w-3 h-3 md:w-4 md:h-4" />
            </div>
            <div className="flex flex-col items-start leading-none text-white">
              <span className="text-[8px] md:text-[10px] opacity-70">الخط الساخن</span>
              <span className="text-sm md:text-lg font-bold tracking-tighter" dir="ltr">15960</span>
            </div>
          </motion.a>

          <button 
            className="lg:hidden p-1 md:p-2 text-white hover:text-islamic-green transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>

          {/* Mobile Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="lg:hidden relative p-1 md:p-2 text-white hover:text-islamic-green transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-islamic-green text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-matte-black glow-green">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-matte-black pt-[88px] px-6 pb-6 flex flex-col lg:hidden bg-islamic-pattern"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-bold transition-colors hover:text-islamic-green font-amiri ${
                    location.pathname === link.path ? "text-islamic-green text-glow-white" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-islamic-green mt-4 font-amiri text-glow-white"
              >
                احجز الآن
              </Link>
              
              <a
                href="https://wa.me/201272991000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 mt-4 p-4 bg-[#151515] border border-islamic-green/30 rounded-2xl shadow-lg glow-green"
              >
                <div className="p-3 bg-islamic-green rounded-full text-white">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="flex flex-col items-start leading-none text-white">
                  <span className="text-sm opacity-70 mb-1 font-cairo">واتساب</span>
                  <span className="text-2xl font-bold tracking-tighter" dir="ltr">01272991000</span>
                </div>
              </a>

              <a
                href="tel:15960"
                className="flex items-center gap-3 mt-8 p-4 bg-[#151515] border border-islamic-green/30 rounded-2xl shadow-lg glow-green"
              >
                <div className="p-3 bg-islamic-green rounded-full text-white">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-start leading-none text-white">
                  <span className="text-sm opacity-70 mb-1 font-cairo">الخط الساخن</span>
                  <span className="text-2xl font-bold tracking-tighter" dir="ltr">15960</span>
                </div>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-[88px]">
        <Outlet />
      </main>

      {/* Instagram Feed Section */}
      <InstagramFeed />

      {/* Footer */}
      <footer className="bg-[#0a0a0a] pt-24 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden mt-auto bg-islamic-pattern">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-islamic-green/40 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-islamic-green/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center gap-3">
                <img 
                  src="https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg" 
                  alt="درويش الكبابجي" 
                  className="h-14 w-auto rounded-lg object-contain shadow-sm border border-white/10"
                />
                <h2 className="text-3xl font-bold text-islamic-green font-amiri">درويش الكبابجي</h2>
              </div>
              <p className="text-white/60 max-w-md leading-relaxed font-light font-cairo">
                أصل المشويات المصرية منذ عام ١٩٤٥. نقدم لكم تجربة طعام استثنائية تجمع بين جودة اللحوم البلدية وعراقة الصنعة.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <a href="https://www.facebook.com/DarwishElKababgy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-islamic-green hover:glow-green transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/darwish_elkababgy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-islamic-green hover:glow-green transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-islamic-green hover:glow-green transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white font-amiri">روابط سريعة</h4>
              <ul className="space-y-4 font-cairo">
                <li><Link to="/menu" className="text-white/60 hover:text-islamic-green transition-colors">قائمة الطعام</Link></li>
                <li><Link to="/branches" className="text-white/60 hover:text-islamic-green transition-colors">فروعنا</Link></li>
                <li><Link to="/booking" className="text-white/60 hover:text-islamic-green transition-colors">حجز الطاولات</Link></li>
                <li><Link to="/branches" className="text-white/60 hover:text-islamic-green transition-colors">موقعنا على الخريطة</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white font-amiri">تواصل معنا</h4>
              <div className="space-y-4 font-cairo">
                <div className="flex items-start gap-3 text-white/60">
                  <Phone className="w-5 h-5 text-islamic-green shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-white mb-1">الخط الساخن</p>
                    <p className="text-xl text-islamic-green font-bold" dir="ltr">15960</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-white/60">
                  <div className="w-5 h-5 text-islamic-green shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">واتساب</p>
                    <p className="text-xl text-islamic-green font-bold" dir="ltr">01272991000</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-white/60">
                  <MapPin className="w-5 h-5 text-islamic-green shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-white mb-1">الإدارة الرئيسية</p>
                    <p>التجمع الخامس، القاهرة، مصر</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40 font-cairo">
            <p>جميع الحقوق محفوظة لمطعم درويش الكبابجي © 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
