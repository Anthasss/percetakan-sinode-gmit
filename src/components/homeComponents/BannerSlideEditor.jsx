import { X, Plus } from "lucide-react";
import { useState } from "react";
import { homeBannerApi } from "../../services";
import toast from "../../utils/toast";

export default function BannerSlideEditor({ slide, onDelete, onAdd, isAddSlide = false }) {
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type - allow common variations (especially for mobile)
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const fileType = file.type.toLowerCase();
      
      // Also check file extension as fallback for mobile devices
      const fileName = file.name.toLowerCase();
      const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
      const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
      
      if (!validTypes.includes(fileType) && !hasValidExtension) {
        console.error('Invalid file type:', file.type, 'File name:', file.name);
        toast.error('Please upload a JPEG, PNG, or WebP image');
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      console.log('File accepted:', file.name, 'Type:', file.type, 'Size:', file.size);
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSlide = async () => {
    if (!selectedFile) {
      toast.error('Please select an image');
      return;
    }

    try {
      setIsUploading(true);
      const newBanner = await homeBannerApi.uploadHomeBanner(selectedFile);
      onAdd(newBanner);
      toast.success('Banner uploaded successfully');
      
      // Reset form
      setImagePreview("");
      setSelectedFile(null);
      document.getElementById('add_slide_modal').close();
    } catch (error) {
      console.error('Error uploading banner:', error);
      toast.error(error.response?.data?.error || 'Failed to upload banner');
    } finally {
      setIsUploading(false);
    }
  };

  if (isAddSlide) {
    return (
      <>
        <button
          className="btn btn-circle btn-primary btn-lg"
          onClick={() => document.getElementById('add_slide_modal').showModal()}
        >
          <Plus size={32} />
        </button>

        <dialog id="add_slide_modal" className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Add New Slide</h3>
            
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Upload Image</span>
              </label>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                capture="environment"
                className="file-input file-input-bordered w-full"
                onChange={handleImageUpload}
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={handleAddSlide}
                disabled={!imagePreview || isUploading}
              >
                {isUploading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Uploading...
                  </>
                ) : (
                  'Add Slide'
                )}
              </button>
              <form method="dialog">
                <button className="btn" disabled={isUploading}>Cancel</button>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    );
  }

  return (
    <div className="relative">
      <button
        className="absolute top-2 right-2 z-20 btn btn-error btn-sm btn-circle"
        onClick={() => onDelete(slide.id)}
      >
        <X size={20} />
      </button>
    </div>
  );
}
