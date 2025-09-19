"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Coffee,
  Utensils,
  Cookie,
  Soup,
  Fish,
  Salad,
  IceCream,
  Pizza,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  image: string;
  itemCount: number;
  color: string;
}

const categories: Category[] = [
  {
    id: "hot-beverages",
    name: "Hot Beverages",
    description: "Traditional teas, coffees, and warm drinks",
    icon: Coffee,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80",
    itemCount: 12,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "cold-beverages",
    name: "Cold Beverages",
    description: "Fresh juices, smoothies, and refreshing drinks",
    icon: IceCream,
    image:
      "https://images.unsplash.com/photo-1656248781390-9eb25ef2c445?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fENvbGQlMjBCZXZlcmFnZXN8ZW58MHx8MHx8fDA%3D",
    itemCount: 15,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "appetizers",
    name: "Appetizers",
    description: "Traditional mezze and starter dishes",
    icon: Salad,
    image:
      "https://images.unsplash.com/photo-1706650439799-d4a8894556b6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwZXRpemVyc3xlbnwwfHwwfHx8MA%3D%3D",
    itemCount: 18,
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "soups",
    name: "Soups",
    description: "Hearty traditional soups and broths",
    icon: Soup,
    image:
      "https://plus.unsplash.com/premium_photo-1669559809615-b08af364b738?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U291cHN8ZW58MHx8MHx8fDA%3D",
    itemCount: 8,
    color: "from-red-500 to-rose-600",
  },
  {
    id: "main-dishes",
    name: "Main Dishes",
    description: "Authentic Middle Eastern main courses",
    icon: Utensils,
    image:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1600&q=80",
    itemCount: 25,
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "grilled-items",
    name: "Grilled Items",
    description: "Charcoal-grilled meats and vegetables",
    icon: Pizza,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JpbGxlZCUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    itemCount: 16,
    color: "from-orange-500 to-red-600",
  },
  {
    id: "seafood",
    name: "Seafood",
    description: "Fresh fish and seafood specialties",
    icon: Fish,
    image:
      "https://plus.unsplash.com/premium_photo-1717345994192-f5bc10b61c09?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFNlYWZvb2R8ZW58MHx8MHx8fDA%3D",
    itemCount: 10,
    color: "from-teal-500 to-blue-600",
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Traditional Middle Eastern sweets",
    icon: Cookie,
    image: "https://plus.unsplash.com/premium_photo-1678715022988-417bbb94e3df?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RGVzc2VydHN8ZW58MHx8MHx8fDA%3D",
    itemCount: 14,
    color: "from-pink-500 to-rose-600",
  },
];

export function MenuCategories() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Our Menu
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Explore Our Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover our wide selection of authentic Middle Eastern dishes, from
            traditional appetizers to hearty main courses and delightful
            desserts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <Card
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-black/5 bg-transparent shadow-md hover:shadow-lg transition-all duration-300"
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image */}
                <div className="relative h-56 md:h-64 w-full overflow-hidden">
                  <Image
                    src={
                      imageErrors[category.id]
                        ? "/placeholder.svg"
                        : category.image
                    }
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    onError={() =>
                      setImageErrors((m) => ({ ...m, [category.id]: true }))
                    }
                    priority={false}
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

                  {/* Small white icon badge (top-left) */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-white text-foreground rounded-full p-2 shadow-md dark:bg-black dark:text-white">
                      <category.icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Text overlay (bottom-left) */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-extrabold drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-white/90 text-sm leading-snug line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
