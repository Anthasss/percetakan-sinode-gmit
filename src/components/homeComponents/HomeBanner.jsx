import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react"
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import carouselData from "../../json/carousel.json";

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300"
      aria-label="Previous slide"
    >
      <ChevronLeftCircle size={40} />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300"
      aria-label="Next slide"
    >
      <ChevronRightCircle size={40} />
    </button>
  );
}

export default function HomeBanner() {
  const [slides, setSlides] = useState(carouselData.slides);

  const settings = {
    dots: true,
    infinite: slides.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Load saved slides on mount
  useEffect(() => {
    const savedSlides = localStorage.getItem('carouselSlides');
    if (savedSlides) {
      setSlides(JSON.parse(savedSlides));
    }
  }, []);

  return (
    <div className="relative">
      {/* Carousel */}
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              className="h-[440px] flex items-center justify-center relative bg-black"
            >
              {slide.imageUrl && (
                <img
                  src={slide.imageUrl}
                  alt="Banner slide"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}