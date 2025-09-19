"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/favorites-context";

import { menuItems, categoryInfo, type MenuItem } from "@/lib/menu-data";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CategoryFilters } from "@/components/category/CategoryFilters";
import { ItemCard } from "@/components/category/ItemCard";
import { ItemDetailsDialog } from "@/components/category/ItemDetailsDialog";

// Data moved to lib/menu-data.ts for reuse and smaller client bundles

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["all"]);
  const [openItem, setOpenItem] = useState<MenuItem | null>(null);
  // local state kept minimal to keep this page lightweight

  const { addItem, openCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const category = categoryInfo[slug as keyof typeof categoryInfo];

  if (!category) {
    return <div>Category not found</div>;
  }

  const filteredItems = menuItems.filter((item) => {
    if (item.category !== slug) return false;
    if (selectedFilters.includes("all")) return true;
    return selectedFilters.includes(item.subcategory);
  });

  const toggleFilter = (sub: string) => {
    setSelectedFilters((prev) => {
      if (sub === "all") return ["all"];
      const next = prev.includes(sub)
        ? prev.filter((s) => s !== sub)
        : [...prev.filter((s) => s !== "all"), sub];
      return next.length === 0 ? ["all"] : next;
    });
  };

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
  };

  const handleToggleFavorite = (item: MenuItem) => {
    toggleFavorite({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
  };

  // AI text box and image fallbacks are handled inside ItemDetailsDialog

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Category Hero */}
      <CategoryHero
        name={category.name}
        tagline={(category as any).tagline || category.description}
        heroImage={(category as any).heroImage || "/placeholder.jpg"}
      />

      {/* Breadcrumb */}
      <section className="container mx-auto px-4">
        <div className="flex items-center gap-2 py-4 text-sm">
          <Link
            href="/menu"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Menu
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="px-2 py-1 rounded-full bg-muted text-foreground">
            {category.name}
          </span>
        </div>
      </section>

      {/* Section intro */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Our {category.name} Selection
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated {category.name.toLowerCase()} menu,
            featuring fresh ingredients and expertly crafted dishes.
          </p>
        </div>
      </section>

      {/* Items Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Subcategory Filters */}
          <CategoryFilters
            selected={selectedFilters}
            subcategories={category.subcategories}
            onToggle={toggleFilter}
            onClear={() => setSelectedFilters(["all"])}
            total={filteredItems.length}
          />

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                isFavorite={(id) => isFavorite(id)}
                onToggleFavorite={handleToggleFavorite}
                onAddToCart={handleAddToCart}
                onViewDetails={setOpenItem}
              />
            ))}
          </div>

          {/* No results message */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No items found in this category
              </h3>
              <p className="text-muted-foreground">
                Try filtering by a different type or browse all items
              </p>
            </div>
          )}
        </div>
      </section>

      {/* View Details Dialog */}
      <ItemDetailsDialog
        item={openItem}
        categoryName={category.name}
        isFavorite={(id) => isFavorite(id)}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onOpenChange={(open) => !open && setOpenItem(null)}
      />

      <Footer />
    </div>
  );
}
