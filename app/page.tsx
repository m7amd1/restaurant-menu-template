import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background relative">
        {/* Fixed subtle background texture (parallax) */}
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-[url('/traditional-middle-eastern-desserts-baklava-kunafa.jpg')] bg-cover bg-center bg-fixed opacity-10"
          aria-hidden
        />

        <Header />

        {/* Single-image hero (no slider) */}
        <section className="relative w-full h-[calc(100vh-65px)] overflow-hidden">
          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1504718855392-c0f33b372e72?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D"
            alt="Delicious Middle Eastern dishes on a dark rustic background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Readability gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

          {/* Centered content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full backdrop-blur border border-white/20 shadow-sm">
                  <span className="text-xs font-medium tracking-wide">
                    Experience Authentic Flavors
                  </span>
                </div>

                <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight text-balance">
                  Welcome to Authentic Restaurant
                </h1>
                <p className="mt-3 text-base md:text-lg text-gray-200 text-pretty max-w-xl">
                  Traditional Middle Eastern cuisine crafted with passion and
                  the finest ingredients.
                </p>

                <div className="mt-6">
                  <Button
                    asChild
                    className="rounded-full bg-white text-gray-900 hover:bg-white/90 transition-colors shadow-lg px-6 h-11 dark:bg-black dark:text-white"
                  >
                    <Link href="/menu" aria-label="Explore our menu">
                      Explore Our Menu
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
}
