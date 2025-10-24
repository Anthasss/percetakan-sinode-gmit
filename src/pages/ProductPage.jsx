import { useParams } from "react-router-dom";
import ProductTitle from "../components/productComponents/productTitle"
import OrderProductForm from "../components/productComponents/orderProductForm"
import ProductImages from "../components/productComponents/productImages"
import QuantityPicker from "../components/productComponents/quantityPicker"

export default function ProductPage() {
  const { productId } = useParams();

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
        <QuantityPicker />
      </div>
    </div>
  )
}