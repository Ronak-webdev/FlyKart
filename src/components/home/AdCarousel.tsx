"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Advertisement } from "@prisma/client";
import { AdvertisementBanner } from "@/components/shared/AdvertisementBanner";

export function AdCarousel({ ads }: { ads: Advertisement[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  if (!ads || ads.length === 0) return null;

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-7xl mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {ads.map((ad, index) => (
          <CarouselItem key={ad.id}>
            <div className="p-1">
              <AdvertisementBanner ad={ad} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden md:block">
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </div>
    </Carousel>
  );
}
