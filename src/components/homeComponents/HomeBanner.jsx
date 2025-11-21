import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react"
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { homeBannerApi } from "../../services";

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
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Load banners from API on mount
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        const banners = await homeBannerApi.getAllHomeBanners();
        setSlides(banners);
      } catch (error) {
        console.error('Error fetching home banners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[440px] bg-black flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-white"></span>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="h-[440px] bg-black flex items-center justify-center">
        <p className="text-white text-xl">No banners available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Carousel */}
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              className="h-[440px] flex items-center justify-center relative bg-black mb-8"
            >
              {slide.publicUrl && (
                <img
                  src={slide.publicUrl}
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