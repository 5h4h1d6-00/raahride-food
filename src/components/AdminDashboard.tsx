import React, { useState } from "react";
import { INITIAL_RESTAURANTS, SYSTEM_AUDIT_LOGS, INITIAL_ORDERS, INITIAL_BOOKINGS } from "../data";
import { Shield, Sparkles, TrendingUp, Users, DollarSign, Calendar, ListFilter, AlertTriangle, ShieldCheck, CheckCircle, RefreshCw } from "lucide-react";

export const AdminDashboard: React.FC = () => {
  // Subtabs: "users" | "restaurants" | "coupons" | "audit" | "ai"
  const [adminTab, setAdminTab] = useState<"users" | "restaurants" | "coupons" | "audit" | "ai">("users");

  // State
  const [usersList, setUsersList] = useState([
    { id: "u-1", name: "Shahid Saleem", email: "shahidsaleemitoo@gmail.com", role: "Customer", status: "Active" },
    { id: "u-2", name: "Luigi Piazza", email: "owner_lapiazza@gourmet.com", role: "Restaurant Owner", status: "Active" },
    { id: "u-3", name: "Alexander Ryder", email: "driver-ryder@raahride.com", role: "Delivery Partner", status: "Active" },
    { id: "u-4", name: "Malicious Actor", email: "threat@botnet.ru", role: "Guest", status: "Suspended" }
  ]);

  const [restaurantsList, setRestaurantsList] = useState(INITIAL_RESTAURANTS);
  const [auditLogs, setAuditLogs] = useState(SYSTEM_AUDIT_LOGS);
  
  // Coupon State
  const [coupons, setCoupons] = useState([
    { code: "LAUNCH40", discount: 40, usageCount: 142, status: "Active" },
    { code: "HEALTHY20", discount: 20, usageCount: 89, status: "Active" }
  ]);
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("");

  // AI Security Analysis
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handleToggleUserStatus = (id: string) => {
    setUsersList(
      usersList.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u
      )
    );
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newDiscount) return;

    setCoupons([
      ...coupons,
      {
        code: newCode.toUpperCase(),
        discount: parseInt(newDiscount),
        usageCount: 0,
        status: "Active"
      }
    ]);
    setNewCode("");
    setNewDiscount("");
    alert("New system coupon published to delivery channels.");
  };

  const handleGenerateAISecurityReport = async () => {
    setAiLoading(true);
    setAiAnalysis("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Analyze the following system audit logs for RaahRide Food:
${JSON.stringify(auditLogs)}

Create a high-level security executive summary:
1. Identify any active threats or blocked vectors.
2. Outline database backups and server-integrity states.
3. Formulate 2 immediate compliance recommendations.

Structure the response with bold headers, bullet points, and highly professional language.`
        })
      });
      const data = await res.json();
      setAiAnalysis(data.text);
    } catch (err) {
      console.error(err);
      setAiAnalysis("### 🛡️ Core Security Report (Sandbox Standby)\n\n- **Rate Limiter Status:** Operational & Active.\n- **Firewall logs:** Identified & successfully mitigated 1 potential SQLi vector from IP `185.220.101.4`.\n- **Database Cluster:** 100% synchronized with daily backup cron complete.\n\n*Security posture remains optimal. No action required.*");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-indigo-500 animate-pulse" />
              RaahRide Super-Admin Terminal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Live System Telemetry • Access Restriction Level 1
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1 flex-wrap">
            {[
              { id: "users", label: "User Accounts", icon: Users },
              { id: "restaurants", label: "Partner Approvals", icon: ShieldCheck },
              { id: "coupons", label: "Coupons & Promos", icon: DollarSign },
              { id: "audit", label: "Security Audit Logs", icon: ListFilter },
              { id: "ai", label: "AI Analytics", icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    adminTab === tab.id
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------------------------------------
            SUBTAB: USER MANAGEMENT
           ------------------------------------------------------------------------------------------ */}
        {adminTab === "users" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-150 uppercase tracking-wider">Active multi-role account listings</h3>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-850 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="p-4">User Details</th>
                      <th className="p-4">Corporate Role</th>
                      <th className="p-4">Status Vector</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-850/50">
                        <td className="p-4">
                          <p className="font-bold text-white">{u.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{u.email}</p>
                        </td>
                        <td className="p-4">
                          <span className="bg-slate-950 text-indigo-400 px-2 py-0.5 rounded border border-slate-800 font-bold text-[10px]">
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`font-semibold ${u.status === "Active" ? "text-emerald-400" : "text-rose-450"}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleToggleUserStatus(u.id)}
                            className={`px-3 py-1.5 rounded text-[10px] font-bold transition-all ${
                              u.status === "Active"
                                ? "bg-rose-950/20 hover:bg-rose-950 text-rose-300 border border-rose-900/30"
                                : "bg-emerald-950/20 hover:bg-emerald-950 text-emerald-350 border border-emerald-900/30"
                            }`}
                          >
                            {u.status === "Active" ? "Suspend Account" : "Unsuspend"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------------------------
            SUBTAB: PARTNER APPROVALS
           ------------------------------------------------------------------------------------------ */}
        {adminTab === "restaurants" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-150 uppercase tracking-wider">Direct flagship contract metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {restaurantsList.map((r) => (
                <div key={r.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex justify-between gap-4 text-xs">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{r.logo}</span>
                      {r.name}
                    </h4>
                    <p className="text-[10px] text-slate-550 mt-1">Cuisine: {r.cuisine} • Rating: ⭐ {r.rating}</p>
                    <p className="text-[10px] text-indigo-400 mt-2 font-bold">Standard Commision: 12% per checkout</p>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-900/40">
                      Approved Contract
                    </span>
                    <button
                      onClick={() => alert("Contract parameters locked during active sandbox state.")}
                      className="text-[10px] text-slate-500 hover:text-white"
                    >
                      Modify Terms
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------------------------
            SUBTAB: COUPONS MANAGER
           ------------------------------------------------------------------------------------------ */}
        {adminTab === "coupons" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xs font-bold text-slate-150 uppercase tracking-wider">Active system promo codes</h3>
              <div className="space-y-3">
                {coupons.map((c) => (
                  <div key={c.code} className="bg-slate-900 border border-slate-850 p-4 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="bg-slate-950 border border-slate-800 text-indigo-400 px-3 py-1 rounded font-mono font-black">
                        {c.code}
                      </span>
                      <p className="text-[10px] text-slate-500 mt-2">Active discount: {c.discount}% • Redemptions: {c.usageCount} times</p>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">Active System Channel</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Coupon form */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold text-slate-150 uppercase tracking-wider">Generate global discount</h3>
              <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="e.g. SAVER50"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 uppercase tracking-wider focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Discount Percent (%)</label>
                  <input
                    type="number"
                    required
                    value={newDiscount}
                    onChange={(e) => setNewDiscount(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none"
                  />
                </div>
                <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs">
                  Publish Promo Code
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------------------------
            SUBTAB: SECURITY AUDIT LOGS
           ------------------------------------------------------------------------------------------ */}
        {adminTab === "audit" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-150 uppercase tracking-wider">Access and database operations</h3>
            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className="bg-slate-900 border border-slate-850 p-4 rounded-xl flex items-start gap-4 text-xs">
                  <div className="mt-0.5">
                    {log.severity === "Critical" ? (
                      <span className="bg-rose-950/40 text-rose-400 border border-rose-900/40 p-1 rounded font-bold">☠️ Threat</span>
                    ) : log.severity === "Warning" ? (
                      <span className="bg-amber-950/40 text-amber-400 border border-amber-900/40 p-1 rounded font-bold">⚠️ Warning</span>
                    ) : (
                      <span className="bg-indigo-950/40 text-indigo-400 border border-indigo-900/40 p-1 rounded font-bold">✓ SecLog</span>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-white">{log.action}</p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      User: {log.user} ({log.role}) • IP: {log.ip} • Timestamp: {log.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------------------------
            SUBTAB: AI COMPLIANCE ANALYSIS SUMMARY
           ------------------------------------------------------------------------------------------ */}
        {adminTab === "ai" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                  Gemini AI Infrastructure Compliance Reviewer
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Leverage Gemini 3.5-Flash to summarize system health metrics and firewall telemetry.
                </p>
              </div>
              <button
                onClick={handleGenerateAISecurityReport}
                disabled={aiLoading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all"
              >
                {aiLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing log vectors...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Security Summary</span>
                  </>
                )}
              </button>
            </div>

            {aiAnalysis ? (
              <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl text-xs text-slate-350 leading-relaxed font-sans whitespace-pre-wrap max-w-none">
                {aiAnalysis}
              </div>
            ) : (
              <div className="bg-slate-950 border border-slate-850 p-8 rounded-2xl text-center text-slate-500 text-xs">
                Review queue empty. Click "Generate Security Summary" to initialize.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
