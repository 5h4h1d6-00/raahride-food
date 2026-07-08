import React, { useState, useEffect } from "react";
import { UserRole } from "./types";
import { LandingPage } from "./components/LandingPage";
import { CustomerDashboard } from "./components/CustomerDashboard";
import { RestaurantDashboard } from "./components/RestaurantDashboard";
import { DeliveryDashboard } from "./components/DeliveryDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { RoleSwitcher } from "./components/RoleSwitcher";
import { AIChatBot } from "./components/AIChatBot";
import { AuthModal } from "./components/AuthModal";
import { Sparkles, ShoppingBag, ShieldCheck, User, LogOut, Navigation, Menu, X, ArrowRight } from "lucide-react";

export default function App() {
  // Developer Simulation State
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.CUSTOMER);
  
  // Navigation State
  // "landing" | "customer" | "restaurant" | "delivery" | "admin" | "support"
  const [currentView, setCurrentView] = useState<"landing" | "customer" | "restaurant" | "delivery" | "admin" | "support">("landing");

  // Filter pass-through from Landing Page
  const [landingSearchQuery, setLandingSearchQuery] = useState("");
  const [landingCategory, setLandingCategory] = useState("");

  // Simulated Account State
  const [userName, setUserName] = useState<string | null>("Shahid Saleem");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Synchronize Active view when developer switches roles
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === UserRole.CUSTOMER) {
      setCurrentView("customer");
    } else if (role === UserRole.RESTAURANT_OWNER || role === UserRole.RESTAURANT_STAFF) {
      setCurrentView("restaurant");
    } else if (role === UserRole.DELIVERY_PARTNER) {
      setCurrentView("delivery");
    } else if (role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN) {
      setCurrentView("admin");
    } else if (role === UserRole.CUSTOMER_SUPPORT) {
      setCurrentView("landing"); // Or any general view
    } else {
      setCurrentView("landing");
    }
  };

  // Callback when user searches/explores on the Landing Page
  const handleLandingExplore = (category?: string, searchTerm?: string) => {
    setLandingCategory(category || "");
    setLandingSearchQuery(searchTerm || "");
    setCurrentRole(UserRole.CUSTOMER);
    setCurrentView("customer");
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    setUserName(null);
    setCurrentRole(UserRole.GUEST);
    setCurrentView("landing");
    alert("Sandbox session cleared. Logged out.");
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Developer Sandbox Bar */}
      <RoleSwitcher currentRole={currentRole} onRoleChange={handleRoleChange} />

      {/* 2. Premium Navigation Header */}
      <header className="sticky top-[53px] md:top-[45px] lg:top-[38px] z-40 bg-slate-950/80 backdrop-blur border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          
          {/* Logo & Platform Name */}
          <button
            onClick={() => {
              setCurrentView("landing");
              setLandingCategory("");
              setLandingSearchQuery("");
            }}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-950/40 group-hover:scale-105 transition-all">
              R
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-wide text-white flex items-center gap-1">
                RaahRide <span className="text-indigo-400">Food</span>
              </span>
              <p className="text-[9px] text-slate-500 font-mono leading-none">Enterprise Gastronomy</p>
            </div>
          </button>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
            <button
              onClick={() => {
                setCurrentView("landing");
                setLandingCategory("");
                setLandingSearchQuery("");
              }}
              className={`hover:text-white transition-all ${currentView === "landing" ? "text-white" : "text-slate-400"}`}
            >
              Curated Landing
            </button>
            <button
              onClick={() => {
                setCurrentRole(UserRole.CUSTOMER);
                setCurrentView("customer");
              }}
              className={`hover:text-white transition-all ${currentView === "customer" ? "text-white" : "text-slate-400"}`}
            >
              Order Foods
            </button>
            <button
              onClick={() => {
                setCurrentRole(UserRole.RESTAURANT_OWNER);
                setCurrentView("restaurant");
              }}
              className={`hover:text-white transition-all ${currentView === "restaurant" ? "text-white" : "text-slate-400"}`}
            >
              Kitchens Portal
            </button>
            <button
              onClick={() => {
                setCurrentRole(UserRole.DELIVERY_PARTNER);
                setCurrentView("delivery");
              }}
              className={`hover:text-white transition-all ${currentView === "delivery" ? "text-white" : "text-slate-400"}`}
            >
              Driver Telemetry
            </button>
          </nav>

          {/* Account and Auth Controls */}
          <div className="hidden md:flex items-center gap-3">
            {userName ? (
              <div className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 p-1.5 pl-3 rounded-xl">
                <div className="text-left">
                  <p className="text-[10px] font-black text-white">{userName}</p>
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">{currentRole}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-850 hover:text-rose-400 transition-all cursor-pointer"
                  title="Logout Session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-950 transition-all cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-900 p-4 space-y-3.5 text-xs">
            <button
              onClick={() => {
                setCurrentView("landing");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left text-slate-400 hover:text-white py-1 font-semibold"
            >
              Curated Landing
            </button>
            <button
              onClick={() => {
                setCurrentRole(UserRole.CUSTOMER);
                setCurrentView("customer");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left text-slate-400 hover:text-white py-1 font-semibold"
            >
              Order Foods
            </button>
            <button
              onClick={() => {
                setCurrentRole(UserRole.RESTAURANT_OWNER);
                setCurrentView("restaurant");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left text-slate-400 hover:text-white py-1 font-semibold"
            >
              Kitchens Portal
            </button>
            <button
              onClick={() => {
                setCurrentRole(UserRole.DELIVERY_PARTNER);
                setCurrentView("delivery");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left text-slate-400 hover:text-white py-1 font-semibold"
            >
              Driver Telemetry
            </button>
            <div className="border-t border-slate-900 pt-3 flex items-center justify-between">
              {userName ? (
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="font-bold text-white">{userName}</p>
                    <p className="text-[9px] text-slate-500 uppercase">{currentRole}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 bg-slate-900 border border-slate-850 rounded-xl text-rose-400"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-indigo-600 text-white font-bold rounded-xl text-center"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 3. Main Route Container */}
      <main className="flex-1">
        {currentView === "landing" && (
          <LandingPage
            onExplore={handleLandingExplore}
            onOpenAuth={() => setIsAuthOpen(true)}
            userName={userName}
          />
        )}

        {currentView === "customer" && (
          <CustomerDashboard
            userName={userName}
            onOpenAuth={() => setIsAuthOpen(true)}
            initialSearchQuery={landingSearchQuery}
            initialCategory={landingCategory}
            onExploreReset={() => {
              setLandingSearchQuery("");
              setLandingCategory("");
            }}
          />
        )}

        {currentView === "restaurant" && <RestaurantDashboard />}

        {currentView === "delivery" && <DeliveryDashboard />}

        {currentView === "admin" && <AdminDashboard />}
      </main>

      {/* 4. Beautiful Corporate Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 px-4 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-medium">© 2026 RaahRide Food Logistics Inc. All rights reserved.</p>
          <div className="flex gap-4 font-semibold">
            <a href="#terms" className="hover:text-slate-300">PCI-Compliance DSS</a>
            <a href="#privacy" className="hover:text-slate-300">Biometric Security Rules</a>
            <a href="#support" className="hover:text-slate-300">Direct SLA Escalations</a>
          </div>
        </div>
      </footer>

      {/* 5. Floating AI Chatbot Concierge */}
      <AIChatBot />

      {/* 6. Multi-Factor Auth Simulation Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(name) => {
          setUserName(name);
          setIsAuthOpen(false);
          alert(`Authentication complete. Logged in as: ${name}`);
        }}
      />
    </div>
  );
}
