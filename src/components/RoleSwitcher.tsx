import React from "react";
import { UserRole } from "../types";
import { Shield, Sparkles, User, Truck, Utensils, LifeBuoy, Settings } from "lucide-react";

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onRoleChange }) => {
  const roles = [
    { name: UserRole.CUSTOMER, icon: User, color: "from-blue-500 to-indigo-600", desc: "Browse, Order, Book" },
    { name: UserRole.RESTAURANT_OWNER, icon: Utensils, color: "from-emerald-500 to-teal-600", desc: "Manage Menu & Kitchen" },
    { name: UserRole.DELIVERY_PARTNER, icon: Truck, color: "from-amber-500 to-orange-600", desc: "Earnings & GPS Track" },
    { name: UserRole.SUPER_ADMIN, icon: Shield, color: "from-rose-600 to-purple-700", desc: "Full System Analytics" },
    { name: UserRole.CUSTOMER_SUPPORT, icon: LifeBuoy, color: "from-pink-500 to-rose-500", desc: "Chat & Support Tickets" }
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white py-2 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-xs text-slate-400 tracking-wider font-semibold uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            RaahRide Food Developer Sandbox
          </span>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="text-xs font-medium text-slate-400 mr-1.5">Interactive Roles:</span>
          {roles.map((r) => {
            const Icon = r.icon;
            const isSelected = currentRole === r.name;
            return (
              <button
                key={r.name}
                id={`role-btn-${r.name.toLowerCase().replace(" ", "-")}`}
                onClick={() => onRoleChange(r.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  isSelected
                    ? `bg-gradient-to-r ${r.color} text-white shadow-lg shadow-indigo-950 scale-105 border-0`
                    : "bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{r.name}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-1">
          <span className="text-[10px] bg-slate-800 text-slate-400 font-mono px-2 py-0.5 rounded border border-slate-700">
            Active: {currentRole}
          </span>
        </div>
      </div>
    </div>
  );
};
