import Image from "next/image";
import { useState } from "react";

interface CategoryHeroProps {
  name: string;
  tagline: string;
  heroImage: string;
}

export function CategoryHero({ name, tagline, heroImage }: CategoryHeroProps) {
  const [imageError, setImageError] = useState(false);
  return (
    <section className="relative">
      <div className="relative h-[260px] md:h-[360px] w-full overflow-hidden">
        {/* Background image using next/image for consistency */}
        <Image
          src={
            imageError ? "/placeholder.jpg" : heroImage || "/placeholder.jpg"
          }
          alt={name}
          fill
          sizes="100vw"
          priority
          className="object-cover"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-xl bg-white/90 text-foreground shadow">
              <span className="text-xl">🍽️</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">
              {name}
            </h1>
            <p className="mt-2 text-white/90 text-sm md:text-base">{tagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
