import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import CarouselSlideEditor from "../../components/homeComponents/CarouselSlideEditor";
import CarouselSlideCard from "../../components/homeComponents/CarouselSlideCard";
import DeleteSlideModal from "../../components/homeComponents/DeleteSlideModal";
import { useAuthWithBackend } from "../../hooks/useAuthWithBackend";
import carouselData from "../../json/carousel.json";
import toast from "../../utils/toast";

export default function ManagePromoPage() {
  const { isAuthenticated, backendUser, isSyncing } = useAuthWithBackend();
  const [slides, setSlides] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState(null);

  useEffect(() => {
    // Load saved slides from localStorage or use default
    const savedSlides = localStorage.getItem('carouselSlides');
    if (savedSlides) {
      setSlides(JSON.parse(savedSlides));
    } else {
      setSlides(carouselData.slides);
    }
  }, []);

  const handleDeleteSlide = (slideId) => {
    if (slides.length <= 1) {
      toast.error("Cannot delete the last slide");
      return;
    }
    // Show confirmation dialog
    setSlideToDelete(slideId);
    document.getElementById('delete_slide_modal').showModal();
  };

  const confirmDeleteSlide = () => {
    if (slideToDelete) {
      setSlides(slides.filter(slide => slide.id !== slideToDelete));
      setHasChanges(true);
      toast.success("Slide deleted");
      setSlideToDelete(null);
    }
  };

  const cancelDeleteSlide = () => {
    setSlideToDelete(null);
  };

  const handleAddSlide = (newSlide) => {
    setSlides([...slides, newSlide]);
    setHasChanges(true);
    toast.success("Slide added successfully");
  };

  const handleSaveChanges = () => {
    // TODO: In a real app, this would save to backend/API
    localStorage.setItem('carouselSlides', JSON.stringify(slides));
    setHasChanges(false);
    toast.success("Carousel changes saved!");
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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Manage Carousel</h1>
            <button
              className="btn btn-success gap-2"
              onClick={handleSaveChanges}
              disabled={!hasChanges}
            >
              <Save size={20} />
              Save Changes
            </button>
          </div>
        </div>

        {/* Slides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <CarouselSlideCard
              key={slide.id}
              slide={slide}
              onDelete={handleDeleteSlide}
            />
          ))}
          
          {/* Add New Slide Card */}
          <div className="h-64 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-primary hover:bg-base-200 transition-colors">
            <CarouselSlideEditor
              isAddSlide={true}
              onAdd={handleAddSlide}
            />
          </div>
        </div>

        <DeleteSlideModal
          onConfirm={confirmDeleteSlide}
          onCancel={cancelDeleteSlide}
        />
      </div>
    </div>
  );
}
