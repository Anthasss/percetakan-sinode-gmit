import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import BannerSlideEditor from "../../components/homeComponents/BannerSlideEditor";
import BannerSlideCard from "../../components/homeComponents/BannerSlideCard";
import DeleteSlideModal from "../../components/homeComponents/DeleteSlideModal";
import { useAuthWithBackend } from "../../hooks/useAuthWithBackend";
import { homeBannerApi } from "../../services";
import toast from "../../utils/toast";

export default function ManageHomeBannerPage() {
  const { isAuthenticated, backendUser, isSyncing } = useAuthWithBackend();
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [slideToDelete, setSlideToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        const banners = await homeBannerApi.getAllHomeBanners();
        setSlides(banners);
      } catch (error) {
        console.error('Error fetching home banners:', error);
        toast.error('Failed to load banners');
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if authenticated as admin
    if (isAuthenticated && backendUser?.role === 'admin') {
      fetchBanners();
    }
  }, [isAuthenticated, backendUser]);

  const handleDeleteSlide = (slideId) => {
    if (slides.length <= 1) {
      toast.error("Cannot delete the last slide");
      return;
    }
    // Show confirmation dialog
    setSlideToDelete(slideId);
    document.getElementById('delete_slide_modal').showModal();
  };

  const confirmDeleteSlide = async () => {
    if (!slideToDelete) return;

    try {
      setIsDeleting(true);
      await homeBannerApi.deleteHomeBanner(slideToDelete);
      setSlides(slides.filter(slide => slide.id !== slideToDelete));
      toast.success("Slide deleted successfully");
      setSlideToDelete(null);
      document.getElementById('delete_slide_modal').close();
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error(error.response?.data?.error || 'Failed to delete banner');
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDeleteSlide = () => {
    setSlideToDelete(null);
  };

  const handleAddSlide = (newSlide) => {
    setSlides([newSlide, ...slides]); // Add to beginning (newest first)
  };

  // Show loading while checking authentication
  if (isSyncing || (isAuthenticated && !backendUser)) {
    return (
      <div className="w-full min-h-screen p-4 md:p-8 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Check if user is admin
  if (!isAuthenticated || backendUser?.role !== 'admin') {
    return (
      <div className="w-full min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-lg">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Actions */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Manage Carousel</h1>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {/* Slides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slides.map((slide) => (
                <BannerSlideCard
                  key={slide.id}
                  slide={slide}
                  onDelete={handleDeleteSlide}
                />
              ))}
              
              {/* Add New Slide Card */}
              <div className="h-64 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-primary hover:bg-base-200 transition-colors">
                <BannerSlideEditor
                  isAddSlide={true}
                  onAdd={handleAddSlide}
                />
              </div>
            </div>

            <DeleteSlideModal
              onConfirm={confirmDeleteSlide}
              onCancel={cancelDeleteSlide}
              isDeleting={isDeleting}
            />
          </>
        )}
      </div>
    </div>
  );
}
