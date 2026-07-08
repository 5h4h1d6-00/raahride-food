import { Restaurant, FoodItem, TableBooking, Order, SupportTicket, AuditLog } from "./types";

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: "la-piazza",
    name: "Ahdoos Traditional",
    cuisine: "Traditional Wazwan & Bakery",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    logo: "🍲",
    rating: 4.8,
    reviewsCount: 342,
    deliveryTime: "15-25 min",
    deliveryFee: 40.0,
    minOrder: 150.0,
    address: "Residency Road, Lal Chowk, Srinagar, Jammu & Kashmir 190001",
    phone: "+91 194-2477384",
    openingHours: "11:00 AM - 11:00 PM",
    isOpen: true,
    description: "Established in 1918, Ahdoos is the legendary pioneer of authentic Kashmiri Wazwan culinary art, offering pristine heritage dishes cooked slowly over wood fires.",
    featuredDishes: ["Kashmiri Rogan Josh", "Tabakh Maaz", "Kashmiri Shahi Phirni"],
    indoorTablesCount: 12,
    outdoorTablesCount: 8,
    vipTablesCount: 3,
    reviews: [
      { id: "rev-1", userName: "Aadil Bhat", rating: 5, comment: "The authentic Rogan Josh is absolute heaven! Authentic Wazwan flavors.", date: "2026-07-01" },
      { id: "rev-2", userName: "Marcus Aurelius", rating: 4, comment: "Amazing slow-cooked Tabakh Maaz. The crispiness is exceptionally perfect.", date: "2026-07-04" },
      { id: "rev-3", userName: "Giovanni B.", rating: 5, comment: "Excellent service and perfect table reservation near the outdoor patio overlooking Residency Road.", date: "2026-07-06" }
    ],
    menu: [
      {
        id: "lp-1",
        name: "Kashmiri Rogan Josh",
        price: 450.0,
        category: "Wazwan",
        image: "https://images.unsplash.com/photo-1545247181-516773cae76d?auto=format&fit=crop&w=400&q=80",
        description: "Aromatic lamb dish cooked in a rich gravy flavored with shallots, Kashmiri red chilies, and a blend of mountain spices.",
        rating: 4.9,
        isVegetarian: false,
        isGlutenFree: true,
        isNutFree: true,
        isHalal: true,
        preparationTime: 12,
        inStock: true,
        isFeatured: true,
        isTrending: true,
        ingredients: ["Spring Lamb", "Kashmiri Red Chilies", "Mawal Flower Extract", "Fennel Powder"],
        allergens: ["None"],
        nutritionFacts: { calories: 520, protein: "28g", carbs: "12g", fat: "32g" },
        variants: [
          { name: "Regular Portion", priceDelta: 0 },
          { name: "Double Portion", priceDelta: 300.0 }
        ],
        addOns: [
          { id: "lp-ao-1", name: "Extra Rogan Gravy Bowl", price: 80.0 },
          { id: "lp-ao-2", name: "Premium Basmati Rice cup", price: 50.0 }
        ]
      },
      {
        id: "lp-2",
        name: "Tabakh Maaz",
        price: 380.0,
        category: "Wazwan",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&q=80",
        description: "Crispy fried lamb ribs, slow-marinated in a mix of milk, ghee, and local spices before being shallow fried to golden perfection.",
        rating: 4.8,
        isVegetarian: false,
        isGlutenFree: true,
        isNutFree: true,
        isHalal: true,
        preparationTime: 15,
        inStock: true,
        isFeatured: true,
        ingredients: ["Lamb Ribs", "Milk", "Pure Desi Ghee", "Cardamom", "Cloves"],
        allergens: ["Dairy"],
        nutritionFacts: { calories: 780, protein: "34g", carbs: "0g", fat: "58g" },
        addOns: [
          { id: "lp-ao-3", name: "Extra Crispy Rib Piece", price: 150.0 },
          { id: "lp-ao-4", name: "Mint Yogurt Chutney", price: 20.0 }
        ]
      },
      {
        id: "lp-3",
        name: "Kashmiri Shahi Phirni",
        price: 120.0,
        category: "Traditional Desserts",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80",
        description: "Creamy rice pudding cooked with local milk and handpicked Pampore saffron threads, chilled in traditional clay pots and garnished with almonds.",
        rating: 4.9,
        isVegetarian: true,
        isGlutenFree: true,
        isNutFree: false,
        isHalal: true,
        preparationTime: 5,
        inStock: true,
        ingredients: ["Semolina Rice", "Full Cream Milk", "Pampore Saffron", "Slivered Almonds", "Pistachios"],
        allergens: ["Dairy", "Nuts"],
        nutritionFacts: { calories: 340, protein: "6g", carbs: "42g", fat: "16g" }
      }
    ]
  },
  {
    id: "sakura-blossom",
    name: "Lhasa Garden Restaurant",
    cuisine: "Tibetan, Chinese & Himalayan",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    logo: "🥟",
    rating: 4.9,
    reviewsCount: 492,
    deliveryTime: "25-35 min",
    deliveryFee: 50.0,
    minOrder: 200.0,
    address: "Boulevard Road, Dal Lake, Srinagar, Jammu & Kashmir 190001",
    phone: "+91 194-2450254",
    openingHours: "12:00 PM - 10:00 PM",
    isOpen: true,
    description: "Srinagar's premier Tibetan restaurant with scenic lakeside dining. Celebrated for our hand-rolled Steamed Momos and authentic comforting Himalayan Thukpa.",
    featuredDishes: ["Steamed Tibetan Chicken Momos", "Chef's Special Himalayan Thukpa", "Himalayan Herbal Tea"],
    indoorTablesCount: 10,
    outdoorTablesCount: 4,
    vipTablesCount: 4,
    reviews: [
      { id: "rev-4", userName: "Tenzin Gyatso", rating: 5, comment: "Authentic Tibetan food. The Momo wrappers are incredibly thin and juicy.", date: "2026-07-02" },
      { id: "rev-5", userName: "Emily Watson", rating: 5, comment: "Beautifully comforting Thukpa noodle soup with a stunning view of Dal Lake.", date: "2026-07-05" }
    ],
    menu: [
      {
        id: "sb-1",
        name: "Steamed Tibetan Chicken Momos",
        price: 220.0,
        category: "Tibetan",
        image: "https://images.unsplash.com/photo-1625220194771-7ebedd0b7e1c?auto=format&fit=crop&w=400&q=80",
        description: "Juicy hand-folded dumpling wraps filled with aromatic minced chicken and fresh herbs, served with homemade garlic-chili paste.",
        rating: 4.8,
        isVegetarian: false,
        isGlutenFree: false,
        isNutFree: true,
        isHalal: true,
        preparationTime: 14,
        inStock: true,
        isFeatured: true,
        isTrending: true,
        ingredients: ["Minced Chicken", "Fresh Ginger", "Spring Onions", "Soy Sauce", "Sesame Oil"],
        allergens: ["Gluten", "Soy"],
        nutritionFacts: { calories: 380, protein: "22g", carbs: "44g", fat: "10g" },
        addOns: [
          { id: "sb-ao-1", name: "Extra Spicy Chili Dip", price: 15.0 },
          { id: "sb-ao-2", name: "Comforting Clear Soup cup", price: 30.0 }
        ]
      },
      {
        id: "sb-2",
        name: "Chef's Special Himalayan Thukpa",
        price: 180.0,
        category: "Tibetan",
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=400&q=80",
        description: "Comforting Tibetan noodle soup loaded with slow-simmered chicken, farm-fresh local vegetables, and dynamic Himalayan aromatic spices.",
        rating: 4.9,
        isVegetarian: false,
        isGlutenFree: false,
        isNutFree: true,
        isHalal: true,
        preparationTime: 18,
        inStock: true,
        ingredients: ["Egg Noodles", "Simmered Chicken", "Carrots", "Spinach", "Garlic Ginger Paste", "Local Herbs"],
        allergens: ["Gluten", "Eggs", "Soy"],
        nutritionFacts: { calories: 420, protein: "24g", carbs: "58g", fat: "8g" }
      }
    ]
  },
  {
    id: "golden-saffron",
    name: "Mughal Darbar Wazwan",
    cuisine: "Kashmiri Wazwan & Mughlai",
    image: "https://images.unsplash.com/photo-1585938338392-50a59970d8ee?auto=format&fit=crop&w=800&q=80",
    logo: "🍛",
    rating: 4.7,
    reviewsCount: 289,
    deliveryTime: "30-40 min",
    deliveryFee: 30.0,
    minOrder: 150.0,
    address: "Residency Road, Lal Chowk, Srinagar, Jammu & Kashmir 190001",
    phone: "+91 194-2472478",
    openingHours: "11:30 AM - 10:30 PM",
    isOpen: true,
    description: "Opulent traditional dining famed for serving authentic imperial-scale Kashmiri Wazwan feasts, crafted using stone-ground mountain spices and slow wood fires.",
    featuredDishes: ["Imperial Wazwan Feast Rista", "Kashmiri Gushtaba Delicacy", "Fresh Garlic Butter Naan"],
    indoorTablesCount: 15,
    outdoorTablesCount: 2,
    vipTablesCount: 2,
    reviews: [
      { id: "rev-6", userName: "Priya Patel", rating: 5, comment: "The Rista meatballs are unbelievably tender. Deep complex spice profile.", date: "2026-07-03" }
    ],
    menu: [
      {
        id: "gs-1",
        name: "Imperial Wazwan Feast Rista",
        price: 480.0,
        category: "Wazwan",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80",
        description: "Tender, hand-pounded lamb meatballs slow-simmered in a rich, deeply aromatic gravy infused with saffron threads, red chilies, and pure ghee.",
        rating: 4.9,
        isVegetarian: false,
        isGlutenFree: true,
        isNutFree: true,
        isHalal: true,
        preparationTime: 20,
        inStock: true,
        isFeatured: true,
        ingredients: ["Pounded Lamb Meat", "Kashmiri Saffron", "Desi Ghee", "Dry Ginger Powder", "Asafoetida"],
        allergens: ["None"],
        nutritionFacts: { calories: 640, protein: "38g", carbs: "12g", fat: "45g" },
        variants: [
          { name: "Standard (2 Pieces)", priceDelta: 0 },
          { name: "Feast Size (4 Pieces)", priceDelta: 400.0 }
        ],
        addOns: [
          { id: "gs-ao-1", name: "Saffron Spiced Raita", price: 50.0 },
          { id: "gs-ao-2", name: "Hot Tandoori Roti", price: 15.0 }
        ]
      },
      {
        id: "gs-2",
        name: "Kashmiri Gushtaba Delicacy",
        price: 520.0,
        category: "Wazwan",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&q=80",
        description: "The ultimate crowning dish of Wazwan: hand-beaten velvet-textured lamb meatballs cooked in a rich, creamy, and flavorful yogurt-based gravy.",
        rating: 4.8,
        isVegetarian: false,
        isGlutenFree: true,
        isNutFree: true,
        isHalal: true,
        preparationTime: 15,
        inStock: true,
        isTrending: true,
        ingredients: ["Lamb Meatballs", "Local Spiced Curd", "Desi Ghee", "Cardamom Essence", "Dry Mint Leaves"],
        allergens: ["Dairy"],
        nutritionFacts: { calories: 690, protein: "34g", carbs: "18g", fat: "42g" }
      }
    ]
  },
  {
    id: "green-garden",
    name: "The Chinar Fine Dine",
    cuisine: "Royal Kashmiri & Continental",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    logo: "☕",
    rating: 4.7,
    reviewsCount: 198,
    deliveryTime: "15-25 min",
    deliveryFee: 60.0,
    minOrder: 150.0,
    address: "The Lalit Grand Palace, Gupkar Road, Srinagar, Jammu & Kashmir 190001",
    phone: "+91 194-2501001",
    openingHours: "08:00 AM - 09:30 PM",
    isOpen: true,
    description: "Elite royal heritage dining nested under centuries-old grand Chinar trees. Experience premium Pampore saffron-infused Kehwa tea and organic local farm bowls.",
    featuredDishes: ["Saffron Kehwa Royal Tea Set", "Pahalgam Trout Grill", "Nun Chai & Local Kulcha"],
    indoorTablesCount: 8,
    outdoorTablesCount: 10,
    vipTablesCount: 1,
    reviews: [
      { id: "rev-7", userName: "Omar Abdullah", rating: 5, comment: "Unparalleled royal ambiance. Sitting under the historic Chinars sipping authentic saffron Kehwa is spiritual.", date: "2026-07-06" }
    ],
    menu: [
      {
        id: "gg-1",
        name: "Saffron Kehwa Royal Tea Set",
        price: 150.0,
        category: "Royal Kahwa",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
        description: "Authentic green tea leaves simmered with exotic Pampore saffron, cinnamon sticks, and cardamom, served with crushed Kashmiri almonds and wild forest honey.",
        rating: 4.8,
        isVegetarian: true,
        isGlutenFree: true,
        isNutFree: false,
        isHalal: true,
        preparationTime: 10,
        inStock: true,
        isFeatured: true,
        ingredients: ["Green Tea Leaves", "Pampore Saffron Threads", "Cinnamon Sticks", "Cardamom Seeds", "Slivered Kashmiri Almonds", "Forest Honey"],
        allergens: ["Nuts"],
        nutritionFacts: { calories: 120, protein: "2g", carbs: "18g", fat: "4g" },
        addOns: [
          { id: "gg-ao-1", name: "Premium Almond Flour cookies (2pc)", price: 80.0 },
          { id: "gg-ao-2", name: "Extra Pampore Saffron Garnish", price: 40.0 }
        ]
      }
    ]
  },
  {
    id: "burger-co",
    name: "Imperial Grill Jammu",
    cuisine: "Tandoori & Modern Indian Grill",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    logo: "🔥",
    rating: 4.6,
    reviewsCount: 521,
    deliveryTime: "15-30 min",
    deliveryFee: 50.0,
    minOrder: 150.0,
    address: "Gandhi Nagar, Jammu, Jammu & Kashmir 180004",
    phone: "+91 191-2434313",
    openingHours: "11:00 AM - 12:00 AM",
    isOpen: true,
    description: "Jammu's finest premium grill destination featuring live tandoor charcoal grills, serving perfectly charred authentic kebabs and local modern fusion platters.",
    featuredDishes: ["Charred Tandoori Chicken Tikka Platter", "Amritsari Kulcha set", "Salted Lassi Jar"],
    indoorTablesCount: 14,
    outdoorTablesCount: 6,
    vipTablesCount: 2,
    reviews: [
      { id: "rev-8", userName: "Ron Swanson", rating: 5, comment: "Exquisite charcoal smoke flavor in the chicken tikka. Robust Indian seasoning.", date: "2026-07-05" }
    ],
    menu: [
      {
        id: "bc-1",
        name: "Charred Tandoori Chicken Tikka Platter",
        price: 390.0,
        category: "Tandoori Grills",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
        description: "Juicy premium chicken breast cubes marinated in hung spiced curd, garlic-ginger paste, mustard oil, and tandoori spices, smoked to perfection over charcoal.",
        rating: 4.8,
        isVegetarian: false,
        isGlutenFree: true,
        isNutFree: true,
        isHalal: true,
        preparationTime: 12,
        inStock: true,
        isFeatured: true,
        isTrending: true,
        ingredients: ["Chicken Cubes", "Hung Yogurt", "Mustard Oil", "Ginger Garlic Paste", "Traditional Tandoori Masala"],
        allergens: ["Dairy"],
        nutritionFacts: { calories: 480, protein: "38g", carbs: "6g", fat: "14g" },
        variants: [
          { name: "Medium Spiced", priceDelta: 0 },
          { name: "Extra Spicy Red", priceDelta: 0 },
          { name: "Imperial Family Platter", priceDelta: 350.0 }
        ],
        addOns: [
          { id: "bc-ao-1", name: "Fresh Mint Coriander Chutney", price: 20.0 },
          { id: "bc-ao-2", name: "Smashed Laccha Onions", price: 15.0 }
        ]
      }
    ]
  }
];

