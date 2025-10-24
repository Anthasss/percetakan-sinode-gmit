import productsData from "../../json/products.json";
import PrintBiasaForm from "../productFormComponents/PrintBiasaForm";

// Form component mapping
const formComponents = {
  PrintBiasaForm: PrintBiasaForm,
  // Add other form components here as they are created
};

export default function OrderProductForm({ productId }) {
  // Find product by ID
  const product = productsData.products.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="w-full flex-1 border-2 border-neutral rounded-lg p-4">
        <p className="text-error">Product {productId} not found</p>
      </div>
    );
  }

  // Get the form component
  const FormComponent = formComponents[product.formComponent];

  const handleFormSubmit = (formData) => {
    console.log("Order submitted for product:", product.title);
    console.log("Form data:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="w-full flex-1 border-2 border-neutral rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Form Pemesanan - {product.title}</h2>
      {FormComponent ? (
        <FormComponent onSubmit={handleFormSubmit} />
      ) : (
        <p className="text-warning">Form belum tersedia untuk produk ini</p>
      )}
    </div>
  );
}