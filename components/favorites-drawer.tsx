"use client";

import { useState } from "react";
import { useFavorites } from "@/contexts/favorites-context";
import { useCart } from "@/contexts/cart-context";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, X, ShoppingCart } from "lucide-react";
import Image from "next/image";

export function FavoritesDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites, removeFromFavorites } = useFavorites();
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return `₪${price.toFixed(2)}`;
  };

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Heart className="h-4 w-4" />
          {favorites.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {favorites.length}
            </Badge>
          )}
          <span className="sr-only">Favorites</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        hideClose
        className="w-full sm:w-[400px] p-0 max-h-[100dvh] overflow-hidden"
      >
        <div className="flex flex-col h-full min-h-0">
          <SheetHeader className="p-6 pb-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Your Favorites
                {favorites.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {favorites.length}
                  </Badge>
                )}
              </SheetTitle>
              <Button
                variant="ghost"
                className="cursor-pointer hover:text-white hover:bg-red-600"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <SheetDescription>
              {favorites.length === 0
                ? "No favorites yet"
                : `${favorites.length} item${
                    favorites.length > 1 ? "s" : ""
                  } in your favorites`}
            </SheetDescription>
          </SheetHeader>

          {favorites.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No favorites yet
            </div>
          ) : (
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full px-6 pr-3">
                <div className="space-y-4">
                  {favorites.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-4 border-b border-border last:border-0"
                    >
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={
                            item.name === "بيتزا خضار"
                              ? "/pizza2.jpg"
                              : item.name === "شاي"
                              ? "/tea.jpg"
                              : item.name === "قهوة"
                              ? "/coffee.jpg"
                              : item.name === "عصير رمان"
                              ? "/pomegranate juice.jpg"
                              : item.name === "عصير جزر"
                              ? "/juice2.jpg"
                              : item.name === "بيتزا مخصوص"
                              ? "/pizza1.jpg"
                              : item.image || "/placeholder.svg"
                          }
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-sm leading-tight">
                              {item.name === "بيتزا خضار"
                                ? "Vegetable Pizza"
                                : item.name === "شاي"
                                ? "Tea"
                                : item.name === "قهوة"
                                ? "Coffee"
                                : item.name === "عصير رمان"
                                ? "Pomegranate Juice"
                                : item.name === "عصير جزر"
                                ? "Carrot Juice"
                                : item.name === "بيتزا مخصوص"
                                ? "Special Pizza"
                                : item.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {item.category}
                            </p>
                            <p className="font-semibold text-sm text-primary mt-1">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-white"
                            onClick={() => removeFromFavorites(item.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-3 w-3 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
          <div className="p-6 border-t mt-auto flex-shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Total favorites
              </span>
              <Badge variant="secondary">{favorites.length}</Badge>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
