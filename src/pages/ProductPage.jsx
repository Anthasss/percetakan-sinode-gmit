import { useParams } from "react-router-dom";
import ProductTitle from "../components/productComponents/productTitle"
import OrderProductForm from "../components/productComponents/orderProductForm"
import ProductImages from "../components/productComponents/productImages"
import QuantityPicker from "../components/productComponents/quantityPicker"
import productsData from "../json/products.json";

export default function ProductPage() {
  const { productId } = useParams();

  // Find the product to check its form component
  const product = productsData.products.find(p => p.id === parseInt(productId));
  const hideQuantityPicker = product?.formComponent === "SablonBajuForm";

  return (
    <div className="w-full min-h-screen p-8 flex gap-16">
      {/* left side */}
      <div className="flex-1 flex flex-col rounded-lg">
        <ProductTitle productId={productId} />
        <OrderProductForm productId={productId} />
      </div>

      {/* right side */}
      <div className="w-auto h-full rounded-lg">
        <ProductImages productId={productId} />
        {!hideQuantityPicker && <QuantityPicker />}
      </div>
    </div>
  )
}