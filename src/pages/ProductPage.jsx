import ProductTitle from "../components/productComponents/productTitle"
import OrderProductForm from "../components/productComponents/orderProductForm"

import ProductImages from "../components/productComponents/productImages"

export default function ProductPage() {
  return (
    <div className="w-full min-h-screen p-8 flex gap-16">
      {/* left side */}
      <div className="flex-1 h-full border-amber-500 border-2 border-solid rounded-lg">
        <ProductTitle />
        <OrderProductForm />
      </div>

      {/* right side */}
      <div className="w-auto h-full border-amber-500 border-2 border-solid rounded-lg">
        <ProductImages />
      </div>
    </div>
  )
}