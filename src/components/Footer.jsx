import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBusinessInfo } from "../services/dataStore.js";

export default function Footer() {
  const [businessInfo, setBusinessInfo] = useState({
    businessEmail: "info@caliing.com",
    phoneNumber: "+383 44 123 456",
    officeAddress: "Prishtinë, Kosovë",
    instagramUrl: "https://instagram.com/caliing"
  });
  
  const [currentYear, setCurrentYear] = useState(2025);
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    const loadBusinessInfo = async () => {
      try {
        const data = await getBusinessInfo();
        if (data) {
          setBusinessInfo(data);
        }
      } catch (err) {
        console.error("Footer: Error loading business info", err);
      }
    };
    
    loadBusinessInfo();
  }, []);

  if (!businessInfo) {
    return null;
  }

  return (
    <footer className="relative z-10 bg-[#1a1a1a] border-t border-white/5 py-32 sm:py-48 selection:bg-[#C5A059] selection:text-[#ffffff]">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
          <div className="md:col-span-6 space-y-16">
            <Link to="/" className="inline-block">
              <span className="font-sans text-5xl font-black tracking-tighter text-white uppercase transition-colors hover:text-white/70">
                Cali<span className="text-white/10">.</span>
                <span className="text-white/5 italic">Ing</span>
              </span>
            </Link>
            <div className="space-y-6 text-white/60 font-light">
              <p className="text-xl leading-relaxed text-pretty">
                Një studio arkitekture moderne e krijuar për të projektuar hapësira që ndërtojnë histori.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-12">
              <a
                href={`https://wa.me/${businessInfo.phoneNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/40 hover:text-[#C5A059] transition-all duration-500"
              >
                <span className="text-[#C5A059]">📞</span>
                <span className="font-light tracking-[0.1em]">{businessInfo.phoneNumber}</span>
              </a>
              <a
                href={`mailto:${businessInfo.businessEmail}`}
                className="flex items-center gap-4 text-white/40 hover:text-[#C5A059] transition-all duration-500"
              >
                <span className="text-[#C5A059]">✉️</span>
                <span className="font-light tracking-[0.1em]">{businessInfo.businessEmail}</span>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h4 className="text-[10px] tracking-[0.5em] text-white/10 uppercase font-black">Menu</h4>
              <nav className="space-y-6">
                <Link to="/" className="block text-white/40 hover:text-[#C5A059] transition-all duration-500 font-light">Shtëpia</Link>
                <Link to="/about" className="block text-white/40 hover:text-[#C5A059] transition-all duration-500 font-light">Rreth Nesh</Link>
                <Link to="/projects" className="block text-white/40 hover:text-[#C5A059] transition-all duration-500 font-light">Portofoli</Link>
                <Link to="/contact" className="block text-white/40 hover:text-[#C5A059] transition-all duration-500 font-light">Na Kontakt</Link>
              </nav>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-[10px] tracking-[0.5em] text-white/10 uppercase font-black">Social</h4>
              <div className="space-y-6">
                <a
                  href={businessInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-white/40 hover:text-[#C5A059] transition-all duration-500 font-light"
                >
                  <span className="text-[#C5A059]">📷</span>
                  <span className="tracking-[0.1em]">Instagram</span>
                </a>
                <div className="flex items-start gap-4 text-white/40 font-light">
                  <span className="text-[#C5A059] mt-1">📍</span>
                  <span className="tracking-[0.1em]">{businessInfo.officeAddress}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-16 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-white/10 text-[10px] tracking-[0.4em] uppercase font-black">
          <p>© {currentYear} Cali Ing. All Rights Reserved.</p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="hover:text-white/30 transition-colors">Privacy Policy</Link>
            <Link to="/admin2b" className="hover:text-white/30 transition-colors">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
