export enum UserRole {
  GUEST = "Guest",
  CUSTOMER = "Customer",
  RESTAURANT_OWNER = "Restaurant Owner",
  RESTAURANT_STAFF = "Restaurant Staff",
  DELIVERY_PARTNER = "Delivery Partner",
  ADMIN = "Admin",
  SUPER_ADMIN = "Super Admin",
  CUSTOMER_SUPPORT = "Customer Support"
}

export interface FoodVariant {
  name: string;
  priceDelta: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface NutritionFacts {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  isVegetarian: boolean;
  isGlutenFree: boolean;
  isNutFree: boolean;
  isHalal: boolean;
  preparationTime: number; // in minutes
  inStock: boolean;
  variants?: FoodVariant[];
  addOns?: AddOn[];
  nutritionFacts?: NutritionFacts;
  allergens?: string[];
  ingredients?: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  logo: string;
  rating: number;
  reviewsCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  address: string;
  phone: string;
  openingHours: string;
  isOpen: boolean;
  featuredDishes: string[];
  menu: FoodItem[];
  reviews: Review[];
  description: string;
  indoorTablesCount: number;
  outdoorTablesCount: number;
  vipTablesCount: number;
}

export interface OrderItem {
  foodItem: FoodItem;
  quantity: number;
  selectedVariant?: FoodVariant;
  selectedAddOns: AddOn[];
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tip: number;
  tax: number;
  discount: number;
  total: number;
  status: "Pending" | "Preparing" | "Dispatched" | "Delivering" | "Completed" | "Cancelled";
  deliveryAddress: string;
  paymentMethod: string;
  orderType: "Instant" | "Scheduled" | "Group";
  scheduledTime?: string;
  timestamp: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverLocation?: { lat: number; lng: number }; // Simulation coords
  otp?: string;
}

export interface TableBooking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  tableType: "Indoor" | "Outdoor" | "VIP" | "Family";
  specialOccasion?: "None" | "Birthday" | "Anniversary" | "Corporate" | "Other";
  specialRequests?: string;
  status: "Confirmed" | "Cancelled" | "Rescheduled";
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userName: string;
  subject: string;
  category: "Delivery delay" | "Payment issue" | "Refund" | "App feedback" | "Other";
  status: "Open" | "Pending" | "Resolved";
  timestamp: string;
  messages: {
    sender: "User" | "Agent" | "AI";
    text: string;
    timestamp: string;
  }[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  ip: string;
  severity: "Info" | "Warning" | "Critical";
}
