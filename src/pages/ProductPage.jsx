import ProductTitle from "../components/productComponents/productTitle"
import OrderProductForm from "../components/productComponents/orderProductForm"

export default function ProductPage() {
  return (
    <div className="w-full min-h-screen p-8 flex gap-16">
      <div className="flex-1 h-full w-full border-amber-500 border-2 border-solid rounded-lg">
        <ProductTitle />
        <OrderProductForm />
      </div>
      <div className="flex-1 h-full w-full border-amber-500 border-2 border-solid rounded-lg">

      </div>
    </div>
  )
}