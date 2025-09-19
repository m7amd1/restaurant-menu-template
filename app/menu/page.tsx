import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MenuCategories } from "@/components/menu-categories";
import { HeroSlider } from "@/components/hero-slider";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSlider />
      <main className="container mx-auto px-4 py-8">
        <MenuCategories />
      </main>
      <Footer />
    </div>
  );
}
