import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Send, MessageCircle, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { 
    cart, 
    updateQuantity, 
    clearCart,
    totalItems, 
    totalPrice, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    phone: "",
    address: "",
    branch: "التجمع الخامس",
    orderType: "delivery" as "delivery" | "pickup"
  });

  const branches = [
    "التجمع الخامس",
    "العبور",
    "الشروق",
    "مصر الجديدة"
  ];

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalItems === 0) return;
    
    let message = "طلب جديد من درويش الكبابجي:\n\n";
    message += `👤 الاسم: ${checkoutData.name}\n`;
    message += `📞 الهاتف: ${checkoutData.phone}\n`;
    message += `🚚 نوع الطلب: ${checkoutData.orderType === 'delivery' ? 'توصيل للمنزل' : 'استلام من المطعم'}\n`;
    if (checkoutData.orderType === 'delivery') {
      message += `📍 العنوان: ${checkoutData.address}\n`;
    }
    message += `🏢 الفرع: ${checkoutData.branch}\n\n`;
    message += "الطلبات:\n";
    
    Object.values(cart).forEach((item: any) => {
      message += `▪ ${item.quantity}x ${item.name}`;
      if (item.weight) message += ` (${item.weight})`;
      message += ` - ${item.price * item.quantity} ج.م\n`;
    });
    
    message += `\n💰 الإجمالي: ${totalPrice} ج.م\n`;
    message += "\nشكراً لكم.";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/201272991000?text=${encodedMessage}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-matte-black h-full shadow-2xl flex flex-col border-l border-white/5"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#151515]">
              <h2 className="text-2xl font-bold text-islamic-green flex items-center gap-3 font-amiri">
                <ShoppingCart className="w-6 h-6" />
                {step === 'cart' ? 'سلة الطلبات' : 'بيانات التوصيل'}
              </h2>
              <div className="flex items-center gap-2">
                {step === 'cart' && Object.keys(cart).length > 0 && (
                  <button 
                    onClick={() => clearCart()}
                    className="text-red-500/60 hover:text-red-500 bg-red-500/5 p-2 rounded-full transition-colors"
                    title="مسح السلة"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <button onClick={() => { setIsCartOpen(false); setStep('cart'); }} className="text-white/60 hover:text-islamic-green bg-white/5 p-2 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-islamic-pattern">
              {step === 'cart' ? (
                Object.keys(cart).length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-white/30 space-y-6">
                    <ShoppingCart className="w-20 h-20 opacity-10" />
                    <p className="text-xl font-amiri">السلة فارغة</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="px-8 py-3 bg-islamic-green/10 text-islamic-green border border-islamic-green/20 rounded-full font-bold hover:bg-islamic-green hover:text-white transition-all font-cairo"
                    >
                      متابعة الطلب
                    </button>
                  </div>
                ) : (
                  Object.entries(cart).map(([key, item]: [string, any]) => (
                    <div key={key} className="flex items-center justify-between bg-[#151515] p-5 rounded-2xl border border-white/5 hover:border-islamic-green/20 transition-colors">
                      <div className="flex-1 text-right">
                        <div className="flex items-center justify-end gap-2 mb-1">
                          {item.weight && (
                            <span className="bg-islamic-green/10 text-islamic-green text-[10px] px-2 py-0.5 rounded-full border border-islamic-green/20 font-bold font-cairo">
                              {item.weight}
                            </span>
                          )}
                          <h4 className="font-bold text-islamic-green text-base font-amiri">{item.name}</h4>
                        </div>
                        <p className="text-white text-sm mt-2 font-bold font-amiri">{item.price * item.quantity} ج.م</p>
                      </div>
                      <div className="flex items-center gap-3 bg-matte-black rounded-xl p-1.5 border border-white/5 ml-4">
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateQuantity(key, -1)} className="w-8 h-8 bg-[#151515] rounded-lg flex items-center justify-center text-white hover:text-islamic-green transition-colors"><Minus className="w-4 h-4" /></motion.button>
                        <motion.span key={item.quantity} initial={{ scale: 1.5, color: "#0f8f3d" }} animate={{ scale: 1, color: "#ffffff" }} className="font-bold w-5 text-center text-sm font-cairo">{item.quantity}</motion.span>
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateQuantity(key, 1)} className="w-8 h-8 bg-islamic-green text-white rounded-lg flex items-center justify-center glow-green"><Plus className="w-4 h-4" /></motion.button>
                      </div>
                    </div>
                  ))
                )
              ) : (
                <form id="checkout-form" onSubmit={submitOrder} className="space-y-6 text-right">
                  <div className="flex gap-2 p-1 bg-[#151515] border border-white/10 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setCheckoutData({ ...checkoutData, orderType: 'pickup' })}
                      className={`flex-1 py-3 rounded-xl font-bold font-cairo transition-all ${
                        checkoutData.orderType === 'pickup' 
                          ? 'bg-islamic-green text-white shadow-lg glow-green' 
                          : 'text-white/40 hover:text-white'
                      }`}
                    >
                      استلام مطعم
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutData({ ...checkoutData, orderType: 'delivery' })}
                      className={`flex-1 py-3 rounded-xl font-bold font-cairo transition-all ${
                        checkoutData.orderType === 'delivery' 
                          ? 'bg-islamic-green text-white shadow-lg glow-green' 
                          : 'text-white/40 hover:text-white'
                      }`}
                    >
                      توصيل للمنزل
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80 font-cairo block">الاسم بالكامل</label>
                    <input
                      type="text"
                      required
                      value={checkoutData.name}
                      onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                      className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-islamic-green transition-colors font-cairo text-right"
                      placeholder="أدخل اسمك"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80 font-cairo block">رقم الهاتف</label>
                    <input
                      type="tel"
                      required
                      value={checkoutData.phone}
                      onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                      className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-islamic-green transition-colors font-cairo text-right"
                      placeholder="رقم الموبايل"
                      dir="ltr"
                    />
                  </div>
                  {checkoutData.orderType === 'delivery' && (
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/80 font-cairo block">العنوان بالتفصيل</label>
                      <textarea
                        required
                        value={checkoutData.address}
                        onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                        className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-islamic-green transition-colors font-cairo min-h-[100px] text-right"
                        placeholder="أدخل عنوان التوصيل"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80 font-cairo block">الفرع</label>
                    <select
                      value={checkoutData.branch}
                      onChange={(e) => setCheckoutData({ ...checkoutData, branch: e.target.value })}
                      className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-islamic-green transition-colors appearance-none font-cairo text-right"
                    >
                      {branches.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </form>
              )}
            </div>
            
            {totalItems > 0 && (
              <div className="p-6 border-t border-white/5 bg-[#151515]">
                <div className="flex justify-between items-center mb-6 bg-matte-black p-5 rounded-2xl border border-white/5">
                  <span className="text-lg text-white font-bold font-amiri">الإجمالي:</span>
                  <motion.span key={totalPrice} initial={{ scale: 1.1, color: "#ffffff" }} animate={{ scale: 1, color: "#0f8f3d" }} className="text-2xl font-bold text-islamic-green font-amiri text-glow-white">{totalPrice} ج.م</motion.span>
                </div>
                
                {step === 'cart' ? (
                  <div className="space-y-3">
                    <button onClick={() => setStep('checkout')} className="w-full py-4 bg-islamic-green text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:glow-green transition-all text-lg shadow-lg font-cairo">
                      <Send className="w-6 h-6 rotate-180" />
                      متابعة الطلب
                    </button>
                    <button onClick={() => setIsCartOpen(false)} className="w-full py-3 bg-white/5 text-white/70 font-bold rounded-2xl hover:bg-white/10 transition-all font-cairo text-sm">
                      متابعة الطلب
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={() => setStep('cart')} className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all font-cairo">
                      رجوع
                    </button>
                    <button form="checkout-form" type="submit" className="flex-[2] py-4 bg-islamic-green text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:glow-green transition-all text-lg shadow-lg font-cairo">
                      <MessageCircle className="w-6 h-6" />
                      تأكيد عبر واتساب
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
