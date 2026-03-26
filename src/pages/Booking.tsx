import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Calendar, Users, Clock, Send, CheckCircle2, Star, Moon } from "lucide-react";

const branches = [
  "التجمع الخامس",
  "العبور",
  "الشروق",
  "مصر الجديدة"
];

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    branch: branches[0],
    guests: "2",
    date: "",
    time: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      const message = `طلب حجز طاولة في درويش الكبابجي:
الاسم: ${formData.name}
رقم الهاتف: ${formData.phone}
الفرع: ${formData.branch}
عدد الأشخاص: ${formData.guests}
التاريخ: ${formData.date}
الوقت: ${formData.time}`;

      const encodedMessage = encodeURIComponent(message);
      
      window.open(`https://wa.me/201272991000?text=${encodedMessage}`, "_blank");
      
    }, 800);
  };

  return (
    <div className="min-h-screen bg-matte-black py-20 px-4 md:px-12 flex items-center justify-center relative overflow-hidden bg-islamic-pattern">
      
      {/* Aerial View Background Layer */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2068&auto=format&fit=crop" 
          alt="Aerial View" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Subtle Logo Overlay on Background */}
        <div className="absolute top-10 left-10 w-32 h-32 opacity-10 pointer-events-none">
          <img 
            src="https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg" 
            alt="Logo Background" 
            className="w-full h-full object-contain grayscale brightness-200"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-matte-black via-matte-black/80 to-matte-black" />
      </div>

      {/* Success Popup Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-matte-black/90 backdrop-blur-sm px-4"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#161616] border border-islamic-green/30 rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-[0_20px_60px_rgba(15,143,61,0.15)] relative overflow-hidden"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-islamic-green/10 rounded-full blur-3xl"></div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
                className="relative z-10 flex justify-center mb-6"
              >
                <div className="w-20 h-20 rounded-full bg-islamic-green/10 flex items-center justify-center border border-islamic-green/30">
                  <CheckCircle2 className="w-10 h-10 text-islamic-green" />
                </div>
              </motion.div>
              
              <h3 className="relative z-10 text-2xl md:text-3xl font-bold text-brand-white mb-4 font-amiri">
                تم تجهيز طلبك
              </h3>
              <p className="relative z-10 text-islamic-green text-lg mb-8 leading-relaxed font-cairo">
                جاري تحويلك لواتساب لتأكيد الحجز.. ننتظرك في درويش الكبابجي.
              </p>
              
              <div className="relative z-10 flex justify-center">
                <div className="flex gap-2">
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2 h-2 rounded-full bg-islamic-green"></motion.div>
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-islamic-green"></motion.div>
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-islamic-green"></motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-4xl mx-auto bg-[#1a1a1a]/90 backdrop-blur-xl border border-islamic-green/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-islamic-green/5 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Moon className="w-6 h-6 text-islamic-green fill-islamic-green/20" />
            <div className="h-px w-12 bg-islamic-green/30" />
            <Star className="w-5 h-5 text-islamic-green fill-islamic-green" />
            <div className="h-px w-12 bg-islamic-green/30" />
            <Moon className="w-6 h-6 text-islamic-green fill-islamic-green/20 -scale-x-100" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-islamic-green mb-4 font-amiri text-glow-white">احجز مكانك</h2>
          <h3 className="text-xl md:text-2xl font-bold text-brand-white/80 mb-6 font-amiri">درويش الكبابجي</h3>
          <p className="text-brand-white/60 font-cairo">
            يرجى ملء البيانات التالية وسنقوم بتأكيد حجزك عبر الواتساب.
          </p>
        </div>

        <form onSubmit={handleBooking} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-white/80 font-cairo">الاسم بالكامل</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-matte-black border border-white/10 rounded-2xl px-4 py-3 text-brand-white focus:outline-none focus:border-islamic-green transition-colors font-cairo"
                  placeholder="أدخل اسمك"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-white/80 font-cairo">رقم الهاتف</label>
              <div className="relative">
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-white/40" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-matte-black border border-white/10 rounded-2xl pr-12 pl-4 py-3 text-brand-white focus:outline-none focus:border-islamic-green transition-colors font-cairo"
                  placeholder="رقم الموبايل"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-white/80 font-cairo">الفرع</label>
              <div className="relative">
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-white/40" />
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full bg-matte-black border border-white/10 rounded-2xl pr-12 pl-4 py-3 text-brand-white focus:outline-none focus:border-islamic-green transition-colors appearance-none font-cairo"
                >
                  {branches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-white/80 font-cairo">عدد الأشخاص</label>
              <div className="relative">
                <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-white/40" />
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-matte-black border border-white/10 rounded-2xl pr-12 pl-4 py-3 text-brand-white focus:outline-none focus:border-islamic-green transition-colors appearance-none font-cairo"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "أكثر من 10"].map(num => (
                    <option key={num} value={num}>{num} أشخاص</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-white/80 font-cairo">تاريخ الحجز</label>
              <div className="relative">
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-white/40" />
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-matte-black border border-white/10 rounded-2xl pr-12 pl-4 py-3 text-brand-white focus:outline-none focus:border-islamic-green transition-colors font-cairo"
                />
              </div>
            </div>

            {/* Time */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-white/80 font-cairo">وقت الحجز</label>
              <div className="relative">
                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-white/40" />
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-matte-black border border-white/10 rounded-2xl pr-12 pl-4 py-3 text-brand-white focus:outline-none focus:border-islamic-green transition-colors font-cairo"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto px-12 py-4 bg-islamic-green text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl glow-green text-lg mx-auto transition-opacity ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'opacity-100'}`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  جاري التجهيز...
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"></motion.div>
                </span>
              ) : (
                <>
                  تأكيد الحجز عبر واتساب
                  <Send className="w-5 h-5 rotate-180" />
                </>
              )}
            </motion.button>
          </div>
        </form>

        {/* Map Section */}
        <div className="mt-16 pt-12 border-t border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-islamic-green" />
            <h4 className="text-xl font-bold text-brand-white font-amiri">موقعنا من الأعلى</h4>
          </div>
          <div className="h-64 md:h-80 w-full rounded-3xl overflow-hidden border border-white/10 relative group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.02636831!2d31.47!3d30.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAwJzM2LjAiTiAzMcKwMjgnMTIuMCJF!5e1!3m2!1sen!2seg!4v1620000000000!5m2!1sen!2seg" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
              allowFullScreen={true} 
              loading="lazy"
              title="Restaurant Location"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border-2 border-islamic-green/20 rounded-3xl group-hover:border-islamic-green/40 transition-colors" />
          </div>
          <p className="mt-4 text-sm text-brand-white/40 text-center font-cairo">
            * الموقع تقريبي، يرجى التواصل معنا لتحديد الفرع الأقرب إليك.
          </p>
        </div>
      </div>
    </div>
  );
}
