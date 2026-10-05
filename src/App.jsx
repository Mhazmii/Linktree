import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Instagram, Mail, Globe, Sparkles } from 'lucide-react';
import Particles from './components/Particles';

export default function App() {
  const links = [
    {
      id: 1,
      name: "WhatsApp Kami",
      desc: "Pesan & konsultasi",
      url: "https://wa.me/6282313347664",
      icon: <Phone className="w-6 h-6" />,
      active: true,
    },
    {
      id: 2,
      name: "Instagram",
      desc: "Update Hazz Farm",
      url: "https://instagram.com/hazzfarm.id",
      icon: <Instagram className="w-6 h-6" />,
      active: true,
    },
    {
      id: 3,
      name: "Email",
      desc: "Bisnis & kerja sama",
      url: "mailto:hazzfarm6@gmail.com",
      icon: <Mail className="w-6 h-6" />,
      active: true,
    },
    {
      id: 4,
      name: "Website Resmi",
      desc: "Produk & informasi lengkap",
      url: "#",
      icon: <Globe className="w-6 h-6" />,
      active: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans text-zinc-100">
      
      {/* Interactive Particles Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Particles 
          particleCount={120}
          backgroundColor="#09090b"
          particleColor="#22c55e"
          connectionDistance={130}
          hoverDistance={200}
        />
      </div>

      {/* Main Container - Glassmorphism Wrapper */}
      <motion.div 
        className="w-full max-w-md z-10 flex flex-col items-center backdrop-blur-md bg-zinc-950/40 p-8 rounded-[2rem] border border-zinc-800/50 shadow-2xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="flex flex-col items-center mb-8"
          variants={itemVariants}
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
            <img 
              src="/Logo Hazz Farm.png" 
              alt="HazzFarm Logo" 
              className="w-28 h-28 rounded-full object-cover border-4 border-zinc-800 relative z-10 bg-white"
            />
          </motion.div>
          
          <h1 className="text-3xl font-bold mt-6 tracking-tight flex items-center gap-2">
            HazzFarm <Sparkles className="w-5 h-5 text-green-400" />
          </h1>
          <p className="text-green-400 font-medium mt-1">"Dari Petani, Langsung ke Konsumen"</p>
          
          <div className="flex gap-2 mt-5 text-xs font-semibold flex-wrap justify-center">
            <span className="px-3 py-1 bg-zinc-800/70 rounded-full text-zinc-300 backdrop-blur-sm border border-zinc-700/50">
              #DariServerKeKebun
            </span>
            <span className="px-3 py-1 bg-zinc-800/70 rounded-full text-zinc-300 backdrop-blur-sm border border-zinc-700/50">
              #PetaniGenZ
            </span>
          </div>
        </motion.div>

        <div className="w-full flex flex-col gap-4">
          {links.map((link) => (
            <motion.a
              key={link.id}
              href={link.url}
              target={link.url !== "#" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={link.active ? { scale: 1.03 } : {}}
              whileTap={link.active ? { scale: 0.98 } : {}}
              className={`relative flex items-center p-4 rounded-2xl border backdrop-blur-md overflow-hidden group transition-all duration-300
                ${link.active 
                  ? "bg-zinc-900/60 border-zinc-800/80 hover:border-green-500/60 hover:bg-zinc-900/90 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)]" 
                  : "bg-zinc-900/30 border-zinc-900 opacity-60 cursor-not-allowed"}
              `}
              onClick={(e) => !link.active && e.preventDefault()}
            >
              <div className={`p-3 rounded-xl mr-4 flex-shrink-0 transition-all duration-300
                ${link.active ? "bg-zinc-800/80 text-green-400 group-hover:bg-green-400 group-hover:text-zinc-950 group-hover:shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-zinc-900 text-zinc-600"}
              `}>
                {link.icon}
              </div>

              <div className="flex flex-col flex-grow">
                <span className="font-semibold text-zinc-100">{link.name}</span>
                <span className="text-sm text-zinc-400">{link.desc}</span>
              </div>
              
              {link.active && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-0 -translate-x-4 text-green-400">
                  →
                </div>
              )}
            </motion.a>
          ))}
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-10 text-zinc-600 text-sm font-medium"
        >
          &copy; {new Date().getFullYear()} HazzFarm. All rights reserved.
        </motion.div>
      </motion.div>
    </div>
  );
}
