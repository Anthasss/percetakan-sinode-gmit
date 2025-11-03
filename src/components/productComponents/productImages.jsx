import { useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import productsData from "../../json/products.json";
import { PrevButton, NextButton } from "./ProductImageNavButtons";

export default function ProductImages() {
  const { productId } = useParams();
  const product = productsData.products.find(p => p.id === parseInt(productId));
  const [selectedImage, setSelectedImage] = useState(0);

  // Use product images if available, otherwise use placeholder
  const images = product?.image && product.image.length > 0 
    ? product.image 
    : ["/p_dummy.png"];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />,
    centerMode: false,
    variableWidth: false,
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
        src={images[selectedImage]}
        alt={product?.title || "product"}
        className="w-full aspect-square object-contain max-w-sm border-2 border-neutral rounded-md bg-base-200"
      />

      {/* smaller images slider */}
      {images.length > 1 && (
        <div className="py-2 mb-16 w-full max-w-md p-8">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="px-1">
                <div 
                  className={`border-2 rounded-md overflow-hidden cursor-pointer ${
                    selectedImage === index ? 'border-primary' : 'border-neutral'
                  }`}
                  style={{ width: '64px', height: '64px' }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product?.title || 'product'} thumbnail ${index + 1}`}
                    className="w-full h-full object-contain hover:opacity-80 transition-opacity bg-base-200"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}
