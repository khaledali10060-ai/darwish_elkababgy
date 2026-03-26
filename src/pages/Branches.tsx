import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const branches = [
  {
    name: "التجمع الخامس",
    address: "شارع التسعين الشمالي، بجوار مجمع البنوك، التجمع الخامس، القاهرة",
    mapLink: "https://maps.google.com/?q=التجمع+الخامس",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "مصر الجديدة",
    address: "شارع الميرغني، تقاطع شارع الثورة، مصر الجديدة، القاهرة",
    mapLink: "https://maps.google.com/?q=مصر+الجديدة",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "الشروق",
    address: "مول سيتي بلازا، مدخل الشروق ١، مدينة الشروق",
    mapLink: "https://maps.google.com/?q=مدينة+الشروق",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "العبور",
    address: "جولف سيتي مول، بجوار كارفور، مدينة العبور",
    mapLink: "https://maps.google.com/?q=مدينة+العبور",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function Branches() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-4 md:px-12 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-islamic-green/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-islamic-green/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Branches Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full bg-islamic-green/10 border border-islamic-green/20 text-islamic-green text-sm font-bold mb-4"
            >
              فروعنا في خدمتك
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-amiri">أين تجدنا؟</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-cairo">
              متواجدون بالقرب منك لنقدم لك تجربة المشويات الأصيلة في أجواء لا تُنسى.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {branches.map((branch, idx) => (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-[#151515] border border-white/5 rounded-2xl overflow-hidden group hover:border-islamic-green/30 transition-all hover:glow-green"
              >
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={branch.image} 
                    alt={branch.name} 
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
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-islamic-green mb-3 font-amiri">{branch.name}</h3>
                  <p className="text-white/60 text-sm mb-6 min-h-[40px] leading-relaxed font-cairo">
                    {branch.address}
                  </p>
                  <a
                    href={branch.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-islamic-green transition-colors group/link"
                  >
                    <MapPin className="w-4 h-4 text-islamic-green" />
                    <span className="font-cairo">افتح في الخرائط</span>
                    <div className="w-0 h-px bg-islamic-green group-hover/link:w-full transition-all duration-300" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
