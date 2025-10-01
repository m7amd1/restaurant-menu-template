"use client";  
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MenuCategories } from "@/components/menu-categories";
import { HeroSlider } from "@/components/hero-slider";
import { fetchMenuData, type Category } from "@/lib/menu-data";
import { LoadingSpinner } from "@/components/LoadingSpinner"; // Import LoadingSpinner

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true); // Reintroduced loading state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMenuData = async () => {
      try {
        const data = await fetchMenuData();
        console.log("Categories fetched for MenuPage:", data); // Debugging log
        setCategories(data);
      } catch (err: any) {
        setError(err.message || "Failed to load menu data.");
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    getMenuData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSlider />
      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <div className="text-center text-red-500">
            <p>{error}</p>
            <p>Please ensure the POS API is configured correctly.</p>
          </div>
        )}
        {!loading && !error && <MenuCategories categories={categories} />}
      </main>
      <Footer />
    </div>
  );
}
