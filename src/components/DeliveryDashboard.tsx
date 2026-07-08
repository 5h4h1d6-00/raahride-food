import React, { useState } from "react";
import { Order } from "../types";
import { INITIAL_ORDERS } from "../data";
import { Truck, Navigation, DollarSign, User, MapPin, RefreshCw, Smartphone, TrendingUp, CheckCircle, ShieldAlert } from "lucide-react";

export const DeliveryDashboard: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [activeDeliveries, setActiveDeliveries] = useState<Order[]>([
    {
      ...INITIAL_ORDERS[0],
      status: "Dispatched" // Ready for pick up
    }
  ]);
  const [completedEarnings, setCompletedEarnings] = useState([
    { id: "e1", date: "2026-07-07", orderId: "RR-7210", fare: 120.0, tip: 50.0, total: 170.0 },
    { id: "e2", date: "2026-07-06", orderId: "RR-6921", fare: 100.0, tip: 30.0, total: 130.0 }
  ]);

  const handleAcceptOrder = (id: string) => {
    setActiveDeliveries(
      activeDeliveries.map((o) => (o.id === id ? { ...o, status: "Delivering" } : o))
    );
    alert("Dispatch offer accepted. Optimal GPS navigation path locked.");
  };

  const handleRejectOrder = (id: string) => {
    setActiveDeliveries(activeDeliveries.filter((o) => o.id !== id));
    alert("Offer rejected. Routing back to adjacent drivers.");
  };

  const handleMarkDelivered = (id: string) => {
    const order = activeDeliveries.find((o) => o.id === id);
    if (!order) return;

    // Simulate entering code 5912
    const codeInput = prompt("Verify customer handover passcode to secure payment:");
    if (codeInput === "5912") {
      // Add to earnings
      const fare = 120.00;
      const tip = order.tip || 40.00;
      const totalEarned = fare + tip;
      
      setCompletedEarnings([
        {
          id: `e-${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
          orderId: order.id,
          fare,
          tip,
          total: totalEarned
        },
        ...completedEarnings
      ]);

      setActiveDeliveries(activeDeliveries.filter((o) => o.id !== id));
      alert(`Handover secured! Earnings of ₹${totalEarned.toFixed(0)} credited to your driver wallet.`);
    } else {
      alert("Verification mismatch. Ensure the customer provides the passcode '5912'.");
    }
  };

  const totalEarnings = completedEarnings.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header and Online Switch */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Truck className="w-6 h-6 text-indigo-400" />
              RaahRide Telemetry Driver App
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Active Driver Node: dr-101 (Bilal Ahmad)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400">Duty Protocol:</span>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                isOnline
                  ? "bg-emerald-950 border-emerald-900 text-emerald-400"
                  : "bg-slate-900 border-slate-800 text-slate-500"
              }`}
            >
              {isOnline ? "● ONLINE & ROUTING" : "○ OFFLINE"}
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------------------------------------
            DUTY STATE METRICS
           ------------------------------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Driver Wallet balance</p>
            <p className="text-2xl font-black text-white mt-1.5">₹{totalEarnings.toFixed(0)}</p>
            <button
              onClick={() => {
                alert(`Corporate request submitted. Transferring ₹${totalEarnings.toFixed(0)} to your bank...`);
                setCompletedEarnings([]);
              }}
              disabled={totalEarnings === 0}
              className="text-[10px] text-indigo-400 hover:underline font-semibold mt-2.5 block text-left"
            >
              Withdraw Balance ➔
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Weekly ratings</p>
            <p className="text-2xl font-black text-white mt-1.5">⭐⭐⭐⭐⭐ 4.98</p>
            <p className="text-[9px] text-slate-500 mt-1">Excellent performance bracket</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Completed dispatches</p>
            <p className="text-2xl font-black text-white mt-1.5">{completedEarnings.length} orders</p>
            <p className="text-[9px] text-emerald-400 mt-1">100% acceptance compliance</p>
          </div>
        </div>

        {/* ------------------------------------------------------------------------------------------
            ACTIVE JOBS QUEUE
           ------------------------------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Job detail (Col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-slate-150 uppercase tracking-wider">Assigned dispatch tasks</h3>

            {!isOnline ? (
              <div className="bg-slate-900 border border-slate-850 p-12 text-center rounded-2xl text-slate-500 text-xs">
                You are currently offline. Toggle online status to receive dispatch routing vectors.
              </div>
            ) : activeDeliveries.length === 0 ? (
              <div className="bg-slate-900 border border-slate-850 p-12 text-center rounded-2xl text-slate-500 text-xs">
                Scanning coordinates. No pending dispatches in your sub-sector.
              </div>
            ) : (
              <div className="space-y-6">
                {activeDeliveries.map((job) => (
                  <div key={job.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="text-md font-bold text-white">Order {job.id}</h4>
                        <span className="text-[10px] bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-900 font-bold">
                          {job.status}
                        </span>
                      </div>
                      <div className="text-right text-xs">
                        <p className="text-slate-500 uppercase font-bold text-[9px]">Est. Earnings</p>
                        <p className="font-black text-white text-sm">₹{(120 + (job.tip || 40)).toFixed(0)}</p>
                      </div>
                    </div>

                    {/* Pickup / Dropoff details */}
                    <div className="space-y-3.5 text-xs">
                      <div className="flex items-start gap-2.5">
                        <span className="text-lg">🏢</span>
                        <div>
                          <p className="text-[9px] uppercase font-bold text-slate-500">Pickup kitchen</p>
                          <p className="font-bold text-white mt-0.5">{job.restaurantName}</p>
                          <p className="text-slate-400 text-[10px]">{job.restaurantName === "Ahdoos Traditional Restaurant" ? "Residency Road, Srinagar" : "Dal Lake Boulevard, Srinagar"}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="text-lg">📍</span>
                        <div>
                          <p className="text-[9px] uppercase font-bold text-slate-550">Dropoff Customer Destination</p>
                          <p className="font-bold text-white mt-0.5">{job.deliveryAddress}</p>
                          <p className="text-slate-400 text-[10px]">Contact Name: Shahid Saleem</p>
                        </div>
                      </div>
                    </div>

                    {/* Dispatch action buttons */}
                    <div className="flex gap-2 pt-4 border-t border-slate-800/60">
                      {job.status === "Dispatched" && (
                        <>
                          <button
                            onClick={() => handleAcceptOrder(job.id)}
                            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs"
                          >
                            Accept Dispatch Offer
                          </button>
                          <button
                            onClick={() => handleRejectOrder(job.id)}
                            className="py-2 px-4 bg-slate-850 hover:bg-slate-800 text-slate-400 rounded-lg text-xs"
                          >
                            Reject Offer
                          </button>
                        </>
                      )}
                      
                      {job.status === "Delivering" && (
                        <button
                          onClick={() => handleMarkDelivered(job.id)}
                          className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5"
                        >
                          🔒 Verify Passcode & Complete Handover
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Earnings ledger (Col-span-1) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-150 uppercase tracking-wider">Accrued Dispatch Ledger</h3>
            
            <div className="space-y-3.5 max-h-96 overflow-y-auto">
              {completedEarnings.map((earn) => (
                <div key={earn.id} className="bg-slate-950 border border-slate-850 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">Order {earn.orderId}</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">Fare: ₹{earn.fare.toFixed(0)} • Tip: ₹{earn.tip.toFixed(0)}</p>
                  </div>
                  <span className="font-bold text-emerald-400 font-mono">+₹{earn.total.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
