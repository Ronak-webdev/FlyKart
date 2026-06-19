"use client";

import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";

export function CartBadge() {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const count = getTotalItems();

  if (count === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-background">
      {count > 99 ? "99+" : count}
    </span>
  );
}
