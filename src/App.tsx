/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X,
  Stethoscope,
  ShieldCheck,
  Award,
  Users,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { cn } from './lib/utils';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const BUSINESS_DETAILS = {
  name: "NOBLE DENTAL CARE",
  doctor: "Dr. Amiyavardhan Jain",
  phone: "+91 89896 88214",
  whatsapp: "https://wa.me/918989688214",
  callLink: "tel:+918989688214",
  address: "37, S Rajmohalla, opposite Shri Vaishnav Girls Hostel, Vaishnav Stadium, Raj Mohalla South, Raj Mohalla, Indore, MP 452002",
  mapLink: "https://maps.app.goo.gl/Yp4i4v7A8u8u8u8u8", // Placeholder, will use embed
  rating: 4.9,
  reviews: "100+",
  experience: "15+"
};

const SERVICES = [
  {
    title: "Dental Implants",
    description: "Permanent solution for missing teeth with natural-looking results.",
    icon: <Stethoscope className="w-6 h-6" />
  },
  {
    title: "Root Canal Treatment",
    description: "Painless RCT to save your natural teeth from extraction.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: "Teeth Cleaning",
    description: "Professional scaling and polishing for a brighter, healthier smile.",
    icon: <Award className="w-6 h-6" />
  },
  {
    title: "Tooth Extraction",
    description: "Safe and gentle removal of damaged or wisdom teeth.",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Braces & Aligners",
    description: "Straighten your teeth with modern invisible aligners or traditional braces.",
    icon: <Calendar className="w-6 h-6" />
  },
  {
    title: "Cosmetic Dentistry",
    description: "Enhance your smile with veneers, whitening, and smile makeovers.",
    icon: <Star className="w-6 h-6" />
  }
];

const REVIEWS = [
  {
    name: "Rahul Sharma",
    text: "Very good treatment... best doctor in Indore. Painless experience.",
    rating: 5
  },
  {
    name: "Priya Jain",
    text: "Gentle and painless... highly professional staff. Highly recommended!",
    rating: 5
  },
  {
    name: "Amit Patel",
    text: "Explained everything clearly... felt confident throughout the procedure.",
    rating: 5
  },
  {
    name: "Sneha Gupta",
    text: "Modern equipment and very hygienic clinic. Dr. Jain is very patient.",
    rating: 5
  }
];

