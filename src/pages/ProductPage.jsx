import { useParams } from "react-router-dom";
import ProductTitle from "../components/productComponents/productTitle"
import OrderProductForm from "../components/productComponents/orderProductForm"
import ProductImages from "../components/productComponents/productImages"
import QuantityPicker from "../components/productComponents/quantityPicker"
import productsData from "../json/products.json";
import { OrderProvider } from "../context/OrderContext";

export default function ProductPage() {
  const { productId } = useParams();

  // Find the product to check its form component
  const product = productsData.products.find(p => p.id === parseInt(productId));
  const hideQuantityPicker = product?.formComponent === "SablonBajuForm";

  return (
    <OrderProvider>
      <div className="w-full min-h-screen p-4 md:p-8 flex flex-col-reverse md:flex-row gap-8 md:gap-16">
        {/* left side - Bottom on mobile, Left on desktop */}
        <div className="flex-1 flex flex-col rounded-lg">
          <ProductTitle productId={productId} />
          <OrderProductForm productId={productId} />
        </div>

        {/* right side - Top on mobile, Right on desktop */}
        <div className="w-full md:w-auto h-full rounded-lg">
          <ProductImages productId={productId} />
          {!hideQuantityPicker && <QuantityPicker productId={productId} />}
        </div>
      </div>
    </OrderProvider>
  )
}