import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Search, Menu, X, ChevronDown, ArrowRight, Play, Facebook, Youtube, Instagram, 
  Twitter, Linkedin, ArrowUp, MessageCircle, MapPin, Users, Calendar, Award, 
  CheckCircle2, Building2, Car, Utensils, Gamepad2, Mic2, Send
} from 'lucide-react';

// --- Constants ---
const BRANDS = [
  { name: 'KFC', logo: 'https://picsum.photos/seed/kfc/200/100' },
  { name: 'TropiBurger', logo: 'https://picsum.photos/seed/burger/200/100' },
  { name: 'American Park', logo: 'https://picsum.photos/seed/park/200/100' },
  { name: 'Bell Screen', logo: 'https://picsum.photos/seed/bell/200/100' },
  { name: 'Aldeano', logo: 'https://picsum.photos/seed/aldeano/200/100' },
  { name: 'Hello Kitty', logo: 'https://picsum.photos/seed/kitty/200/100' },
  { name: 'Moovin', logo: 'https://picsum.photos/seed/moovin/200/100' },
  { name: 'MaskeFood', logo: 'https://picsum.photos/seed/maskefood/200/100' },
  { name: 'DavisaViajes', logo: 'https://picsum.photos/seed/travel/200/100' },
  { name: 'Scady', logo: 'https://picsum.photos/seed/scady/200/100' },
  { name: 'Berriot Corp', logo: 'https://picsum.photos/seed/corp/200/100' },
  { name: 'Urban Society', logo: 'https://picsum.photos/seed/urban/200/100' },
];

const STAND_PRICES = [
  { name: 'Stand Intermedio', size: '3x2.40', price: '$690', color: 'bg-blue-500' },
  { name: 'Stand Enlace esq.', size: '2.50x2.40', price: '$747.50', color: 'bg-purple-500' },
  { name: 'Stand VIP Esquinero', size: 'VIP', price: '$847.50', color: 'bg-expo-red' },
  { name: 'Carpa', size: '3x3', price: '$700', color: 'bg-expo-orange' },
  { name: 'Área Vehículos Zona B', size: 'm²', price: '$50 x m²', color: 'bg-green-500' },
  { name: 'Área Vehículos Zona A', size: 'm²', price: '$60 x m²', color: 'bg-emerald-600' },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
  "https://images.unsplash.com/photo-1514525253361-bee8718a340b",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1472712739516-7ad2b786e1f7",
  "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
];

// --- Sub-components ---

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('April 3, 2026 00:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference < 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const labels: Record<string, string> = {
    days: 'DAYS',
    hours: 'HOURS',
    minutes: 'MINUTES',
    seconds: 'SECONDS'
  };

  return (
    <div className="flex gap-4 md:gap-6 justify-center mt-12">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-28 md:h-28 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
            <span className="text-3xl md:text-6xl font-black text-white">{value}</span>
          </div>
          <span className="text-[10px] md:text-xs font-black text-expo-yellow uppercase tracking-[0.2em] mt-3 drop-shadow-md">{labels[unit]}</span>
        </div>
      ))}
    </div>
  );
};

