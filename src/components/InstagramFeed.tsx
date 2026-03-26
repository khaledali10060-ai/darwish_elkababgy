import React from "react";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";

const instagramPosts = [
  {
    id: 1,
    image: "https://i.postimg.cc/hjX8fnmK/527950796-17962370048956338-8239750356956064453-n.jpg",
    likes: "1.2k",
    comments: "84",
    type: "video"
  },
  {
    id: 2,
    image: "https://i.postimg.cc/HxxdhWq3/519685688-17960189759956338-438343215948428573-n.jpg",
    likes: "850",
    comments: "42",
    type: "image"
  },
  {
    id: 3,
    image: "https://i.postimg.cc/W3gzn1gk/485207455-1085270556973135-3369557934857039915-n.jpg",
    likes: "2.1k",
    comments: "156",
    type: "image"
  },
  {
    id: 4,
    image: "https://i.postimg.cc/Cx2Kpq4H/519483418-17960189729956338-7503734636496332601-n.jpg",
    likes: "940",
    comments: "31",
    type: "video"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
    likes: "1.5k",
    comments: "67",
    type: "image"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop",
    likes: "3.2k",
    comments: "210",
    type: "image"
  }
];

export default function InstagramFeed() {
  const instagramUrl = "https://www.instagram.com/darwish_elkababgy";

  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial-gradient from-islamic-green/5 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Instagram Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 border-b border-white/10 pb-12">
          {/* Profile Picture */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full blur-[2px] opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-full p-1 bg-black">
              <img 
                src="https://i.postimg.cc/VvC1zrGD/272938065-2905339776422956-9007348818074320979-n.jpg" 
                alt="Darwish El Kababgy" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-right">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white font-mono tracking-tight">darwish_elkababgy</h2>
              <div className="flex gap-2">
                <a 
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-1.5 bg-islamic-green text-white font-bold rounded-lg hover:glow-green transition-all text-sm font-cairo"
                >
                  متابعة
                </a>
                <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all">
                  <Instagram className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-8 mb-6 font-cairo">
              <div className="flex flex-col md:flex-row items-center gap-1">
                <span className="font-bold text-white">١,٢٤٠</span>
                <span className="text-white/60 text-sm">منشور</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-1">
                <span className="font-bold text-white">١٨٥ ألف</span>
                <span className="text-white/60 text-sm">متابع</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-1">
                <span className="font-bold text-white">٤٢</span>
                <span className="text-white/60 text-sm">يتابع</span>
              </div>
            </div>

            {/* Bio */}
            <div className="text-white/80 font-cairo space-y-1">
              <p className="font-bold text-white">درويش الكبابجي - Darwish El Kababgy</p>
              <p>أصل المشويات المصرية منذ عام ١٩٤٥ 🥩🔥</p>
              <p>📍 التجمع - مصر الجديدة - الشروق - العبور</p>
              <a href={instagramUrl} className="text-islamic-green font-bold hover:underline">linktr.ee/darwishelkababgy</a>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-6">
          {instagramPosts.map((post) => (
            <motion.a
              key={post.id}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square group overflow-hidden rounded-sm md:rounded-xl bg-[#151515]"
            >
              <img 
                src={post.image} 
                alt="Instagram Post" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 md:gap-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <Heart className="w-5 h-5 md:w-6 md:h-6 fill-white" />
                  <span className="text-xs md:text-base">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-white" />
                  <span className="text-xs md:text-base">{post.comments}</span>
                </div>
              </div>

              {/* Video Icon */}
              {post.type === "video" && (
                <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-6 md:h-6 fill-white drop-shadow-lg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
              )}
            </motion.a>
          ))}
        </div>

        {/* Follow Button Mobile */}
        <div className="mt-12 text-center">
          <motion.a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-white/5 border border-white/10 rounded-full text-white font-bold hover:bg-islamic-green hover:glow-green transition-all font-cairo"
          >
            <Instagram className="w-6 h-6" />
            تابعنا على إنستجرام
            <ExternalLink className="w-4 h-4 opacity-50" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
