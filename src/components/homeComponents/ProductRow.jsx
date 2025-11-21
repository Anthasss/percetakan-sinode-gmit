import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Children, useState, useEffect } from "react";

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-10 text-base-content hover:text-primary transition-colors"
      aria-label="Previous"
    >
      <ChevronLeft size={32} />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-10 text-base-content hover:text-primary transition-colors"
      aria-label="Next"
    >
      <ChevronRight size={32} />
    </button>
  );
}

export default function ProductRow({ title, children }) {
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setSlidesToShow(1);
      } else if (width <= 1024) {
        setSlidesToShow(2);
      } else if (width <= 1280) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="divider divider-neutral divider-start">{title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}</div>
      <div className="w-full">
        <div className="px-8">
          <style>{`
            .slick-track {
              display: flex !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
            .slick-slide {
              float: none !important;
              display: flex !important;
            }
            .slick-slide > div {
              width: 100%;
            }
          `}</style>
          <Slider {...settings}>
            {Children.map(children, (child, index) => (
              <div
                key={index}
                className="px-2 h-full"
              >
                {child}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
