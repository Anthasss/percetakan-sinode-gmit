import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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

export default function HomeCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  return (
    <Slider {...settings}>
      <div className="h-64 bg-red-500 flex items-center justify-center">
        <h2 className="text-white text-2xl">Slide 1</h2>
      </div>
      <div className="h-64 bg-blue-500 flex items-center justify-center">
        <h2 className="text-white text-2xl">Slide 2</h2>
      </div>
      <div className="h-64 bg-green-500 flex items-center justify-center">
        <h2 className="text-white text-2xl">Slide 3</h2>
      </div>
    </Slider>
  )
}