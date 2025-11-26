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
    console.log('File selected:', file); // Debug log
    
    if (file) {
      console.log('File details:', {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
      });

      // More lenient validation - just check if it's an image
      if (!file.type.startsWith('image/')) {
        console.error('Not an image file:', file.type);
        toast.error('Please upload an image file');
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        console.error('File too large:', file.size);
        toast.error('Image size must be less than 5MB');
        return;
      }

      console.log('File validation passed, setting preview...');
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('Image preview loaded');
        setImagePreview(reader.result);
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        toast.error('Failed to read image file');
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  };

  const handleAddSlide = async () => {
    if (!selectedFile) {
      toast.error('Please select an image');
      return;
    }

    console.log('Starting upload with file:', selectedFile.name);

    try {
      setIsUploading(true);
      const newBanner = await homeBannerApi.uploadHomeBanner(selectedFile);
      console.log('Upload successful:', newBanner);
      onAdd(newBanner);
      toast.success('Banner uploaded successfully');
      
      // Reset form
      setImagePreview("");
      setSelectedFile(null);
      document.getElementById('add_slide_modal').close();
    } catch (error) {
      console.error('Error uploading banner:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
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
                accept="image/*"
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
