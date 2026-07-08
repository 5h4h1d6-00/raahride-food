import React, { useState, useEffect } from "react";
import { Restaurant, FoodItem, Order, TableBooking, OrderItem } from "../types";
import { INITIAL_RESTAURANTS, HELP_TICKETS } from "../data";
import { Star, ShieldAlert, Sparkles, MapPin, Search, Grid, Plus, Minus, Trash, ShoppingBag, BookOpen, Clock, Phone, Navigation, ArrowLeft, RefreshCw, CheckCircle2, ChevronRight, HelpCircle, Gift, DollarSign, Wallet } from "lucide-react";

interface CustomerDashboardProps {
  userName: string | null;
  onOpenAuth: () => void;
  onExploreReset?: () => void;
  initialSearchQuery?: string;
  initialCategory?: string;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  userName,
  onOpenAuth,
  initialSearchQuery = "",
  initialCategory = ""
}) => {
  // Navigation: "browse" | "restaurant" | "cart" | "delivery" | "history" | "wallet" | "support"
  const [currentTab, setCurrentTab] = useState<"browse" | "restaurant" | "cart" | "delivery" | "history" | "wallet" | "support">("browse");
  
  // State
  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  
  // Filter options
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);
  const [filterMaxPrice, setFilterMaxPrice] = useState(50);
  
  // AI Recommendation engine state
  const [aiPreferences, setAiPreferences] = useState("");
  const [aiDietary, setAiDietary] = useState("None");
  const [aiAllergens, setAiAllergens] = useState<string[]>([]);
  const [aiBudget, setAiBudget] = useState("Medium");
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [aiRecLoading, setAiRecLoading] = useState(false);

  // Review Summary AI State
  const [aiReviewSummary, setAiReviewSummary] = useState<any | null>(null);
  const [aiReviewLoading, setAiReviewLoading] = useState(false);

  // Cart
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [driverTip, setDriverTip] = useState(5);
  const [splitPaymentEmails, setSplitPaymentEmails] = useState<string[]>([]);
  const [newSplitEmail, setNewSplitEmail] = useState("");
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);

  // Wallet
  const [walletBalance, setWalletBalance] = useState(15000.0);
  const [rewardPoints, setRewardPoints] = useState(1250);
  const [cashbackBalance, setCashbackBalance] = useState(450.0);
  const [walletTx, setWalletTx] = useState([
    { id: "tx-1", desc: "Refund - Order #RR-8120", amount: 450.0, type: "credit", date: "2026-07-06" },
    { id: "tx-2", desc: "Cashback earned - Order #RR-7210", amount: 120.0, type: "credit", date: "2026-07-07" },
    { id: "tx-3", desc: "Order payment - #RR-7210", amount: -1200.0, type: "debit", date: "2026-07-07" }
  ]);

  // Bookings / Tables State
  const [bookingDate, setBookingDate] = useState("2026-07-09");
  const [bookingTime, setBookingTime] = useState("07:30 PM");
  const [bookingGuests, setBookingGuests] = useState(2);
  const [bookingTableType, setBookingTableType] = useState<"Indoor" | "Outdoor" | "VIP" | "Family">("Indoor");
  const [bookingOccasion, setBookingOccasion] = useState<any>("None");
  const [bookingRequests, setBookingRequests] = useState("");
  const [bookingHistory, setBookingHistory] = useState<TableBooking[]>([
    {
      id: "BK-3810",
      restaurantId: "lhasa-garden",
      restaurantName: "Lhasa Garden Restaurant",
      guestName: userName || "Shahid Saleem",
      guestEmail: "shahidsaleemitoo@gmail.com",
      guestPhone: "+91 94190-32412",
      date: "2026-07-10",
      timeSlot: "08:00 PM",
      guestCount: 2,
      tableType: "Indoor",
      specialOccasion: "Birthday",
      specialRequests: "None",
      status: "Confirmed",
      createdAt: "2026-07-07"
    }
  ]);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState(false);

  // Orders State
  const [ordersHistory, setOrdersHistory] = useState<Order[]>([]);
  const [activeDeliveryOrder, setActiveDeliveryOrder] = useState<Order | null>(null);
  const [deliveryProgress, setDeliveryProgress] = useState(0); // 0 to 100 for SVG map coordinate path

  // Support Help Tickets State
  const [helpTickets, setHelpTickets] = useState<any[]>(HELP_TICKETS);
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [newTicketCategory, setNewTicketCategory] = useState<any>("Delivery delay");
  const [newTicketText, setNewTicketText] = useState("");

  // Sync initial query from landing
  useEffect(() => {
    if (initialSearchQuery) setSearchQuery(initialSearchQuery);
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialSearchQuery, initialCategory]);

  // Filter restaurants/menus
  const getFilteredRestaurants = () => {
    return restaurants.filter((r) => {
      const matchSearch =
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.menu.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCat = selectedCategory ? r.menu.some((item) => item.category === selectedCategory) : true;
      return matchSearch && matchCat;
    });
  };

  // Generate AI Recommendations
  const handleGenerateAIRecommendations = async () => {
    setAiRecLoading(true);
    try {
      const res = await fetch("/api/ai-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferences: aiPreferences,
          diet: aiDietary,
          allergens: aiAllergens,
          budget: aiBudget
        })
      });
      const data = await res.json();
      setAiRecommendations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setAiRecLoading(false);
    }
  };

  // Summarize Restaurant Reviews via AI
  const handleSummarizeReviews = async (rName: string, reviews: any[]) => {
    setAiReviewLoading(true);
    setAiReviewSummary(null);
    try {
      const res = await fetch("/api/ai-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurantName: rName, reviews })
      });
      const data = await res.json();
      setAiReviewSummary(data);
    } catch (err) {
      console.error(err);
    } finally {
      setAiReviewLoading(false);
    }
  };

  // Cart operations
  const addToCart = (item: FoodItem, isAiAdded: boolean = false) => {
    const existing = cartItems.find((ci) => ci.foodItem.id === item.id);
    if (existing) {
      setCartItems(
        cartItems.map((ci) =>
          ci.foodItem.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        )
      );
    } else {
      setCartItems([...cartItems, { foodItem: item, quantity: 1, selectedAddOns: [] }]);
    }
    // Simple UI alert
    alert(`Success: Added ${item.name} to checkout basket.`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(
      cartItems
        .map((ci) => {
          if (ci.foodItem.id === id) {
            const nextQ = ci.quantity + delta;
            return { ...ci, quantity: nextQ };
          }
          return ci;
        })
        .filter((ci) => ci.quantity > 0)
    );
  };

  const applyCoupon = () => {
    if (promoCode.toUpperCase() === "LAUNCH40") {
      setDiscountPercent(40);
      alert("PROMO REDEEMED: 40% discount successfully locked in.");
    } else if (promoCode.toUpperCase() === "HEALTHY20") {
      setDiscountPercent(20);
      alert("PROMO REDEEMED: 20% discount successfully locked in.");
    } else {
      alert("Invalid coupon code. Try using LAUNCH40 or HEALTHY20");
    }
  };

  const getCartTotals = () => {
    const subtotal = cartItems.reduce((acc, ci) => acc + ci.foodItem.price * ci.quantity, 0);
    const tax = subtotal * 0.05; // 5% J&K state tax
    const discount = subtotal * (discountPercent / 100);
    const total = subtotal + tax + 40 + driverTip - discount;
    return { subtotal, tax, discount, total };
  };

  const handleCheckout = () => {
    if (!userName) {
      onOpenAuth();
      return;
    }
    if (cartItems.length === 0) return;

    const totals = getCartTotals();
    if (walletBalance < totals.total) {
      alert("Insufficient wallet credits. Please top up your sandbox wallet first.");
      return;
    }

    const rest = selectedRestaurant || restaurants[0];
    const newOrder: Order = {
      id: `RR-${Math.floor(1000 + Math.random() * 9000)}`,
      restaurantId: rest.id,
      restaurantName: rest.name,
      items: [...cartItems],
      subtotal: totals.subtotal,
      deliveryFee: 40,
      tip: driverTip,
      tax: totals.tax,
      discount: totals.discount,
      total: totals.total,
      status: "Preparing",
      deliveryAddress: "Srinagar Residency, Gupkar Road, Srinagar, Jammu & Kashmir",
      paymentMethod: "RaahRide Corporate Wallet",
      orderType: "Instant",
      timestamp: new Date().toISOString(),
      driverName: "Bilal Ahmad",
      driverPhone: "+91 99060-12845"
    };

    // Deduct from wallet & add rewards
    setWalletBalance(walletBalance - totals.total);
    setRewardPoints(rewardPoints + Math.floor(totals.total * 10));
    setCashbackBalance(cashbackBalance + totals.total * 0.05); // 5% cashback

    setOrdersHistory([newOrder, ...ordersHistory]);
    setActiveDeliveryOrder(newOrder);
    setCartItems([]);
    setCheckoutCompleted(true);
    setDeliveryProgress(0);
    setCurrentTab("delivery");

    // Launch simulated live GPS movement
    let prog = 0;
    const interval = setInterval(() => {
      prog += 5;
      setDeliveryProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        newOrder.status = "Completed";
        setOrdersHistory((prev) =>
          prev.map((o) => (o.id === newOrder.id ? { ...o, status: "Completed" } : o))
        );
      }
    }, 2500);
  };

  // Book a Table
  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName) {
      onOpenAuth();
      return;
    }
    const rest = selectedRestaurant || restaurants[0];
    const newBooking: TableBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      restaurantId: rest.id,
      restaurantName: rest.name,
      guestName: userName,
      guestEmail: "shahidsaleemitoo@gmail.com",
      guestPhone: "+91 94190-32412",
      date: bookingDate,
      timeSlot: bookingTime,
      guestCount: bookingGuests,
      tableType: bookingTableType,
      specialOccasion: bookingOccasion,
      specialRequests: bookingRequests || "None",
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };

    setBookingHistory([newBooking, ...bookingHistory]);
    setBookingSuccessMsg(true);
    setTimeout(() => {
      setBookingSuccessMsg(false);
      setCurrentTab("history");
    }, 2000);
  };

  // Submit support ticket
  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim()) return;

    const newTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      userName: userName || "Guest Guest",
      subject: newTicketSubject,
      category: newTicketCategory,
      status: "Open",
      timestamp: new Date().toISOString(),
      messages: [
        { sender: "User", text: newTicketText, timestamp: new Date().toISOString() }
      ]
    };

    setHelpTickets([newTicket, ...helpTickets]);
    setNewTicketSubject("");
    setNewTicketText("");
    alert("Support dispatch confirmed. Agent queue locked.");
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Tabs for customer dashboard */}
        <div className="flex border-b border-slate-800 mb-6 gap-2 flex-wrap pb-3">
          {[
            { id: "browse", label: "Gourmet Markets", icon: Grid },
            { id: "cart", label: `Checkout Basket (${cartItems.reduce((a, c) => a + c.quantity, 0)})`, icon: ShoppingBag },
            { id: "delivery", label: activeDeliveryOrder ? "🔴 GPS Dispatch Track" : "GPS Dispatch Track", icon: Navigation },
            { id: "history", label: "Order & Table History", icon: BookOpen },
            { id: "wallet", label: `Corporate Wallet (₹${walletBalance.toFixed(0)})`, icon: Wallet },
            { id: "support", label: "Security & Support Help", icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all border ${
                  currentTab === tab.id
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-lg"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ------------------------------------------------------------------------------------------
            TAB: BROWSE RESTAURANTS & CURATE FOODS
           ------------------------------------------------------------------------------------------ */}
        {currentTab === "browse" && !selectedRestaurant && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters & AI Suggestion Engine Side Panel */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Premium AI Recommendation Panel */}
              <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/20 border border-indigo-850/60 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 animate-spin" />
                    AI Concierge Suggestion
                  </h3>
                  <p className="text-[10px] text-indigo-300 mt-1 leading-relaxed">
                    Generate bespoke food matches computed by Gemini 3.5-Flash based on your biometric/dietary parameters.
                  </p>

                  <div className="space-y-3.5 mt-4 text-xs">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                        Cravings & Mood
                      </label>
                      <input
                        type="text"
                        value={aiPreferences}
                        onChange={(e) => setAiPreferences(e.target.value)}
                        placeholder="e.g. something savory, rich, comfort food..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                        Dietary Restriction
                      </label>
                      <select
                        value={aiDietary}
                        onChange={(e) => setAiDietary(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="None">No restriction</option>
                        <option value="Vegan">100% Vegan (Plant-Based)</option>
                        <option value="Gluten-Free">Strict Gluten-Free</option>
                        <option value="Keto">Low Carb / Keto</option>
                        <option value="Halal">Halal Certified Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                        Allergens to exclude
                      </label>
                      <div className="flex gap-2 flex-wrap mt-1">
                        {["Nuts", "Dairy", "Gluten", "Soy"].map((allergen) => {
                          const has = aiAllergens.includes(allergen);
                          return (
                            <button
                              type="button"
                              key={allergen}
                              onClick={() => {
                                if (has) setAiAllergens(aiAllergens.filter((a) => a !== allergen));
                                else setAiAllergens([...aiAllergens, allergen]);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                                has
                                  ? "bg-rose-950 border-rose-800 text-rose-300"
                                  : "bg-slate-950 border-slate-850 text-slate-450 hover:bg-slate-900"
                              }`}
                            >
                              {allergen}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      onClick={handleGenerateAIRecommendations}
                      disabled={aiRecLoading}
                      className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold rounded-lg text-[11px] flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/40"
                    >
                      {aiRecLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Computing gastronomy vectors...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Generate Bespoke Matches</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Standard filter panel */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Refinement parameters</h4>
                <div className="space-y-2.5 text-xs">
                  <label className="flex items-center gap-2 text-slate-350 cursor-pointer hover:text-white">
                    <input
                      type="checkbox"
                      checked={filterVegOnly}
                      onChange={(e) => setFilterVegOnly(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-850 text-indigo-500 focus:ring-0"
                    />
                    Vegetarian / Green Only
                  </label>
                  <label className="flex items-center gap-2 text-slate-350 cursor-pointer hover:text-white">
                    <input
                      type="checkbox"
                      checked={filterGlutenFree}
                      onChange={(e) => setFilterGlutenFree(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-850 text-indigo-500 focus:ring-0"
                    />
                    Celiac / Gluten-Free Only
                  </label>
                </div>
              </div>
            </div>

            {/* Restaurants Display Grid */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Category selector row */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    !selectedCategory
                      ? "bg-slate-100 text-slate-950"
                      : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                  }`}
                >
                  All Cuisine Channels
                </button>
                {["Wazwan", "Tibetan", "Tandoori Grills", "Royal Kahwa", "Traditional Desserts"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? "bg-slate-100 text-slate-950"
                        : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* AI Custom generated response list */}
              {aiRecommendations.length > 0 && (
                <div className="bg-gradient-to-r from-indigo-950/20 via-slate-900 to-indigo-950/20 border border-indigo-900/40 rounded-2xl p-5 relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Gemini Bespoke Gastronomy Recommendations
                    </h3>
                    <button
                      onClick={() => setAiRecommendations([])}
                      className="text-[10px] text-slate-500 hover:text-white"
                    >
                      Clear Recommendation
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {aiRecommendations.map((rec, i) => (
                      <div key={i} className="bg-slate-950 border border-slate-850 rounded-xl p-4 flex flex-col justify-between h-full relative">
                        <div>
                          <p className="text-[10px] font-mono text-indigo-400 font-bold mb-1 uppercase tracking-wide">
                            {rec.restaurant}
                          </p>
                          <h4 className="text-xs font-extrabold text-white leading-tight mb-1.5">{rec.dishName}</h4>
                          <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed mb-3">{rec.description}</p>
                        </div>
                        <div>
                          <div className="bg-indigo-950/40 border border-indigo-900/30 p-2 rounded text-[9px] text-indigo-300 leading-relaxed mb-3 italic">
                            💡 {rec.matchingFactor}
                          </div>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-xs font-black text-indigo-400">₹{rec.price}</span>
                            <button
                              onClick={() => {
                                const dummyFood: FoodItem = {
                                  id: `ai-food-${i}`,
                                  name: rec.dishName,
                                  price: rec.price,
                                  category: "AI Curry",
                                  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
                                  description: rec.description,
                                  rating: 4.9,
                                  isVegetarian: true,
                                  isGlutenFree: true,
                                  isNutFree: true,
                                  isHalal: true,
                                  preparationTime: 15,
                                  inStock: true
                                };
                                addToCart(dummyFood, true);
                              }}
                              className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px]"
                            >
                              Add to Basket
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grid of partner restaurants */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getFilteredRestaurants().map((r) => (
                  <div
                    key={r.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 group flex flex-col"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 bg-slate-900/95 border border-slate-800 backdrop-blur px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 text-white">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        {r.rating}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-xl">{r.logo}</span>
                          <h3 className="text-md font-bold text-white leading-none">{r.name}</h3>
                        </div>
                        <p className="text-xs text-slate-400 font-semibold mb-2">{r.cuisine} Flagship</p>
                        <p className="text-xs text-slate-450 line-clamp-2 leading-relaxed mb-4">
                          {r.description}
                        </p>
                      </div>

                      <div className="border-t border-slate-800/60 pt-4 mt-auto">
                        <div className="flex items-center justify-between text-[10px] text-slate-450 mb-4 font-semibold">
                          <span>🛵 ₹{r.deliveryFee} fee</span>
                          <span>⏱️ {r.deliveryTime}</span>
                          <span>📍 {r.address}</span>
                        </div>
                        <button
                          onClick={() => setSelectedRestaurant(r)}
                          className="w-full py-2 bg-slate-850 hover:bg-slate-800 text-white border border-slate-750 rounded-xl text-xs font-bold tracking-wide transition-all"
                        >
                          Explore Menu & Bookings
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------------------------
            SINGLE RESTAURANT DETAIL VIEW: MENU & RESERVATIONS
           ------------------------------------------------------------------------------------------ */}
        {currentTab === "browse" && selectedRestaurant && (
          <div className="space-y-8">
            <button
              onClick={() => {
                setSelectedRestaurant(null);
                setAiReviewSummary(null);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Flagship Markets
            </button>

            {/* Restaurant Profile Cover */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row gap-6">
              <img
                src={selectedRestaurant.image}
                alt={selectedRestaurant.name}
                className="w-full md:w-64 h-44 object-cover rounded-2xl"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{selectedRestaurant.logo}</span>
                    <h2 className="text-xl sm:text-2xl font-black text-white">{selectedRestaurant.name}</h2>
                  </div>
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">{selectedRestaurant.cuisine} Flagship</p>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xl">{selectedRestaurant.description}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800 pt-4 mt-4 text-xs">
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wide">Delivery Vector</p>
                    <p className="font-bold text-white mt-0.5">⏱️ {selectedRestaurant.deliveryTime}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wide">Gourmet Score</p>
                    <p className="font-bold text-white mt-0.5">⭐ {selectedRestaurant.rating} ({selectedRestaurant.reviewsCount} votes)</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wide">Opening Protocol</p>
                    <p className="font-bold text-emerald-400 mt-0.5">🟢 Open Live till 11 PM</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wide">Phone Contact</p>
                    <p className="font-bold text-slate-350 mt-0.5">{selectedRestaurant.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab view inside restaurant: Menu list vs Table reservation calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Menu and Food items (Col-span-2) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                    Signature Menu
                  </h3>
                  <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800 font-bold">
                    {selectedRestaurant.menu.length} plates available
                  </span>
                </div>

                <div className="space-y-4">
                  {selectedRestaurant.menu.map((food) => (
                    <div
                      key={food.id}
                      className="bg-slate-900 border border-slate-850 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 hover:border-slate-800 transition-all"
                    >
                      <img src={food.image} alt={food.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-bold text-white">{food.name}</h4>
                            <span className="text-xs font-black text-indigo-400">₹{food.price.toFixed(0)}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed mt-1">{food.description}</p>
                          
                          {/* Attributes indicators */}
                          <div className="flex gap-2.5 mt-2.5 flex-wrap">
                            {food.isVegetarian && <span className="text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-900 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Vegetarian</span>}
                            {food.isGlutenFree && <span className="text-[8px] bg-amber-950 text-amber-400 border border-amber-900 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Gluten-Free</span>}
                            {food.isNutFree && <span className="text-[8px] bg-blue-950 text-blue-400 border border-blue-900 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Nut-Free</span>}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/40">
                          <span className="text-[10px] text-slate-500">⏱️ prep: {food.preparationTime} min</span>
                          <button
                            onClick={() => addToCart(food)}
                            className="px-3.5 py-1.5 bg-indigo-650 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Basket</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reservations, Tables & AI Review consensus (Col-span-1) */}
              <div className="space-y-6">
                
                {/* AI review summarizer panel */}
                <div className="bg-gradient-to-br from-slate-900 to-indigo-950/20 border border-slate-800 rounded-2xl p-4">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    AI Guest Review Summary
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
                    Analyze standard guest ratings to isolate core culinary performance indicators.
                  </p>

                  {aiReviewSummary ? (
                    <div className="space-y-3.5 text-xs">
                      <div className="flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-850">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">AI Recommendation score</span>
                        <span className="text-emerald-400 font-extrabold text-sm">{aiReviewSummary.aiScore}%</span>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Core Strengths</p>
                        <ul className="list-disc list-inside mt-1 text-[10px] text-slate-300 space-y-0.5">
                          {aiReviewSummary.strengths.map((st: string, idx: number) => (
                            <li key={idx}>{st}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Consensus Paragraph</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed mt-1 italic">
                          "{aiReviewSummary.summaryParagraph}"
                        </p>
                      </div>
                      <button
                        onClick={() => handleSummarizeReviews(selectedRestaurant.name, selectedRestaurant.reviews)}
                        className="text-[10px] text-indigo-400 hover:underline"
                      >
                        Recalculate Summary
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSummarizeReviews(selectedRestaurant.name, selectedRestaurant.reviews)}
                      disabled={aiReviewLoading}
                      className="w-full py-2 bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-indigo-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                    >
                      {aiReviewLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Scanning guest profiles...</span>
                        </>
                      ) : (
                        "Summarize Reviews with AI"
                      )}
                    </button>
                  )}
                </div>

                {/* Secure Table Booking form */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">Book a Table (OpenTable partner)</h4>
                  {bookingSuccessMsg ? (
                    <div className="bg-emerald-950 border border-emerald-900 p-4 rounded-xl text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                      <p className="text-xs font-bold text-white">Table Booking Locked!</p>
                      <p className="text-[10px] text-emerald-350">
                        Check your Corporate History panel for security access codes.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleBookTable} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Date</label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Time Slot</label>
                          <select
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-200 focus:outline-none"
                          >
                            <option value="06:00 PM">06:00 PM</option>
                            <option value="07:00 PM">07:00 PM</option>
                            <option value="07:30 PM">07:30 PM</option>
                            <option value="08:00 PM">08:00 PM</option>
                            <option value="09:00 PM">09:00 PM</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Guest Count</label>
                          <select
                            value={bookingGuests}
                            onChange={(e) => setBookingGuests(parseInt(e.target.value))}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-200 focus:outline-none"
                          >
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="4">4 Guests</option>
                            <option value="6">6 Guests</option>
                            <option value="10">10+ Corporate</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Table Type</label>
                          <select
                            value={bookingTableType}
                            onChange={(e) => setBookingTableType(e.target.value as any)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-200 focus:outline-none"
                          >
                            <option value="Indoor">Indoor Table</option>
                            <option value="Outdoor">Outdoor Patio</option>
                            <option value="VIP">VIP Private Cabana</option>
                            <option value="Family">Large Family Table</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Occasion</label>
                          <select
                            value={bookingOccasion}
                            onChange={(e) => setBookingOccasion(e.target.value as any)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-200 focus:outline-none"
                          >
                            <option value="None">None</option>
                            <option value="Birthday">Birthday Party</option>
                            <option value="Anniversary">Anniversary dinner</option>
                            <option value="Corporate">Corporate luncheon</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Special requests / Allergies</label>
                        <textarea
                          rows={2}
                          value={bookingRequests}
                          onChange={(e) => setBookingRequests(e.target.value)}
                          placeholder="e.g. wheelchair accessibility, candle, flower vase..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none placeholder-slate-600"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all text-xs flex items-center justify-center gap-1.5"
                      >
                        🔒 Confirm Reservation
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------------------------
            TAB: CHECKOUT BASKET & CART
           ------------------------------------------------------------------------------------------ */}
        {currentTab === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Basket Items (Col-span-2) */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-md font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
                Checkout Basket Items
              </h3>

              {cartItems.length === 0 ? (
                <div className="bg-slate-900 border border-slate-850 rounded-2xl p-12 text-center">
                  <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-sm font-bold text-slate-300">Your basket is currently empty</p>
                  <p className="text-xs text-slate-550 mt-1 max-w-sm mx-auto">
                    Explore our Michelin partners and select handcrafted gourmet plates to initialize an order.
                  </p>
                  <button
                    onClick={() => setCurrentTab("browse")}
                    className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs"
                  >
                    Browse Market Menu Items
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((ci) => (
                    <div
                      key={ci.foodItem.id}
                      className="bg-slate-900 border border-slate-850 p-4 rounded-2xl flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img src={ci.foodItem.image} alt={ci.foodItem.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                        <div>
                          <h4 className="text-xs font-extrabold text-white">{ci.foodItem.name}</h4>
                          <p className="text-[10px] text-slate-450 mt-1">Base price: ₹{ci.foodItem.price.toFixed(0)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(ci.foodItem.id, -1)}
                            className="p-1 rounded hover:bg-slate-850 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-white px-3">{ci.quantity}</span>
                          <button
                            onClick={() => updateQuantity(ci.foodItem.id, 1)}
                            className="p-1 rounded hover:bg-slate-850 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-xs font-black text-indigo-400 w-16 text-right">
                          ₹{(ci.foodItem.price * ci.quantity).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Calculations, Split bill & Coupons */}
            <div className="space-y-6">
              
              {/* Checkout Calculation Panel */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">Invoice summary</h4>
                
                {/* Coupon input */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Coupon (LAUNCH40)"
                    className="flex-1 bg-slate-950 border border-slate-850 text-white rounded-lg px-2.5 py-1.5 text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-650"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-white font-bold rounded-lg text-xs"
                  >
                    Apply
                  </button>
                </div>

                <div className="space-y-2.5 text-xs border-b border-slate-800 pb-4 mb-4">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>₹{getCartTotals().subtotal.toFixed(0)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Promo Discount ({discountPercent}%)</span>
                      <span>-₹{getCartTotals().discount.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Tax (5% state fee)</span>
                    <span>₹{getCartTotals().tax.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Gourmet Delivery Fee</span>
                    <span>₹40</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Driver Safety Tip</span>
                    <div className="flex gap-1.5">
                      {[20, 50, 100].map((t) => (
                        <button
                          key={t}
                          onClick={() => setDriverTip(t)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            driverTip === t
                              ? "bg-indigo-650 text-white border-indigo-500"
                              : "bg-slate-950 text-slate-400 border-slate-850"
                          }`}
                        >
                          ₹{t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Split Payment Simulation */}
                <div className="border-b border-slate-800 pb-4 mb-4 space-y-2.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Split corporate bill</p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={newSplitEmail}
                      onChange={(e) => setNewSplitEmail(e.target.value)}
                      placeholder="Add colleague's email..."
                      className="flex-1 bg-slate-950 border border-slate-850 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none placeholder-slate-650"
                    />
                    <button
                      onClick={() => {
                        if (newSplitEmail.trim()) {
                          setSplitPaymentEmails([...splitPaymentEmails, newSplitEmail]);
                          setNewSplitEmail("");
                        }
                      }}
                      className="px-2 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-750 text-xs font-bold"
                    >
                      Add
                    </button>
                  </div>
                  
                  {splitPaymentEmails.length > 0 && (
                    <div className="space-y-1 bg-slate-950 p-2.5 rounded-lg text-[10px] text-slate-400">
                      <p className="font-bold text-slate-300">Shared Splits:</p>
                      {splitPaymentEmails.map((email, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span>{email}</span>
                          <button
                            onClick={() => setSplitPaymentEmails(splitPaymentEmails.filter((_, i) => i !== idx))}
                            className="text-rose-450 font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <div className="border-t border-slate-850 pt-1.5 mt-1.5 flex justify-between font-bold text-indigo-400">
                        <span>Individual Split Share:</span>
                        <span>₹{(getCartTotals().total / (splitPaymentEmails.length + 1)).toFixed(0)}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-sm font-black text-white mb-6">
                  <span>Grand Total</span>
                  <span className="text-indigo-400 text-base">₹{getCartTotals().total.toFixed(0)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-600 disabled:opacity-45 disabled:hover:bg-indigo-650 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-950/40"
                >
                  🔒 Secure Wallet Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------------------------
            TAB: REAL-TIME GPS TRACKING & TIMELINE
           ------------------------------------------------------------------------------------------ */}
        {currentTab === "delivery" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Live SVG Simulated Map (Col-span-2) */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                    Live Dispatch Map Vector
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Telemetry tracking driver: Alexander Ryder (dr-101)</p>
                </div>
                <div className="text-right text-[11px]">
                  <p className="text-slate-550">Estimated Arrival (ETA)</p>
                  <p className="font-bold text-white">⏱️ {deliveryProgress >= 100 ? "Arrived" : `${Math.ceil((100 - deliveryProgress) / 4) + 3} mins`}</p>
                </div>
              </div>

              {/* Map SVG Grid */}
              <div className="relative h-80 bg-slate-950 rounded-2xl border border-slate-850 overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 600 300">
                  <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e1e38" />
                      <stop offset="100%" stopColor="#0a0a0f" />
                    </linearGradient>
                  </defs>
                  
                  {/* Map Grid Background */}
                  <rect width="600" height="300" fill="url(#mapGradient)" />
                  <g opacity="0.05">
                    <line x1="100" y1="0" x2="100" y2="300" stroke="white" strokeWidth="1" />
                    <line x1="200" y1="0" x2="200" y2="300" stroke="white" strokeWidth="1" />
                    <line x1="300" y1="0" x2="300" y2="300" stroke="white" strokeWidth="1" />
                    <line x1="400" y1="0" x2="400" y2="300" stroke="white" strokeWidth="1" />
                    <line x1="500" y1="0" x2="500" y2="300" stroke="white" strokeWidth="1" />
                    <line x1="0" y1="100" x2="600" y2="100" stroke="white" strokeWidth="1" />
                    <line x1="0" y1="200" x2="600" y2="200" stroke="white" strokeWidth="1" />
                  </g>

                  {/* Simulated Road Paths */}
                  <path d="M 80 80 Q 250 40 300 150 T 520 220" fill="none" stroke="#2a2b3d" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 80 80 Q 250 40 300 150 T 520 220" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" opacity="0.4" />

                  {/* Nodes */}
                  {/* Restaurant: Ahdoos Traditional (80, 80) */}
                  <circle cx="80" cy="80" r="10" fill="#4f46e5" />
                  <circle cx="80" cy="80" r="16" fill="none" stroke="#4f46e5" strokeWidth="1" opacity="0.3" className="animate-pulse" />
                  <text x="80" y="60" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">🍲 Ahdoos Traditional</text>

                  {/* Customer Destination (520, 220) */}
                  <circle cx="520" cy="220" r="10" fill="#ec4899" />
                  <text x="520" y="245" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">📍 Shahid (Gupkar Residency)</text>

                  {/* Simulated Moving Driver coordinates along quadratic Bezier path */}
                  {/* Path coordinates calculation:
                      t goes from 0 to 1 based on deliveryProgress (0 to 100)
                      Formula: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2 for first part
                  */}
                  {(() => {
                    const t = deliveryProgress / 100;
                    // Linear approximation for simplicity of coordinate mapping on road
                    const p0 = { x: 80, y: 80 };
                    const p1 = { x: 300, y: 150 };
                    const p2 = { x: 520, y: 220 };
                    
                    // Simple quadratic Bezier coordinates
                    const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
                    const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

                    return (
                      <g>
                        {/* Shimmer pulse */}
                        <circle cx={x} cy={y} r="14" fill="#fbbf24" opacity="0.3" />
                        {/* Driver dot */}
                        <circle cx={x} cy={y} r="7" fill="#fbbf24" />
                        <text x={x} y={y - 14} fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">🛵 Ryder Dispatch (Active)</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Order timeline status</h4>
              
              <div className="space-y-6 text-xs relative pl-5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                
                {/* Timeline item 1 */}
                <div className="relative">
                  <span className={`absolute -left-[17px] top-0.5 w-2 h-2 rounded-full ${deliveryProgress >= 0 ? "bg-indigo-500 ring-4 ring-indigo-950" : "bg-slate-750"}`} />
                  <div>
                    <p className="font-bold text-white">Order placed & securely processed</p>
                    <p className="text-[10px] text-slate-450 mt-0.5">Approved via Corporate Wallet tokenization</p>
                  </div>
                </div>

                {/* Timeline item 2 */}
                <div className="relative">
                  <span className={`absolute -left-[17px] top-0.5 w-2 h-2 rounded-full ${deliveryProgress >= 20 ? "bg-indigo-500 ring-4 ring-indigo-950" : "bg-slate-750"}`} />
                  <div>
                    <p className="font-bold text-white">Culinary preparation complete</p>
                    <p className="text-[10px] text-slate-450 mt-0.5">Slow-cooked Wazwan packed & sealed at Ahdoos kitchen</p>
                  </div>
                </div>

                {/* Timeline item 3 */}
                <div className="relative">
                  <span className={`absolute -left-[17px] top-0.5 w-2 h-2 rounded-full ${deliveryProgress >= 50 ? "bg-indigo-500 ring-4 ring-indigo-950" : "bg-slate-750"}`} />
                  <div>
                    <p className="font-bold text-white">Dispatched with delivery partner</p>
                    <p className="text-[10px] text-slate-450 mt-0.5">Bilal Ahmad is following high-altitude telemetry route</p>
                  </div>
                </div>

                {/* Timeline item 4 */}
                <div className="relative">
                  <span className={`absolute -left-[17px] top-0.5 w-2 h-2 rounded-full ${deliveryProgress >= 100 ? "bg-emerald-500 ring-4 ring-emerald-950" : "bg-slate-750"}`} />
                  <div>
                    <p className="font-bold text-white">Arrived & Handed Over</p>
                    <p className="text-[10px] text-slate-450 mt-0.5">Secure sandbox delivery confirmed</p>
                  </div>
                </div>
              </div>

              {/* Delivery Security SMS notification */}
              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2">
                <p className="text-[10px] font-bold text-slate-550 uppercase tracking-wider">SMS Dispatch Update</p>
                <div className="text-[11px] text-slate-300 leading-relaxed font-mono">
                  "Your delivery partner is nearby. Provide sandbox handover code <strong className="text-indigo-400">5912</strong> on arrival to secure your dinner."
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------------------------
            TAB: ORDER & TABLE HISTORY
           ------------------------------------------------------------------------------------------ */}
        {currentTab === "history" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Table Reservation Bookings */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="p-1 rounded bg-slate-900 border border-slate-850">📅</span>
                Direct Table Seat Bookings
              </h3>

              {bookingHistory.length === 0 ? (
                <div className="p-8 bg-slate-900 border border-slate-850 rounded-2xl text-center text-slate-500 text-xs">No tables reserved yet.</div>
              ) : (
                bookingHistory.map((bk) => (
                  <div key={bk.id} className="bg-slate-900 border border-slate-850 p-5 rounded-2xl space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                      <div>
                        <h4 className="font-extrabold text-white">{bk.restaurantName}</h4>
                        <p className="text-[10px] text-slate-450 mt-0.5">Seat Access Reference: {bk.id}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40">
                        {bk.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-slate-350">
                      <div>
                        <p className="text-[9px] uppercase font-bold text-slate-550">Reserved date & time</p>
                        <p className="font-semibold text-white mt-0.5">{bk.date} @ {bk.timeSlot}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-bold text-slate-550">Seat Tier & Count</p>
                        <p className="font-semibold text-white mt-0.5">{bk.guestCount} guests ({bk.tableType} Table)</p>
                      </div>
                    </div>

                    {bk.specialRequests && bk.specialRequests !== "None" && (
                      <div className="bg-slate-950 p-2 rounded text-[10px] text-slate-400 italic">
                        ⭐ Special requests: "{bk.specialRequests}"
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Historic Food Orders */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="p-1 rounded bg-slate-900 border border-slate-850">🛵</span>
                Historic Delivery Orders
              </h3>

              {ordersHistory.length === 0 ? (
                <div className="p-8 bg-slate-900 border border-slate-850 rounded-2xl text-center text-slate-500 text-xs">No deliveries ordered yet.</div>
              ) : (
                ordersHistory.map((o) => (
                  <div key={o.id} className="bg-slate-900 border border-slate-850 p-5 rounded-2xl space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                      <div>
                        <h4 className="font-extrabold text-white">{o.restaurantName}</h4>
                        <p className="text-[10px] text-slate-450 mt-0.5">Order Reference: {o.id}</p>
                      </div>
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/40">
                        {o.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-slate-300">
                      {o.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-[11px]">
                          <span>{item.quantity}x {item.foodItem.name}</span>
                          <span>₹{(item.foodItem.price * item.quantity).toFixed(0)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-800/60 pt-3 flex justify-between font-bold text-white">
                      <span>Total Invoice</span>
                      <span className="text-indigo-400">₹{o.total.toFixed(0)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------------------------
            TAB: WALLET & CASHBACK METRICS
           ------------------------------------------------------------------------------------------ */}
        {currentTab === "wallet" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Wallet metrics cards */}
            <div className="space-y-4 lg:col-span-1">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-85">RaahRide Wallet Balance</span>
                  <Wallet className="w-5 h-5 opacity-90 animate-bounce" />
                </div>

                <div className="relative z-10">
                  <p className="text-3xl font-black">₹{walletBalance.toFixed(0)}</p>
                  <p className="text-[10px] opacity-75 mt-1 font-mono">Verified secure corporate account</p>
                </div>

                <div className="pt-4 border-t border-white/20 flex justify-between text-xs font-semibold">
                  <button
                    onClick={() => {
                      setWalletBalance(walletBalance + 5000);
                      alert("Sandbox topped up with ₹5,000.00 credits.");
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-all"
                  >
                    Top-Up ₹5,000
                  </button>
                  <span className="opacity-80 py-2">Mastercard ending 4242</span>
                </div>
              </div>

              {/* Reward points and cashback */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Reward Loyalty Points</p>
                  <p className="text-lg font-bold text-amber-400 mt-1">{rewardPoints} pts</p>
                  <p className="text-[9px] text-slate-450 mt-0.5">Redeemable for gold-leaf dishes</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Instant Cashback Balance</p>
                  <p className="text-lg font-bold text-emerald-400 mt-1">₹{cashbackBalance.toFixed(0)}</p>
                  <p className="text-[9px] text-slate-450 mt-0.5">5% accrued on every corporate order</p>
                </div>
              </div>
            </div>

            {/* Wallet transactions list */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Accrual and ledger ledger</h3>
              <div className="space-y-3.5 max-h-96 overflow-y-auto">
                {walletTx.map((tx) => (
                  <div key={tx.id} className="bg-slate-950 border border-slate-850 p-3 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-200">{tx.desc}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{tx.date}</p>
                    </div>
                    <span className={`font-mono font-bold ${tx.type === "credit" ? "text-emerald-400" : "text-rose-400"}`}>
                      {tx.type === "credit" ? "+" : ""}₹{Math.abs(tx.amount).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------------------------
            TAB: HELP & SUPPORT CLIENT
           ------------------------------------------------------------------------------------------ */}
        {currentTab === "support" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Create support Ticket (Col-span-1) */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-150 uppercase tracking-wider">File a Support Ticket</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Our support team and live AI routing concierges operate 24/7. Describe your grievance with high telemetry detail.
              </p>

              <form onSubmit={handleSubmitTicket} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={newTicketSubject}
                    onChange={(e) => setNewTicketSubject(e.target.value)}
                    placeholder="e.g. order RR-8291 is stuck in traffic"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Category</label>
                  <select
                    value={newTicketCategory}
                    onChange={(e) => setNewTicketCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-200 focus:outline-none"
                  >
                    <option value="Delivery delay">Delivery delay</option>
                    <option value="Payment issue">Payment issue</option>
                    <option value="Refund">Refund request</option>
                    <option value="App feedback">App feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Detailed Description</label>
                  <textarea
                    rows={3}
                    required
                    value={newTicketText}
                    onChange={(e) => setNewTicketText(e.target.value)}
                    placeholder="Provide specific details about your transaction, food prep, or delivery status..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none placeholder-slate-650"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs"
                >
                  Submit Support Request
                </button>
              </form>
            </div>

            {/* Support Ticket History (Col-span-2) */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="p-1 rounded bg-slate-900 border border-slate-850">🎫</span>
                Active Support Queues
              </h3>

              {helpTickets.map((t) => (
                <div key={t.id} className="bg-slate-900 border border-slate-850 p-5 rounded-2xl space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="font-extrabold text-white">{t.subject}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Reference ID: {t.id} • Category: {t.category}</p>
                    </div>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/40">
                      {t.status}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {t.messages.map((msg: any, mIdx: number) => (
                      <div key={mIdx} className={`p-3 rounded-xl text-xs ${
                        msg.sender === "User"
                          ? "bg-slate-950 border border-slate-850 text-slate-300 ml-4"
                          : "bg-indigo-950/30 border border-indigo-900/40 text-indigo-250 mr-4"
                      }`}>
                        <p className="font-bold text-[9px] uppercase tracking-wide text-slate-450 mb-1">
                          {msg.sender === "User" ? "Guest Reporter" : "RaahRide AI Dispatch"} • {msg.timestamp.slice(11, 16) || "Recent"}
                        </p>
                        <p>{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