const TIMINGS = [
  { day: "Monday", time: "11 AM – 2 PM, 6 – 8 PM" },
  { day: "Tuesday", time: "11 AM – 2 PM" },
  { day: "Wednesday", time: "11 AM – 2 PM, 6 – 8 PM" },
  { day: "Thursday", time: "11 AM – 2 PM, 6 – 8 PM" },
  { day: "Friday", time: "11 AM – 2 PM" },
  { day: "Saturday", time: "11 AM – 2 PM, 6 – 8 PM" },
  { day: "Sunday", time: "Closed", closed: true }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -80 });
      setIsMenuOpen(false);
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-cyan-100 selection:text-cyan-900">
      {/* Navbar */}
      <nav className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-5xl px-6 py-3 rounded-full border border-white/20 shadow-2xl",
        isScrolled ? "bg-white/80 backdrop-blur-xl" : "bg-white/40 backdrop-blur-md"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => scrollToSection('home')}>
            <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">NOBLE</span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-600 uppercase">Dental Care</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'About', 'Services', 'Reviews'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-bold text-slate-600 hover:text-cyan-600 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={BUSINESS_DETAILS.callLink}
              className="hidden sm:block bg-gradient-to-r from-cyan-400 to-cyan-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-cyan-200 transition-all"
            >
              Book Consultation
            </a>
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {['Home', 'Services', 'About', 'Reviews', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-2xl font-bold text-slate-800 text-left"
                >
                  {item}
                </button>
              ))}
              <a
                href={BUSINESS_DETAILS.callLink}
                className="bg-cyan-600 text-white px-8 py-4 rounded-2xl text-center font-bold text-lg shadow-xl shadow-cyan-100"
              >
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white">
        {/* Layered Atmospheric Background */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-50/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(206,242,242,0.15)_0%,transparent_70%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Trusted Patients Avatars */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Patient" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-500">1500+ Trusted Patients</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-8">
              Creating Brighter Smiles for a Better Tomorrow
            </h1>
            <p className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed font-medium">
              Experience exceptional dental care for a healthier, brighter smile you'll love to show off!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={BUSINESS_DETAILS.callLink}
                className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-400 to-cyan-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-cyan-200/50 transition-all shadow-lg shadow-cyan-100"
              >
                Book Consultation
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Circular Image with Gradient Border */}
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 rounded-full border-[12px] border-transparent bg-gradient-to-tr from-cyan-400 via-cyan-300 to-emerald-400 bg-clip-border" style={{ maskImage: 'linear-gradient(white, white)', WebkitMaskImage: 'linear-gradient(white, white)', maskComposite: 'exclude', WebkitMaskComposite: 'destination-out' }} />
              <div className="absolute inset-0 rounded-full overflow-hidden p-3">
                <img 
                  src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Smiling patient receiving advanced dental care at Noble Dental Care clinic Indore" 
                  className="w-full h-full object-cover rounded-full"
                  width="800"
                  height="800"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">Happy</div>
                  <div className="text-xs font-medium text-slate-500">teeth</div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">Fit and</div>
                  <div className="text-xs font-medium text-slate-500">Fine</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      

      {/* Trust Section */}
      <section className="py-12 bg-white/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Rating", value: "4.9 ⭐", sub: "Google Reviews" },
              { label: "Reviews", value: "100+", sub: "Verified Feedback" },
              { label: "Experience", value: "15+ Yrs", sub: "Expert Care" },
              { label: "Focus", value: "Painless", sub: "Treatment Focus" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-extrabold text-cyan-600 mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-slate-800 uppercase tracking-tight">{stat.label}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-[0.2em] mb-4">Our Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900">Comprehensive Dental Solutions</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-cyan-200 hover:shadow-2xl hover:shadow-cyan-50 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6">About the Clinic</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
              Experienced and Patient-Focused <span className="text-cyan-400">Dental Care</span>
            </h3>
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>
                Led by <span className="text-white font-bold">Dr. Amiyavardhan Jain</span>, Noble Dental Care has been a cornerstone of dental excellence in Indore for over 15 years.
              </p>
              <p>
                We emphasize <span className="text-cyan-400 font-semibold italic">painless treatments</span> using the latest hygiene protocols and modern equipment. Our goal is to build long-term relationships based on trust and exceptional results.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Modern Digital X-Ray",
                "Painless RCT Focus",
                "Sterilized Environment",
                "Patient-First Approach"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  <span className="font-medium text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-4 border-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Dr. Amiyavardhan Jain providing expert dental treatment at Noble Dental Care" 
                className="w-full h-full object-cover"
                loading="lazy"
                width="800"
                height="1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-cyan-600 p-8 rounded-3xl shadow-2xl">
              <div className="text-4xl font-black mb-1">15+</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">Years of Excellence</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-[0.2em] mb-4">Testimonials</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900">What Our Patients Say</h3>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-16"
          >
            {REVIEWS.map((review, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 italic mb-8 flex-grow leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-bold">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{review.name}</div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Verified Patient</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Timings Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-cyan-600 rounded-[3rem] p-8 md:p-16 text-white grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-5xl font-extrabold mb-6">Clinic Timings</h3>
              <p className="text-cyan-100 text-lg mb-8">
                Plan your visit to Noble Dental Care. We recommend booking an appointment in advance for a seamless experience.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest opacity-80">Emergency?</div>
                  <a href={BUSINESS_DETAILS.callLink} className="text-xl font-bold hover:underline underline-offset-4">Call: {BUSINESS_DETAILS.phone}</a>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 space-y-4">
              {TIMINGS.map((item, i) => (
                <div key={i} className={cn(
                  "flex justify-between items-center py-3 border-b border-white/10 last:border-0",
                  item.closed ? "text-white/50" : "text-white"
                )}>
                  <span className="font-bold">{item.day}</span>
                  <span className={cn("font-medium", item.closed ? "italic" : "")}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-[0.2em] mb-6">Get In Touch</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8">Visit Our Clinic</h3>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-cyan-600 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Address</div>
                    <p className="text-lg text-slate-700 font-medium leading-relaxed">
                      {BUSINESS_DETAILS.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-cyan-600 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</div>
                    <a href={BUSINESS_DETAILS.callLink} className="text-2xl font-bold text-slate-900 hover:text-cyan-600 transition-colors">
                      {BUSINESS_DETAILS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-green-500 shrink-0">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">WhatsApp</div>
                    <a href={BUSINESS_DETAILS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-slate-900 hover:text-green-600 transition-colors">
                      Chat with Us
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <a 
                  href="https://www.google.com/maps/dir//NOBLE+DENTAL+CARE,+37,+S+Rajmohalla,+opposite+Shri+Vaishnav+Girls+Hostel,+Vaishnav+Stadium,+Raj+Mohalla+South,+Raj+Mohalla,+Indore,+Madhya+Pradesh+452002/@22.7147271,75.8330936,15z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                >
                  Get Directions
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white h-[500px]"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14721.453965226148!2d75.83309356264695!3d22.714727100000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fda746fc9df1%3A0xc51c088f20066d1c!2sNOBLE%20DENTAL%20CARE!5e0!3m2!1sen!2sin!4v1774980689766!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-bold text-cyan-600 leading-none">NOBLE</span>
            <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Dental Care</span>
            <p className="mt-4 text-slate-500 text-sm font-medium">© 2026 Noble Dental Care. All rights reserved.</p>
          </div>
          
          <div className="flex gap-8">
            {['Home', 'Services', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-bold text-slate-600 hover:text-cyan-600 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Follow Us</span>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-cyan-50 hover:text-cyan-600 transition-all cursor-pointer">
                <WhatsAppIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={BUSINESS_DETAILS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-200 hover:scale-110 transition-transform group"
      >
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />
        <WhatsAppIcon className="w-8 h-8 relative z-10" />
      </motion.a>
    </div>
  );
}
