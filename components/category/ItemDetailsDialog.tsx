"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import type { MenuItem } from "@/lib/menu-data";

interface ItemDetailsDialogProps {
  item: MenuItem | null;
  categoryName: string;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  onOpenChange: (open: boolean) => void;
}

export function ItemDetailsDialog({
  item,
  categoryName,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onOpenChange,
}: ItemDetailsDialogProps) {
  const [dialogImageError, setDialogImageError] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAi = () => {
    if (!item) return;
    const base = `You're asking about ${item.name}. ${item.description}`;
    const tips = `This dish is in the ${item.category} category${
      item.tags?.length ? ` and includes: ${item.tags.join(", ")}.` : "."
    }`;
    setAnswer(
      `${base}\n\n${tips}\n\nPrice: ₪${item.price}. Let me know if you'd like pairing suggestions or dietary alternatives.`
    );
  };

  return (
    <Dialog open={!!item} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        {item && (
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {item.name === "عصير جزر"
                  ? "Carrot Juice"
                  : item.name === "بيتزا خضار"
                  ? "Vegetable Pizza"
                  : item.name === "شاي"
                  ? "Tea"
                  : item.name === "قهوة"
                  ? "Coffee"
                  : item.name === "عصير رمان"
                  ? "Pomegranate Juice"
                  : item.name === "بيتزا مخصوص"
                  ? "Special Pizza"
                  : item.name}
              </DialogTitle>
              <DialogDescription>
                View detailed information about this menu item including
                description, ingredients, and pricing.
              </DialogDescription>
            </DialogHeader>

            {/* Image with rating and label */}
            <div className="relative rounded-xl overflow-hidden h-48">
              <Image
                src={
                  dialogImageError
                    ? "/placeholder.svg"
                    : item.name === "بيتزا خضار"
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
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
                onError={() => setDialogImageError(true)}
                priority={false}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-3 left-3">
                <span className="inline-flex items-center gap-2 rounded-md bg-black/70 text-white px-2 py-1 text-xs">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> 4.5
                  (128 reviews)
                </span>
              </div>
            </div>

            {/* Category label and price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary">
                  {categoryName === "مشروبات"
                    ? "Drinks"
                    : categoryName === "بيتزا"
                    ? "Pizza"
                    : categoryName}
                </Badge>
              </div>
              <span className="text-lg font-semibold">₪{item.price}</span>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold mb-1">Description</h4>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>

            {/* Features (tags) */}
            {item.tags?.length ? (
              <div>
                <h4 className="font-semibold mb-2">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full border text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Additional Info grid (mock) */}
            <div className="pt-2 border-t">
              <h4 className="font-semibold mb-2">Additional Information</h4>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-muted-foreground">Prep Time:</div>
                <div>15–20 minutes</div>
                <div className="text-muted-foreground">Size:</div>
                <div>Medium</div>
                <div className="text-muted-foreground">Serves:</div>
                <div>1 person</div>
                <div className="text-muted-foreground">Calories:</div>
                <div>350 kcal</div>
              </div>
            </div>

            {/* AI textbox */}
            <div className="space-y-2">
              <h4 className="font-semibold">Ask our AI about this dish</h4>
              <div className="flex gap-2">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask about ingredients, allergens, or pairing tips..."
                  className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
                />
                <Button type="button" onClick={askAi}>
                  Ask
                </Button>
              </div>
              {answer && (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {answer}
                </p>
              )}
            </div>

            {/* Footer actions */}
            <DialogFooter className="flex items-center sm:justify-between gap-2">
              <Button
                variant="outline"
                onClick={() => onToggleFavorite(item)}
                className="cursor-pointer"
              >
                <Heart className="h-4 w-4 mr-2" />
                {isFavorite(item.id.toString())
                  ? "Remove Favorite"
                  : "Add to Favorites"}
              </Button>
              <Button
                className="rounded-full cursor-pointer"
                onClick={() => onAddToCart(item)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart – ₪
                {item.price}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
