import HomeCarousel from "../components/homeComponents/HomeCarousel"
import ProductRowContainer from "../components/homeComponents/ProductRowContainer"
import ProductRow from "../components/homeComponents/ProductRow"
import ProductRowCard from "../components/homeComponents/ProductRowCard"

export default function HomePage(){
  return (
    <div className="w-full h-screen p-8 flex flex-col gap-16">
      <HomeCarousel/>
      <ProductRowContainer>
        <ProductRow title="Featured Products">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductRowCard key={index} />
          ))}
        </ProductRow>
        <ProductRow title="Print">
          {Array.from({ length: 3 }).map((_, index) => (
            <ProductRowCard key={index} />
          ))}
        </ProductRow>
        <ProductRow title="Outdoor">
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductRowCard key={index} />
          ))}
        </ProductRow>
      </ProductRowContainer>
    </div>
  )
}