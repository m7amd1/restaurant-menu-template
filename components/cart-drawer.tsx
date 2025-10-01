"use client";

import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const { state, removeItem, updateQuantity, closeCart } = useCart();

  const formatPrice = (price: number) => {
    return `₪${price.toFixed(2)}`;
  };

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" hideClose className="w-full sm:w-[400px] p-0">
        <div className="flex flex-col h-full min-h-0">
          <SheetHeader className="p-6 pb-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Your Cart
                {state.items.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </SheetTitle>
              <Button
                variant="ghost"
                className="cursor-pointer hover:text-white hover:bg-red-600"
                size="icon"
                onClick={closeCart}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <SheetDescription>
              {state.items.length === 0
                ? "Your cart is empty"
                : `${state.items.length} item${
                    state.items.length > 1 ? "s" : ""
                  } in your cart`}
            </SheetDescription>
          </SheetHeader>

          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Button onClick={closeCart} variant="outline">
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 min-h-0">
                <ScrollArea className="h-full px-6 pr-3">
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex gap-4 py-4">
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
                                {item.id}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-white"
                              onClick={() => removeItem(item.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 bg-transparent"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 bg-transparent"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="font-medium text-sm">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="p-6 border-t mt-auto flex-shrink-0">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(state.total)}</span>
                </div>

                <div className="space-y-2 flex justify-between flex-col">
                  <Link href="/checkout" onClick={closeCart}>
                    <Button className="w-full dark:text-white" size="lg">
                      Continue to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={closeCart}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
