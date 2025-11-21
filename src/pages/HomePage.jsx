import HomeBanner from "../components/homeComponents/HomeBanner"
import ProductRowContainer from "../components/homeComponents/ProductRowContainer"
import ProductRow from "../components/homeComponents/ProductRow"
import ProductRowCard from "../components/homeComponents/ProductRowCard"
import CustomOrderSection from "../components/homeComponents/CustomOrderSection"
import productsData from "../json/products.json"

export default function HomePage(){
  const { products } = productsData;

  // Filter products by category
  const printProducts = products.filter(product => product.category === "print");
  const outdoorProducts = products.filter(product => product.category === "outdoor");
  const othersProducts = products.filter(product => product.category === "others");

  return (
    <div className="w-full min-h-screen p-8 flex flex-col gap-8">
      <h1 className="text-center text-2xl font-bold">Selamat datang di Percetakan Sinode GMIT</h1>
      <HomeBanner />
      <ProductRowContainer>
        <ProductRow title="Print">
          {printProducts.map((product) => (
            <ProductRowCard key={product.id} product={product} />
          ))}
        </ProductRow>
        <ProductRow title="Outdoor">
          {outdoorProducts.map((product) => (
            <ProductRowCard key={product.id} product={product} />
          ))}
        </ProductRow>
        <ProductRow title="Others">
          {othersProducts.map((product) => (
            <ProductRowCard key={product.id} product={product} />
          ))}
        </ProductRow>
        
        <CustomOrderSection />
      </ProductRowContainer>
    </div>
  )
}