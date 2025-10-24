import productsData from "../../json/products.json";
import PrintBiasaForm from "../productFormComponents/PrintBiasaForm";
import BukuForm from "../productFormComponents/BukuForm";
import UndanganForm from "../productFormComponents/UndanganForm";
import StickerForm from "../productFormComponents/StickerForm";
import SpandukBalihoForm from "../productFormComponents/SpandukBalihoForm";
import RollBannerForm from "../productFormComponents/RollBannerForm";
import XBannerForm from "../productFormComponents/XBannerForm";
import NeonBoxForm from "../productFormComponents/NeonBoxForm";
import KransBungaForm from "../productFormComponents/KransBungaForm";
import BatuNisanForm from "../productFormComponents/BatuNisanForm";
import StempelForm from "../productFormComponents/StempelForm";
import SablonGelasForm from "../productFormComponents/SablonGelasForm";
import SablonPiringForm from "../productFormComponents/SablonPiringForm";
import SablonBajuForm from "../productFormComponents/SablonBajuForm";

// Form component mapping
const formComponents = {
  PrintBiasaForm: PrintBiasaForm,
  BukuForm: BukuForm,
  UndanganForm: UndanganForm,
  StickerForm: StickerForm,
  SpandukBalihoForm: SpandukBalihoForm,
  RollBannerForm: RollBannerForm,
  XBannerForm: XBannerForm,
  NeonBoxForm: NeonBoxForm,
  KransBungaForm: KransBungaForm,
  BatuNisanForm: BatuNisanForm,
  StempelForm: StempelForm,
  SablonGelasForm: SablonGelasForm,
  SablonPiringForm: SablonPiringForm,
  SablonBajuForm: SablonBajuForm,
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
    <div className="w-full flex-1 border-2 border-neutral rounded-lg p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Form Pemesanan - {product.title}</h2>
      <div className="flex-1 overflow-auto">
        {FormComponent ? (
          <FormComponent onSubmit={handleFormSubmit} />
        ) : (
          <p className="text-warning">Form belum tersedia untuk produk ini</p>
        )}
      </div>
    </div>
  );
}