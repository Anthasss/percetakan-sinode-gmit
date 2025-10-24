import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductImages() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center">
      {/* large image */}
      <img
        src="p_dummy.png"
        alt="this product"
        className="w-full aspect-square object-cover max-w-sm border-2 border-neutral rounded-md"
      />

      {/* smaller images slider */}
      <div className="py-2 w-full max-w-sm mb-16">
        <Slider {...settings}>
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="px-1">
              <div className="border-2 border-neutral rounded-md overflow-hidden">
                <img
                  src="p_dummy.png"
                  alt={`product thumbnail ${index + 1}`}
                  className="w-full aspect-square object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
