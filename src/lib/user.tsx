"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  facebook: string;
};

export type OrderItem = {
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  date: string;
  status: "pending" | "processing" | "delivered" | "cancelled";
  total: number;
  items: number;
  lineItems: OrderItem[];
  deliveryMethod: "normal" | "fast";
  deliveryCost: number;
  district: string;
  paymentMethod: string;
};

type UserContextType = {
  user: User | null;
  orders: Order[];
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  register: (user: User, password: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
  deleteAccount: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const UserContext = createContext<UserContextType | null>(null);

// Demo orders
const demoOrders: Order[] = [
  {
    id: "SRO-20260301",
    date: "2026-03-01",
    status: "delivered",
    total: 185000,
    items: 3,
    lineItems: [
      { name: "Rexri Sun Cream SPF50+", image: "/products/rexri-sun-cream.jpg", price: 65000, quantity: 1 },
      { name: "Rexri Moisture Toner", image: "/products/rexri-moisture-toner.jpg", price: 55000, quantity: 1 },
      { name: "Rexri Glow Mask Pack", image: "/products/rexri-glow-mask.jpg", price: 65000, quantity: 1 },
    ],
    deliveryMethod: "fast",
    deliveryCost: 5000,
    district: "Сүхбаатар",
    paymentMethod: "QPay",
  },
  {
    id: "SRO-20260225",
    date: "2026-02-25",
    status: "processing",
    total: 89000,
    items: 1,
    lineItems: [
      { name: "Sunray Cushion Compact", image: "/products/sunray-cushion-compact.jpg", price: 85000, quantity: 1 },
    ],
    deliveryMethod: "normal",
    deliveryCost: 4000,
    district: "Баянгол",
    paymentMethod: "Card",
  },
  {
    id: "SRO-20260210",
    date: "2026-02-10",
    status: "delivered",
    total: 45000,
    items: 2,
    lineItems: [
      { name: "KeepKiss Water Sleeping Mask", image: "/products/keepkiss-water-mask.jpg", price: 18000, quantity: 1 },
      { name: "KeepKiss Eye Repair Patches", image: "/products/keepkiss-repair-patches.jpg", price: 22000, quantity: 1 },
    ],
    deliveryMethod: "normal",
    deliveryCost: 5000,
    district: "Хан-Уул",
    paymentMethod: "QPay",
  },
  {
    id: "SRO-20260115",
    date: "2026-01-15",
    status: "delivered",
    total: 125000,
    items: 1,
    lineItems: [
      { name: "Sunray Skin Scrubber", image: "/products/sunray-skin-scrubber.jpg", price: 120000, quantity: 1 },
    ],
    deliveryMethod: "fast",
    deliveryCost: 0,
    district: "Чингэлтэй",
    paymentMethod: "Loan",
  },
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const login = useCallback((email: string, _password: string) => {
    setUser({
      firstName: "Sunray",
      lastName: "User",
      email,
      phone: "+976 9850 9999",
      facebook: "",
    });
    setOrders(demoOrders);
  }, []);

  const register = useCallback((newUser: User, _password: string) => {
    setUser(newUser);
    setOrders([]);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setOrders([]);
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  const changePassword = useCallback((_oldPassword: string, _newPassword: string) => {
    // Demo: always succeeds
    return true;
  }, []);

  const deleteAccount = useCallback(() => {
    setUser(null);
    setOrders([]);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        orders,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        updateUser,
        changePassword,
        deleteAccount,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
