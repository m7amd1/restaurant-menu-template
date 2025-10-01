"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/favorites-context";

import {
  fetchMenuData,
  type MenuItem,
  type Category,
  type Level2Category,
} from "@/lib/menu-data";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CategoryFilters } from "@/components/category/CategoryFilters";
import { ItemCard } from "@/components/category/ItemCard";
import { ItemDetailsDialog } from "@/components/category/ItemDetailsDialog";
import { LoadingSpinner } from "@/components/LoadingSpinner"; // Import LoadingSpinner

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["all"]);
  const [openItem, setOpenItem] = useState<MenuItem | null>(null);
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true); // Reintroduced loading state
  const [error, setError] = useState<string | null>(null);

  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const allCategories = await fetchMenuData();
        console.log("Current slug:", slug); // Debugging log
        console.log("All fetched categories:", allCategories); // Debugging log

        const currentCategory = allCategories.find((cat) => cat.id === slug);
        if (currentCategory) {
          setCategoryData(currentCategory);
        } else {
          setError("Category not found.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load menu data.");
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    getCategoryData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 text-center text-red-500">
          <p>{error}</p>
          <p>
            Please ensure the POS API is configured correctly or the category
            exists.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 text-center">
          <p>Category not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  let subcategories: string[] = [];
  let allItems: MenuItem[] = [];

  if (
    categoryData.level2Categories &&
    categoryData.level2Categories.length > 0
  ) {
    // For "drinks" category with nested level2 structure
    subcategories = Array.from(
      new Set(categoryData.level2Categories.map((cat) => cat.name))
    ).sort();
    allItems = categoryData.level2Categories.flatMap((cat) => cat.items || []);
  } else if (categoryData.items) {
    // For other categories with a flat items array
    subcategories = Array.from(
      new Set(categoryData.items.map((item) => item.subcategory))
    ).sort();
    allItems = categoryData.items;
  }

  const filteredItems = allItems.filter((item) => {
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Category Hero */}
      <CategoryHero
        name={
          categoryData.name === "بيتزا"
            ? "Pizza"
            : categoryData.name === "مشروبات"
            ? "Drinks"
            : categoryData.name
        }
        tagline={categoryData.description}
        heroImage={
          categoryData.name === "بيتزا"
            ? "/pizza2.jpg"
            : categoryData.name === "مشروبات"
            ? "/cold-drinks.jpg"
            : "/placeholder.jpg"
        }
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
            {categoryData.name === "بيتزا"
              ? "Pizza"
              : categoryData.name === "مشروبات"
              ? "Drinks"
              : categoryData.name}
          </span>
        </div>
      </section>

      {/* Section intro */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Our{" "}
            {categoryData.name === "بيتزا"
              ? "Pizza"
              : categoryData.name === "مشروبات"
              ? "Drinks"
              : categoryData.name}{" "}
            Selection
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated{" "}
            {categoryData.name === "بيتزا"
              ? "Pizza"
              : categoryData.name === "مشروبات"
              ? "Drinks"
              : categoryData.name}{" "}
            menu, featuring fresh ingredients and expertly crafted dishes.
          </p>
        </div>
      </section>

      {/* Items Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Subcategory Filters */}
          <CategoryFilters
            selected={selectedFilters}
            subcategories={["all", ...subcategories]}
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
                isFavorite={(id) => isFavorite(id.toString())}
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
        categoryName={categoryData.name}
        isFavorite={(id) => isFavorite(id.toString())}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onOpenChange={(open) => !open && setOpenItem(null)}
      />

      <Footer />
    </div>
  );
}
