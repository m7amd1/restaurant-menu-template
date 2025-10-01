"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SlideData {
  id: number;
  title: string;
  description: string;
  image: string;
  offer?: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "Authentic Chicken Kabsa",
    description:
      "Traditional chicken kabsa prepared with basmati rice and authentic Middle Eastern spices, served with fresh vegetables and aromatic herbs",
    image: "/slider1.jpg",
    offer: "20% Off",
  },
  {
    id: 2,
    title: "Premium Mixed Grill",
    description:
      "A delicious variety of the finest Middle Eastern grilled meats, marinated with special spices and grilled over charcoal",
    image: "/slider2.jpg",
    offer: "Special Offer",
  },
  {
    id: 3,
    title: "Fresh Middle Eastern Desserts",
    description:
      "A selection of the most delicious Middle Eastern desserts prepared daily with the finest ingredients and authentic taste",
    image: "/slider3.jpg",
    offer: "New",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // const goToPrevious = () => {
  //   setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  //   setIsAutoPlaying(false)
  //   setTimeout(() => setIsAutoPlaying(true), 10000)
  // }

  // const goToNext = () => {
  //   setCurrentSlide((prev) => (prev + 1) % slides.length)
  //   setIsAutoPlaying(false)
  //   setTimeout(() => setIsAutoPlaying(true), 10000)
  // }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-muted">
      {/* الشرائح */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-full h-full">
              <img
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* طبقة التدرج */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

              {/* محتوى الشريحة */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl text-white space-y-4">
                    {slide.offer && (
                      <div className="inline-block">
                        <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                          {slide.offer}
                        </span>
                      </div>
                    )}
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-balance">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 text-pretty max-w-xl">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* مؤشرات الشرائح */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
