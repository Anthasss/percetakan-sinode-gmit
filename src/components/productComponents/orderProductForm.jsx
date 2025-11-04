import { useNavigate } from "react-router-dom";
import productsData from "../../json/products.json";
import { useOrder } from "../../context/OrderContext";
import { useAuthWithBackend } from "../../hooks/useAuthWithBackend";
import { orderApi } from "../../services/orderApi";
import toast from "../../utils/toast";
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
  const navigate = useNavigate();
  const { quantity, updateOrderSpecifications, isSubmitting, setIsSubmitting, resetOrder } = useOrder();
  const { isAuthenticated, user } = useAuthWithBackend();

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

  const handleFormSubmit = async (formData) => {
    if (!isAuthenticated) {
      toast.warning('Please login to place an order');
      return;
    }

    console.log("Order submitted for product:", product.title);
    console.log("Form data:", formData);
    console.log("Quantity:", quantity);

    setIsSubmitting(true);

    try {
      // Extract files from formData
      let files = [];
      const orderSpecifications = { quantity };

      // Process formData to separate files from other data
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        
        // Check if value is FileList or File
        if (value instanceof FileList || value instanceof File) {
          files = value instanceof FileList ? Array.from(value) : [value];
        } else if (value !== null && value !== undefined && value !== '') {
          // Only include non-empty, non-file values in orderSpecifications
          orderSpecifications[key] = value;
        }
      });

      console.log('Order specifications (without files):', orderSpecifications);
      console.log('Files to upload:', files);

      // Create order with files
      const orderResponse = await orderApi.create({
        userId: user.sub,
        productId: parseInt(productId),
        price: null, // Price will be set by admin
        orderSpecifications,
        files, // Pass files separately
      });

      console.log('Order created successfully:', orderResponse);
      
      // Reset the form and navigate to orders page
      resetOrder();
      toast.success('Order placed successfully! Waiting for admin to set the price.');
      
      // Delay navigation to show toast
      setTimeout(() => {
        navigate('/my-order');
      }, 1000);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex-1 border-2 border-neutral rounded-lg p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Form Pemesanan - {product.title}</h2>
      {!isAuthenticated && (
        <div className="alert alert-warning mb-4">
          <span>Please login to place an order</span>
        </div>
      )}
      <div className="flex-1 overflow-auto">
        {FormComponent ? (
          <FormComponent onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        ) : (
          <p className="text-warning">Form belum tersedia untuk produk ini</p>
        )}
      </div>
    </div>
  );
}