const Confetti = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="confetti-particle"
          initial={{ top: -20, left: `${Math.random() * 100}%`, opacity: 1 }}
          animate={{ 
            top: '120%', 
            left: `${Math.random() * 100}%`,
            rotate: 360,
            opacity: 0 
          }}
          transition={{ 
            duration: 5 + Math.random() * 5, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "linear"
          }}
          style={{ backgroundColor: ['#f39200', '#ffcc00', '#e6007e', '#009ee3'][Math.floor(Math.random() * 4)] }}
        />
      ))}
    </div>
  );
};

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', stand: '', sector: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else setIsSuccess(true);
  };

  if (isSuccess) return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
      <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6" />
      <h3 className="text-3xl font-black text-expo-red mb-2">¡REGISTRO EXITOSO!</h3>
      <p className="text-slate-600">Un asesor se contactará contigo en breve.</p>
      <button onClick={() => {setIsSuccess(false); setStep(1);}} className="mt-8 text-expo-red font-bold underline">Volver a empezar</button>
    </motion.div>
  );

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-stone-100 max-w-2xl mx-auto">
      <div className="flex items-center mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-1 items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'step-active' : 'step-inactive'}`}>{s}</div>
            {s < 3 && <div className={`step-line ${step > s ? 'step-line-active' : ''}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
            <h4 className="text-xl font-black text-expo-red">Paso 1: Datos Personales</h4>
            <input required type="text" placeholder="Nombre completo" className="w-full p-4 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:border-expo-red transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required type="email" placeholder="Correo electrónico" className="w-full p-4 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:border-expo-red transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <input required type="tel" placeholder="Teléfono / WhatsApp" className="w-full p-4 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:border-expo-red transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
            <h4 className="text-xl font-black text-expo-red">Paso 2: Detalles del Stand</h4>
            <select required className="w-full p-4 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:border-expo-red transition-all" value={formData.stand} onChange={e => setFormData({...formData, stand: e.target.value})}>
              <option value="">Selecciona tipo de stand</option>
              {STAND_PRICES.map(s => <option key={s.name} value={s.name}>{s.name} - {s.price}</option>)}
            </select>
            <select required className="w-full p-4 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:border-expo-red transition-all" value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})}>
              <option value="">Selecciona sector</option>
              <option value="Empresas">Empresas</option>
              <option value="Gastronomía">Gastronomía</option>
              <option value="Automotriz">Automotriz</option>
              <option value="Artesanías">Artesanías</option>
            </select>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
            <h4 className="text-xl font-black text-expo-red">Paso 3: Confirmación</h4>
            <div className="bg-stone-50 p-6 rounded-2xl space-y-2 text-slate-600">
              <p><strong>Nombre:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Stand:</strong> {formData.stand}</p>
              <p><strong>Sector:</strong> {formData.sector}</p>
            </div>
          </motion.div>
        )}
        <div className="flex gap-4 pt-4">
          {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="flex-1 p-4 rounded-xl font-bold border border-stone-200 hover:bg-stone-50 transition-all">Atrás</button>}
          <button type="submit" className="flex-1 festive-button p-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2">
            {step === 3 ? 'Enviar Registro' : 'Siguiente'} <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`py-24 ${className}`}
    >
      {children}
    </motion.section>
  );

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* WhatsApp Float */}
      <a href="https://wa.me/593991115567" target="_blank" className="whatsapp-float bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all pulsing-button">
        <MessageCircle size={32} />
      </a>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#c41230] py-2 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3 w-1/4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-inner">
              <span className="text-expo-red font-black text-2xl">EC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-display font-black text-xl tracking-tighter leading-none">EXPO FERIA CUENCA</span>
              <span className="text-expo-yellow font-bold text-[10px] tracking-[0.2em] leading-none">LA FERIA DE TODOS</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center justify-center gap-8 text-white font-bold text-sm uppercase tracking-widest flex-1">
            {['Inicio', 'Mapa', 'Precios', 'Expositores', 'Galería'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-expo-yellow transition-colors">{item}</a>
            ))}
          </div>

          <div className="flex justify-end items-center gap-4 w-1/4">
            <button className="hidden lg:block festive-button px-6 py-2 rounded-full text-xs font-black pulsing-button">SER EXPOSITOR</button>
            <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-40 bg-[#c41230] flex flex-col items-center justify-center gap-8 text-white text-2xl font-black uppercase tracking-widest">
            {['Inicio', 'Mapa', 'Precios', 'Expositores', 'Galería'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}>{item}</a>
            ))}
            <button className="festive-button px-10 py-4 rounded-full">SER EXPOSITOR</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center hero-parallax overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#990000]/80 via-[#990000]/40 to-[#990000]/90" />
        <Confetti />
        <motion.div style={{ y: heroY }} className="relative z-10 text-center px-4 pt-20">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
            <span className="bg-expo-yellow text-expo-red font-black px-8 py-3 rounded-full text-sm md:text-lg uppercase tracking-[0.3em] mb-12 inline-block shadow-2xl border-2 border-white/20">3 AL 12 DE ABRIL 2026</span>
            <h1 className="text-white font-display font-black text-6xl md:text-[11rem] mb-8 leading-[0.85] tracking-tighter drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]">
              EXPO FERIA <br /> <span className="text-expo-yellow">CUENCA 2026</span>
            </h1>
            <p className="text-white/90 text-xl md:text-4xl font-bold max-w-4xl mx-auto mb-16 drop-shadow-lg leading-tight">¡La fiesta más grande de la región te espera en Totoracocha!</p>
          </motion.div>
          <Countdown />
          <div className="mt-20 flex flex-wrap justify-center gap-6">
            <button className="festive-button px-16 py-8 rounded-full font-black text-2xl flex items-center gap-4 group shadow-[0_20px_50px_rgba(243,146,0,0.3)] hover:scale-105 transition-transform">
              RESERVAR STAND <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Why Expose Section */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-expo-red font-display font-black text-5xl md:text-6xl mb-6">¿Por qué exponer?</h2>
            <div className="w-24 h-2 bg-expo-yellow mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, stat: "+100.000", label: "Visitantes" },
              { icon: Calendar, stat: "10", label: "Días de Feria" },
              { icon: MapPin, stat: "30.000", label: "Metros Cuadrados" },
              { icon: Award, stat: "GRATIS", label: "Entrada al Público" },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="bg-stone-50 p-10 rounded-3xl text-center border-2 border-stone-100 hover:border-expo-yellow transition-all">
                <item.icon size={48} className="text-expo-red mx-auto mb-6" />
                <h3 className="text-4xl font-black text-slate-900 mb-2">{item.stat}</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Interactive Map Section */}
      <Section id="map" className="bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-expo-red font-display font-black text-5xl mb-4">Mapa del Recinto</h2>
            <p className="text-slate-500 font-bold">30.000 m² de pura emoción y negocios</p>
          </div>
          <div className="bg-white p-4 rounded-[3rem] shadow-2xl border-8 border-white overflow-hidden">
            <svg viewBox="0 0 800 500" className="w-full h-auto">
              <rect x="50" y="50" width="300" height="200" rx="20" className="map-sector fill-blue-100 stroke-blue-500 stroke-2" />
              <text x="200" y="160" textAnchor="middle" className="fill-blue-800 font-black text-xl">EMPRESAS</text>
              <rect x="400" y="50" width="350" height="150" rx="20" className="map-sector fill-orange-100 stroke-orange-500 stroke-2" />
              <text x="575" y="135" textAnchor="middle" className="fill-orange-800 font-black text-xl">GASTRONOMÍA</text>
              <rect x="50" y="300" width="400" height="150" rx="20" className="map-sector fill-green-100 stroke-green-500 stroke-2" />
              <text x="250" y="385" textAnchor="middle" className="fill-green-800 font-black text-xl">AUTOMOTRIZ</text>
              <circle cx="600" cy="350" r="80" className="map-sector fill-pink-100 stroke-pink-500 stroke-2" />
              <text x="600" y="355" textAnchor="middle" className="fill-pink-800 font-black text-sm">JUEGOS</text>
              <rect x="480" y="220" width="240" height="60" rx="10" className="map-sector fill-purple-100 stroke-purple-500 stroke-2" />
              <text x="600" y="255" textAnchor="middle" className="fill-purple-800 font-black text-xl">ESCENARIO</text>
            </svg>
          </div>
        </div>
      </Section>

      {/* Brand Carousel */}
      <section className="py-20 bg-white overflow-hidden border-y border-stone-100">
        <div className="carousel-track">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div key={i} className="w-[250px] flex flex-col items-center justify-center px-8">
              <img src={brand.logo} alt={brand.name} className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-500" />
              <span className="text-[10px] font-black text-stone-300 mt-4 uppercase tracking-widest">{brand.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <Section id="precios" className="bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-expo-red font-display font-black text-5xl mb-6">Inversión de Stands</h2>
            <p className="text-slate-500 font-bold">Elige el espacio ideal para tu marca</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STAND_PRICES.map((stand, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-stone-100 group">
                <div className={`${stand.color} p-8 text-white text-center`}>
                  <h3 className="text-2xl font-black mb-2">{stand.name}</h3>
                  <span className="bg-white/20 px-4 py-1 rounded-full text-xs font-bold">{stand.size}</span>
                </div>
                <div className="p-10 text-center">
                  <span className="text-5xl font-black text-slate-900">{stand.price}</span>
                  <ul className="mt-8 space-y-4 text-slate-500 font-medium text-sm">
                    <li className="flex items-center justify-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Iluminación básica</li>
                    <li className="flex items-center justify-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Punto eléctrico 110v</li>
                    <li className="flex items-center justify-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Seguridad 24/7</li>
                  </ul>
                  <button className="mt-10 w-full py-4 rounded-2xl font-black uppercase tracking-widest border-2 border-slate-100 hover:border-expo-red hover:text-expo-red transition-all">Consultar Disponibilidad</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section id="galería" className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-expo-red font-display font-black text-5xl mb-6">Momentos Inolvidables</h2>
            <div className="w-24 h-2 bg-expo-yellow mx-auto rounded-full" />
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="relative rounded-3xl overflow-hidden shadow-xl group">
                <img src={`${img}?q=80&w=800&auto=format&fit=crop`} alt="Gallery" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-8">
                  <Play size={32} className="text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Registration Stepper */}
      <Section id="expositores" className="bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-expo-red font-display font-black text-5xl mb-4">Registro de Expositores</h2>
            <p className="text-slate-500 font-bold">Sé parte de la feria más grande de Cuenca</p>
          </div>
          <RegistrationForm />
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-[#660000] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center p-1"><span className="text-expo-red font-black text-2xl">EC</span></div>
                <div className="flex flex-col">
                  <span className="text-white font-display font-black text-2xl tracking-tighter leading-none">EXPO FERIA CUENCA</span>
                  <span className="text-expo-yellow font-bold text-xs tracking-[0.2em] leading-none">LA FERIA DE TODOS</span>
                </div>
              </div>
              <p className="text-white/70 max-w-md leading-relaxed mb-10 text-lg">Del 3 al 12 de Abril en Totoracocha. La celebración más emblemática de la región.</p>
              <div className="flex gap-5">
                {[Facebook, Youtube, Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-expo-yellow hover:text-expo-red transition-all"><Icon size={22} /></a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-8 text-expo-yellow">CONTACTO</h4>
              <ul className="flex flex-col gap-4 text-white/70 font-bold">
                <li className="flex items-center gap-2"><MessageCircle size={18} /> 099 111 5567</li>
                <li className="flex items-center gap-2"><Send size={18} /> expoferiasec@gmail.com</li>
                <li className="flex items-center gap-2"><ArrowRight size={18} /> www.expoferiacuenca.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-8 text-expo-yellow">AVALES</h4>
              <div className="flex flex-wrap gap-4 opacity-50">
                <span className="border border-white px-4 py-2 rounded-lg font-black text-xl">FDA</span>
                <span className="border border-white px-4 py-2 rounded-lg font-black text-xl">FELAP</span>
                <span className="border border-white px-4 py-2 rounded-lg font-black text-xl">FENOC</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 text-xs text-white/40 font-bold uppercase tracking-widest">
            <span>© EXPO FERIA CUENCA 2026</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-12 h-12 rounded-full bg-expo-yellow text-expo-red flex items-center justify-center hover:scale-110 transition-all shadow-lg mt-6 md:mt-0"><ArrowUp size={24} /></button>
          </div>
        </div>
      </footer>
    </div>
  );
}
