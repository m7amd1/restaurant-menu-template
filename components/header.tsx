"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Phone,
  Users,
  ShoppingCart,
  Sun,
  Moon,
  ChefHat,
  Home,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/favorites-context";
import { CartDrawer } from "@/components/cart-drawer";
import { FavoritesDrawer } from "@/components/favorites-drawer";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { state, openCart } = useCart();
  const { favorites } = useFavorites();

  const navigationItems = [
    { href: "/menu", label: "Menu", icon: Home },
    { href: "/about", label: "About Us", icon: Users },
    { href: "/contact", label: "Contact Us", icon: Phone },
  ];

  const cartItemCount = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-primary" />
              {/* Desktop/Tablet: brand name + subtitle */}
              <div className="hidden md:flex flex-col">
                <span className="text-xl font-bold text-foreground">
                  Authentic Restaurant
                </span>
                <span className="text-xs text-muted-foreground">
                  Traditional Middle Eastern Cuisine
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              {/* Dark mode toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle dark mode</span>
              </Button>

              <FavoritesDrawer />

              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9"
                onClick={() => {
                  if (!state.isOpen) openCart();
                }}
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-primary"
                  >
                    {cartItemCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Button>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden h-9 w-9"
                  >
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-2">
                      <ChefHat className="h-6 w-6 text-primary" />
                      <span>Authentic Restaurant</span>
                    </SheetTitle>
                    <SheetDescription>
                      Experience the finest traditional Middle Eastern cuisine
                    </SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer />
    </>
  );
}
