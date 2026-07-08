import React, { useState } from "react";
import { INITIAL_RESTAURANTS, POPULAR_CATEGORIES, FAQS } from "../data";
import { Search, Sparkles, MapPin, Percent, Star, Award, TrendingUp, Users, CheckCircle, Smartphone, ArrowRight, StarHalf, Mail } from "lucide-react";

interface LandingPageProps {
  onExplore: (category?: string, searchTerm?: string) => void;
  onOpenAuth: () => void;
  userName?: string | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onOpenAuth, userName }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExplore(undefined, searchQuery);
  };

  const trendingFoods = [
    { name: "Kashmiri Rogan Josh", rest: "Ahdoos Traditional", price: "₹450", rating: 4.9, img: "https://images.unsplash.com/photo-1545247181-516773cae76d?auto=format&fit=crop&w=400&q=80", tag: "Wazwan" },
    { name: "Steamed Tibetan Chicken Momos", rest: "Lhasa Garden Restaurant", price: "₹220", rating: 4.8, img: "https://images.unsplash.com/photo-1625220194771-7ebedd0b7e1c?auto=format&fit=crop&w=400&q=80", tag: "Tibetan" },
    { name: "Charred Tandoori Chicken Tikka Platter", rest: "Imperial Grill Jammu", price: "₹390", rating: 4.8, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80", tag: "Tandoori Grills" }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Premium Animated Hero */}
      <div className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-28 border-b border-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-900/60 text-xs font-semibold text-indigo-400 mb-6 animate-pulse">
            <MapPin className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
            Exclusively Serving Srinagar & Jammu, J&K, India
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-none">
            RaahRide <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">Food</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-lg lg:text-xl mb-8 leading-relaxed">
            Jammu & Kashmir's premier AI-powered gourmet food platform. Book tables and order direct deliveries from iconic local culinary legends across Srinagar and Jammu.
          </p>

          {/* AI Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-12">
            <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-2xl p-1.5 shadow-2xl focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
              <div className="flex items-center gap-2 pl-3 flex-1">
                <Search className="w-5 h-5 text-slate-500 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Describe your craving (e.g. 'authentic mutton rogan josh' or 'steamed chicken momos')..."
                  className="w-full bg-transparent text-slate-150 text-xs sm:text-sm focus:outline-none placeholder-slate-500"
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md shadow-indigo-950 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                AI Search
              </button>
            </div>
            <div className="flex items-center justify-center gap-2.5 mt-3.5 text-xs text-slate-400 flex-wrap">
              <span className="font-semibold text-indigo-400">Popular:</span>
              <button type="button" onClick={() => onExplore("Wazwan")} className="hover:text-white bg-slate-900/50 px-2.5 py-1 rounded border border-slate-800/40">🍲 Wazwan</button>
              <button type="button" onClick={() => onExplore("Tibetan")} className="hover:text-white bg-slate-900/50 px-2.5 py-1 rounded border border-slate-800/40">🥟 Tibetan Momos</button>
              <button type="button" onClick={() => onExplore("Tandoori Grills")} className="hover:text-white bg-slate-900/50 px-2.5 py-1 rounded border border-slate-800/40">🔥 Tandoori Grills</button>
            </div>
          </form>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto bg-slate-900/40 border border-slate-900 rounded-2xl p-6 backdrop-blur">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">5 Elite</p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wide">J&K Partner Kitchens</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">25 Mins</p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wide">Average Terrestrial Delivery</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">100%</p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wide">Table Confirmation Seat Lock</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">4.9/5</p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wide">Local Customer Sentiment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              Gourmet Categories
            </h2>
            <p className="text-xs text-slate-400 mt-1">Direct curated channels tailored to your mood</p>
          </div>
          <button
            onClick={() => onExplore()}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-350 flex items-center gap-1 group"
          >
            Curate All Menu items <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {POPULAR_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onExplore(c.name)}
              className="bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-2xl mb-2.5 block">{c.icon}</span>
              <p className="text-xs font-bold text-slate-200">{c.name}</p>
              <p className="text-[10px] text-slate-500 mt-1">{c.count} items active</p>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-900 bg-gradient-to-b from-slate-950 to-slate-900/30">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Direct Kitchen Partnerships
            </h2>
            <p className="text-xs text-slate-400 mt-1">Exclusive 5-star flagship venues certified by RaahRide Food</p>
          </div>
          <button
            onClick={() => onExplore()}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-350 flex items-center gap-1"
          >
            View Portfolios ➔
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_RESTAURANTS.slice(0, 3).map((r) => (
            <div
              key={r.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
            >
              {/* Cover Photo */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-700/50 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-extrabold text-white flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {r.rating}
                </div>
                <div className="absolute top-3 left-3 bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 rounded-lg text-[10px] font-bold text-white tracking-wide uppercase">
                  Verified Flagship
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{r.logo}</span>
                    <h3 className="text-md font-bold text-white">{r.name}</h3>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {r.description}
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-4 mt-auto">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-4">
                    <span className="flex items-center gap-1">⏱️ {r.deliveryTime}</span>
                    <span className="flex items-center gap-1">🛵 ₹{r.deliveryFee} delivery</span>
                    <span className="flex items-center gap-1">📍 {r.cuisine}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => onExplore(undefined, r.name)}
                      className="py-2 px-3 rounded-lg bg-indigo-650 hover:bg-indigo-600 text-white font-semibold text-xs tracking-wide transition-all"
                    >
                      Browse Menu
                    </button>
                    <button
                      onClick={() => onExplore(undefined, r.name)}
                      className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-250 font-semibold text-xs border border-slate-700 transition-all"
                    >
                      Book Table
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flash Deals / Best Offers */}
      <div className="bg-slate-950 max-w-7xl mx-auto px-4 py-16 border-t border-slate-900">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Percent className="w-5 h-5 text-indigo-400" />
            Active Flash Deals
          </h2>
          <p className="text-xs text-slate-400 mt-1">Limited lunch & dinner vector discounts for instant activation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-indigo-950/80 via-indigo-900/40 to-slate-900 border border-indigo-800/40 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/25 transition-all duration-500" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <span className="bg-indigo-500 text-white font-extrabold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full">Active Code: LAUNCH40</span>
                <h3 className="text-lg sm:text-xl font-black text-white mt-3.5 mb-2">Save 40% on Kashmiri Wazwan</h3>
                <p className="text-xs text-indigo-250 max-w-md leading-relaxed">
                  Apply LAUNCH40 at checkout to receive an instant 40% discount on all authentic Wazwan delicacies ordered from Ahdoos Traditional.
                </p>
              </div>
              <button onClick={() => onExplore(undefined, "Ahdoos Traditional")} className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-white transition-all">
                Activate Offer ➔
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-950/80 via-purple-900/40 to-slate-900 border border-purple-800/40 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/25 transition-all duration-500" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <span className="bg-purple-500 text-white font-extrabold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full">Active Code: HEALTHY20</span>
                <h3 className="text-lg sm:text-xl font-black text-white mt-3.5 mb-2">20% off Royal Kehwa Tea</h3>
                <p className="text-xs text-purple-250 max-w-md leading-relaxed">
                  Redeem on Saffron Kehwa sets at The Chinar Fine Dine to experience pristine mountain refreshments.
                </p>
              </div>
              <button onClick={() => onExplore(undefined, "The Chinar Fine Dine")} className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-purple-400 hover:text-white transition-all">
                Activate Offer ➔
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Membership Banner */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-gradient-to-b from-indigo-500/10 to-transparent blur-xl"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase">RaahRide Premium Club</span>
            <h2 className="text-xl sm:text-3xl font-black text-white mt-4 mb-3">Unlimited Free Delivery in J&K</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Join the premium guild for only ₹399/month. Unlock priority high-altitude reservation slot locking, free delivery on all traditional flagship orders, and 5% instant cashback points.
            </p>
            <button
              onClick={onOpenAuth}
              className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-950 transition-all hover:scale-105"
            >
              Start Free 1-Month Trial
            </button>
          </div>
        </div>
      </div>

      {/* Trending Foods */}
      <div className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-900">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            Trending Hotspot Cravings
          </h2>
          <p className="text-xs text-slate-400 mt-1">Dishes enjoying highest order frequency this past week</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingFoods.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-850 rounded-2xl p-4 flex gap-4 hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <img
                src={t.img}
                alt={t.name}
                className="w-20 h-20 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] bg-slate-950 text-indigo-400 px-2 py-0.5 rounded font-bold border border-slate-800">
                    {t.tag}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1">{t.name}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">By {t.rest}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-extrabold text-indigo-400">{t.price}</span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {t.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Loved by Elite Critics</h2>
          <p className="text-xs text-slate-400 mt-1">What culinary experts think of the RaahRide ecosystem</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Gordon R.", title: "Michelin Food Critic", quote: "The speed of delivery from La Piazza was flawless, and the truffle tagliolini arrived at an optimal temperature." },
            { name: "Jessica M.", title: "Tech Founder", quote: "Table reservations with special requests actually work! We reserved a VIP booth, and they had the anniversary cake ready on sit-down." },
            { name: "Marcus S.", title: "Dietary Coach", quote: "The AI recommendation concierge represents the future. It correctly parsed my nut allergies to output exact menu matches." }
          ].map((t, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
              <p className="text-xs text-slate-300 italic leading-relaxed mb-6">"{t.quote}"</p>
              <div>
                <p className="text-xs font-bold text-white">{t.name}</p>
                <p className="text-[10px] text-indigo-400 mt-0.5">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 py-16 border-t border-slate-900">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-8">Frequently Answered Vectors</h2>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                {faq.q}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-900">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-3xl mx-auto text-center relative overflow-hidden">
          <h2 className="text-lg sm:text-2xl font-bold text-white mb-2">Sub-orbital Gastronomy Dispatches</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            Subscribe to our newsletter for exclusive recipes, chef profiles, and direct promo codes.
          </p>

          {newsletterSubscribed ? (
            <div className="text-center py-2 text-indigo-400 font-bold text-xs flex items-center justify-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Thank you for subscribing! Your first exclusive coupon has been sent.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail) setNewsletterSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter email address..."
                className="flex-1 bg-slate-950 border border-slate-850 text-white rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Beautiful Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3">Enterprise Suite</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white transition-colors">About RaahRide Group</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">Restaurant Portal login</a></li>
              <li><a href="#press" className="hover:text-white transition-colors">Press room</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Work with us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3">Sovereignty</h4>
            <ul className="space-y-2">
              <li><a href="#security" className="hover:text-white transition-colors">AES-256 Encryption Audit</a></li>
              <li><a href="#gdpr" className="hover:text-white transition-colors">GDPR compliance logs</a></li>
              <li><a href="#sla" className="hover:text-white transition-colors">SLA uptime tracking</a></li>
              <li><a href="#status" className="hover:text-white transition-colors">Operational logs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3">Download Hub</h4>
            <ul className="space-y-2">
              <li><a href="#ios" className="hover:text-white transition-colors">Apple iOS app </a></li>
              <li><a href="#android" className="hover:text-white transition-colors">Google Android app</a></li>
              <li><a href="#dev" className="hover:text-white transition-colors">Developer Web API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3">Support Vector</h4>
            <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
              Available 24/7 across J&K. Chat with our live AI support concierge for immediate conflict resolution.
            </p>
            <p className="font-bold text-slate-350">📞 +91 194-RAAH-RIDE</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 border-t border-slate-900 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px]">
            © {new Date().getFullYear()} RaahRide Food Corporation. All rights reserved.
          </p>
          <div className="flex gap-4 font-semibold text-slate-400">
            <a href="#privacy" className="hover:text-white">Privacy Manifesto</a>
            <span>•</span>
            <a href="#terms" className="hover:text-white">Terms of Protocol</a>
            <span>•</span>
            <a href="#cookies" className="hover:text-white">Cookie Preferences</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