export const POPULAR_CATEGORIES = [
  { id: "cat-1", name: "Wazwan", icon: "🍲", count: 18 },
  { id: "cat-2", name: "Tibetan", icon: "🥟", count: 24 },
  { id: "cat-3", name: "Tandoori Grills", icon: "🔥", count: 32 },
  { id: "cat-4", name: "Royal Kahwa", icon: "☕", count: 15 },
  { id: "cat-5", name: "Traditional Desserts", icon: "🍮", count: 16 }
];

export const SYSTEM_AUDIT_LOGS: AuditLog[] = [
  { id: "log-1", timestamp: "2026-07-08T10:30:15Z", user: "system_cron", role: "Super Admin", action: "Completed automated daily backup of PostgreSQL primary cluster in Srinagar hub", ip: "10.0.4.15", severity: "Info" },
  { id: "log-2", timestamp: "2026-07-08T09:45:22Z", user: "owner_ahdoos", role: "Restaurant Owner", action: "Modified menu price for lp-1 (Kashmiri Rogan Josh) -> ₹450.00", ip: "198.162.2.45", severity: "Info" },
  { id: "log-3", timestamp: "2026-07-08T09:12:05Z", user: "firewall_modsec", role: "Super Admin", action: "Rate Limit Exceeded: Blocked potential SQLi attempt from Srinagar IP 185.220.101.4", ip: "185.220.101.4", severity: "Critical" },
  { id: "log-4", timestamp: "2026-07-08T08:32:10Z", user: "support_jane", role: "Customer Support", action: "Issued a processed refund of ₹390.00 for Order #RR-8291 to card ending in 4242", ip: "10.0.12.82", severity: "Warning" }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "RR-8291",
    restaurantId: "la-piazza",
    restaurantName: "Ahdoos Traditional",
    subtotal: 830.0,
    deliveryFee: 40.0,
    tip: 50.0,
    tax: 41.5,
    discount: 100.0,
    total: 861.5,
    status: "Delivering",
    deliveryAddress: "Chinar Enclave, Residency Road, Lal Chowk, Srinagar, Jammu & Kashmir 190001",
    paymentMethod: "Razorpay UPI (••••@okaxis)",
    orderType: "Instant",
    timestamp: "2026-07-08T10:15:00Z",
    driverId: "dr-101",
    driverName: "Alexander Ryder",
    driverPhone: "+91 9419012345",
    otp: "5912",
    items: [
      {
        foodItem: INITIAL_RESTAURANTS[0].menu[0], // Rogan Josh
        quantity: 1,
        selectedAddOns: [INITIAL_RESTAURANTS[0].menu[0].addOns![1]], // Saffron rice
        selectedVariant: INITIAL_RESTAURANTS[0].menu[0].variants![0]
      },
      {
        foodItem: INITIAL_RESTAURANTS[0].menu[1], // Tabakh Maaz
        quantity: 1,
        selectedAddOns: []
      }
    ]
  },
  {
    id: "RR-7210",
    restaurantId: "sakura-blossom",
    restaurantName: "Lhasa Garden Restaurant",
    subtotal: 180.0,
    deliveryFee: 50.0,
    tip: 20.0,
    tax: 9.0,
    discount: 0.0,
    total: 259.0,
    status: "Completed",
    deliveryAddress: "Rajbagh Extension, Near Hurriyat Office, Srinagar, J&K 190008",
    paymentMethod: "NetBanking SBI",
    orderType: "Scheduled",
    scheduledTime: "12:30 PM",
    timestamp: "2026-07-07T18:30:00Z",
    items: [
      {
        foodItem: INITIAL_RESTAURANTS[1].menu[1], // Himalayan Thukpa
        quantity: 1,
        selectedAddOns: []
      }
    ]
  }
];

