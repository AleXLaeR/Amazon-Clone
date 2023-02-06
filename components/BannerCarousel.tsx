import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Carousel, CarouselProps } from 'react-responsive-carousel';
import Image from 'next/image';

import CarouselImg_1 from 'public/carousel-item-1.jpg';
import CarouselImg_2 from 'public/carousel-item-2.jpg';
import CarouselImg_3 from 'public/carousel-item-3.jpg';

const defaultCarouselProps: Partial<CarouselProps> = {
  autoPlay: true,
  infiniteLoop: true,
  showStatus: false,
  showIndicators: false,
  showThumbs: false,
  showArrows: true,
  interval: 5e3,
  transitionTime: 5e2,
};

const images = [CarouselImg_1, CarouselImg_2, CarouselImg_3];

export default function BannerCarousel() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel {...defaultCarouselProps}>
        {images.map((image, idx) => (
          <div key={idx}>
            <Image src={image} alt={`slide ${idx + 1}`} loading="lazy" priority={false} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
