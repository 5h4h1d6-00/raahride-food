import React, { useState } from "react";
import { Restaurant, FoodItem, Order, TableBooking } from "../types";
import { INITIAL_RESTAURANTS, INITIAL_ORDERS, INITIAL_BOOKINGS } from "../data";
import { Utensils, Sparkles, TrendingUp, DollarSign, Calendar, Clock, Plus, Trash2, CheckCircle, Sliders, ToggleLeft, ToggleRight, MessageSquare, ShieldAlert } from "lucide-react";

export const RestaurantDashboard: React.FC = () => {
  // Tabs: "overview" | "kitchen" | "menu" | "bookings" | "reviews"
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "kitchen" | "menu" | "bookings" | "reviews">("overview");
  
  // State
  const [restaurant, setRestaurant] = useState<Restaurant>(INITIAL_RESTAURANTS[0]); // Default to La Piazza
  const [activeOrders, setActiveOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [bookings, setBookings] = useState<TableBooking[]>(INITIAL_BOOKINGS);

  // Menu editing states
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");

  const handleToggleStock = (itemId: string) => {
    const updatedMenu = restaurant.menu.map((item) =>
      item.id === itemId ? { ...item, inStock: !item.inStock } : item
    );
    setRestaurant({ ...restaurant, menu: updatedMenu });
  };

  const handleUpdatePrice = (itemId: string) => {
    const updatedMenu = restaurant.menu.map((item) =>
      item.id === itemId ? { ...item, price: editPrice } : item
    );
    setRestaurant({ ...restaurant, menu: updatedMenu });
    setEditingItem(null);
    alert("Menu price updated successfully.");
  };

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;

    const newItem: FoodItem = {
      id: `lp-custom-${Date.now()}`,
      name: newItemName,
      price: parseFloat(newItemPrice),
      description: newItemDesc || "Chef's gourmet creation crafted with local organic ingredients.",
      category: "Pasta",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
      rating: 5.0,
      isVegetarian: true,
      isGlutenFree: false,
      isNutFree: true,
      isHalal: true,
      preparationTime: 12,
      inStock: true
    };

    setRestaurant({
      ...restaurant,
      menu: [newItem, ...restaurant.menu]
    });
    setNewItemName("");
    setNewItemPrice("");
    setNewItemDesc("");
    alert("New custom dish added to the live menu catalog.");
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: any) => {
    const updated = activeOrders.map((o) =>
      o.id === orderId ? { ...o, status: nextStatus } : o
    );
    setActiveOrders(updated);
    alert(`Order ${orderId} updated to: ${nextStatus}`);
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "Cancelled" as any } : b
    );
    setBookings(updated);
    alert("Table reservation cancelled.");
  };

  // Metrics calculations
  const totalRevenue = activeOrders
    .filter((o) => o.status === "Completed" || o.status === "Delivering")
    .reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Restaurant Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🍲</span>
              <h1 className="text-xl sm:text-2xl font-black text-white">{restaurant.name} Kitchen Dashboard</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Authorized Owner Portal • Standard Operating Protocol
            </p>
          </div>

          {/* Sub-navigation tabs */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1 flex-wrap">
            {[
              { id: "overview", label: "Overview", icon: TrendingUp },
              { id: "kitchen", label: `Active Kitchen (${activeOrders.filter((o) => o.status !== "Completed" && o.status !== "Cancelled").length})`, icon: Utensils },
              { id: "menu", label: "Menu Editor", icon: Sliders },
              { id: "bookings", label: `Bookings (${bookings.filter((b) => b.status === "Confirmed").length})`, icon: Calendar },
              { id: "reviews", label: "Guest Reviews", icon: MessageSquare }
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveSubTab(t.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeSubTab === t.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------------------------------------
            SUBTAB: OVERVIEW
           ------------------------------------------------------------------------------------------ */}
        {activeSubTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Metric 1 */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Today's Revenue</p>
                <p className="text-2xl font-black text-white mt-1.5">₹{((totalRevenue + 124.50) * 80).toFixed(0)}</p>
                <p className="text-[9px] text-emerald-400 font-mono mt-1">▲ +14.5% vs yesterday</p>
              </div>

              {/* Metric 2 */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Kitchen prep speed</p>
                <p className="text-2xl font-black text-white mt-1.5">14.2 Mins</p>
                <p className="text-[9px] text-emerald-400 font-mono mt-1">🟢 Within SLA limits</p>
              </div>

              {/* Metric 3 */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Seat reservations</p>
                <p className="text-2xl font-black text-white mt-1.5">18 tables</p>
                <p className="text-[9px] text-indigo-400 font-mono mt-1">94% capacity locked</p>
              </div>

              {/* Metric 4 */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Gourmet Score</p>
                <p className="text-2xl font-black text-white mt-1.5">4.8 / 5.0</p>
                <p className="text-[9px] text-slate-500 mt-1">Based on 342 reviews</p>
              </div>
            </div>

            {/* AI Kitchen Efficiency Insights */}
            <div className="bg-gradient-to-r from-indigo-950/30 to-purple-950/20 border border-indigo-900/40 p-5 rounded-2xl">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                AI Kitchen Efficiency Prediction
              </h3>
              <p className="text-xs text-slate-350 leading-relaxed max-w-3xl">
                Based on current table bookings for 07:30 PM (BK-4921) and orders history, we predict a **35% rush-surge in Mutton Rogan Josh demand**. 
                We recommend pre-prepping slow-cooked mutton bases by 06:45 PM to guarantee our **12-minute prep SLA is sustained**.
              </p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------------------------
            SUBTAB: ACTIVE KITCHEN ORDERS
           ------------------------------------------------------------------------------------------ */}
        {activeSubTab === "kitchen" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-150 uppercase tracking-wider">Live cooking queues</h3>
            
            {activeOrders.length === 0 ? (
              <div className="bg-slate-900 border border-slate-850 p-12 text-center rounded-2xl text-slate-500 text-xs">
                No active kitchen orders. Standby mode.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeOrders.map((o) => (
                  <div key={o.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">Order {o.id}</h4>
                        <p className="text-[10px] text-slate-450 mt-0.5">Dest: {o.deliveryAddress}</p>
                      </div>
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-900/50">
                        {o.status}
                      </span>
                    </div>

                    {/* Plates to prep */}
                    <div className="space-y-2 text-xs">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Plates Checklist</p>
                      {o.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                          <div>
                            <p className="font-semibold text-slate-200">{item.quantity}x {item.foodItem.name}</p>
                            {item.selectedAddOns.map((ao) => (
                              <p key={ao.id} className="text-[9px] text-slate-400 mt-0.5">+ Add-on: {ao.name}</p>
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-500">prep: {item.foodItem.preparationTime} mins</span>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-2 text-xs">
                      {o.status === "Preparing" && (
                        <button
                          onClick={() => handleUpdateOrderStatus(o.id, "Delivering")}
                          className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold"
                        >
                          Mark Prepared & Dispatched
                        </button>
                      )}
                      {o.status === "Delivering" && (
                        <button
                          onClick={() => handleUpdateOrderStatus(o.id, "Completed")}
                          className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold"
                        >
                          Confirm Handover Completion
                        </button>
                      )}
                      <button
                        onClick={() => handleUpdateOrderStatus(o.id, "Cancelled")}
                        className="py-1.5 px-3 bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white rounded-lg"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------------------------------
            SUBTAB: MENU EDITOR
           ------------------------------------------------------------------------------------------ */}
        {activeSubTab === "menu" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Active Catalog List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xs font-bold text-slate-150 uppercase tracking-wider">Live menu catalog</h3>
              
              <div className="space-y-3">
                {restaurant.menu.map((food) => (
                  <div
                    key={food.id}
                    className="bg-slate-900 border border-slate-850 p-4 rounded-xl flex items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center gap-4">
                      <img src={food.image} alt={food.name} className="w-14 h-14 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-extrabold text-white">{food.name}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Category: {food.category}</p>
                        <p className="text-[10px] text-indigo-400 font-bold mt-1">₹{food.price.toFixed(0)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Price editing toggle */}
                      {editingItem === food.id ? (
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(parseFloat(e.target.value))}
                            className="w-16 bg-slate-950 border border-slate-800 text-white text-center rounded px-1"
                          />
                          <button
                            onClick={() => handleUpdatePrice(food.id)}
                            className="bg-indigo-600 text-white px-2 py-1 rounded font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingItem(food.id);
                            setEditPrice(food.price);
                          }}
                          className="bg-slate-800 hover:bg-slate-750 text-slate-300 px-2 py-1 rounded"
                        >
                          Edit Price
                        </button>
                      )}

                      {/* Stock availability toggle */}
                      <button
                        onClick={() => handleToggleStock(food.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded font-bold transition-all ${
                          food.inStock
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-900"
                            : "bg-rose-950 text-rose-450 border border-rose-900"
                        }`}
                      >
                        {food.inStock ? "In Stock" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Dish Form */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold text-slate-150 uppercase tracking-wider">Add custom culinary creation</h3>
              
              <form onSubmit={handleAddMenuItem} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Dish Name</label>
                  <input
                    type="text"
                    required
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="e.g. Lobster Fettuccine Saffron"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="e.g. 450"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    placeholder="Describe ingredients, preparation technique, and allergens..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs"
                >
                  Publish to Menu Catalog
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------------------------
            SUBTAB: TABLE BOOKINGS
           ------------------------------------------------------------------------------------------ */}
        {activeSubTab === "bookings" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-150 uppercase tracking-wider">Confirmed guest table reservations</h3>
            
            <div className="space-y-3">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-slate-900 border border-slate-850 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <h4 className="font-extrabold text-white">{b.guestName}</h4>
                    <p className="text-[10px] text-slate-450 mt-0.5">Reference ID: {b.id} • Contacts: {b.guestPhone} • {b.guestEmail}</p>
                    <p className="text-[10px] text-indigo-400 font-bold mt-1">📅 {b.date} @ {b.timeSlot} ({b.guestCount} guests • {b.tableType} Table)</p>
                    
                    {b.specialRequests && b.specialRequests !== "None" && (
                      <p className="text-[10px] text-slate-400 mt-2 italic bg-slate-950 p-2 rounded">
                        💡 Request: "{b.specialRequests}"
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {b.status === "Confirmed" ? (
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        className="py-1 px-3 bg-rose-950/40 hover:bg-rose-950 text-rose-300 font-bold rounded border border-rose-900/40"
                      >
                        Cancel Reservation
                      </button>
                    ) : (
                      <span className="text-slate-500 font-bold italic bg-slate-950 px-2 py-1 rounded">Cancelled</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------------------------
            SUBTAB: GUEST REVIEWS
           ------------------------------------------------------------------------------------------ */}
        {activeSubTab === "reviews" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-150 uppercase tracking-wider">Verified guests feedback</h3>
            
            <div className="space-y-3.5">
              {restaurant.reviews.map((rev) => (
                <div key={rev.id} className="bg-slate-900 border border-slate-850 p-4 rounded-xl text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white">{rev.userName}</span>
                      <span className="text-[10px] text-slate-500 ml-2">{rev.date}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <span key={idx} className="text-amber-400">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