export const INITIAL_BOOKINGS: TableBooking[] = [
  {
    id: "BK-4921",
    restaurantId: "la-piazza",
    restaurantName: "Ahdoos Traditional",
    guestName: "Shahid Saleem",
    guestEmail: "shahidsaleemitoo@gmail.com",
    guestPhone: "+91 94190 28312",
    date: "2026-07-09",
    timeSlot: "07:30 PM",
    guestCount: 4,
    tableType: "VIP",
    specialOccasion: "Anniversary",
    specialRequests: "Prefer a corner booth near the garden arch if possible. Celebrating our 5th wedding anniversary.",
    status: "Confirmed",
    createdAt: "2026-07-08T09:12:00Z"
  },
  {
    id: "BK-3810",
    restaurantId: "sakura-blossom",
    restaurantName: "Lhasa Garden Restaurant",
    guestName: "Jane Watson",
    guestEmail: "jane.watson@gmail.com",
    guestPhone: "+91 91234 56789",
    date: "2026-07-10",
    timeSlot: "08:00 PM",
    guestCount: 2,
    tableType: "Indoor",
    specialOccasion: "Birthday",
    specialRequests: "None",
    status: "Confirmed",
    createdAt: "2026-07-07T14:20:00Z"
  }
];

export const FAQS = [
  { q: "Is RaahRide Food operational outside Jammu & Kashmir?", a: "No, RaahRide Food is exclusively engineered to work and deliver solely within Jammu and Kashmir, India (serving Srinagar, Jammu, Gulmarg, and Pahalgam) to support local culinary preservation and micro-delivery networks." },
  { q: "How does the AI smart search function for Kashmiri cuisine?", a: "RaahRide Food includes an advanced Gemini-powered semantic search that understands traditional culinary preferences. Instead of typing just 'Wazwan', you can input 'traditional slow-cooked juicy mutton dish with rich gravy' or 'comfortable lakeside dining in Srinagar' and our AI parses ingredients, local recipes, and critic logs to recommend perfect pairings." },
  { q: "Can I pre-schedule order deliveries and table reservations simultaneously?", a: "Yes! You can reserve a VIP or outdoor table in historic locations (like Lalit Grand Palace or Residency Road) and pre-order meals to be freshly plated the exact minute you arrive." },
  { q: "How is delivery speed tracked through the high-altitude terrains of J&K?", a: "Our drivers use high-precision satellite telemetry tracking. The system utilizes real-time vector signals and routing algorithms customized for local roads, ensuring safe and hot delivery in under 30 minutes." },
  { q: "Are checkout transactions securely encrypted in India?", a: "Absolutely. We route all payments through premium Indian secure payment processors like Razorpay and Stripe with complete PCI-DSS compliance and multi-factor UPI safety locks." }
];

export const HELP_TICKETS: SupportTicket[] = [
  {
    id: "TCK-1002",
    userName: "Shahid Saleem",
    subject: "Delivery delay check for order RR-8291",
    category: "Delivery delay",
    status: "Pending",
    timestamp: "2026-07-08T10:32:00Z",
    messages: [
      { sender: "User", text: "Hey! My Ahdoos order shows Delivering on the map but the ETA increased by 5 minutes. Is the driver alright?", timestamp: "2026-07-08T10:32:00Z" },
      { sender: "AI", text: "Hello! I am scanning the satellite telemetry. The driver Alexander Ryder is safe but has encountered brief traffic on Boulevard Road near Dal Lake. I have routed him via Rainawari detour.", timestamp: "2026-07-08T10:33:00Z" }
    ]
  }
];
