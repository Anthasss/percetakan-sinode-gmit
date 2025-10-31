import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import CarouselSlideEditor from "../../components/homeComponents/CarouselSlideEditor";
import { useAuthWithBackend } from "../../hooks/useAuthWithBackend";
import carouselData from "../../json/carousel.json";
import toast from "../../utils/toast";

export default function ManagePromoPage() {
  const { isAuthenticated, backendUser, isSyncing } = useAuthWithBackend();
  const [slides, setSlides] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

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
    setSlides(slides.filter(slide => slide.id !== slideId));
    setHasChanges(true);
    toast.success("Slide deleted");
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
            <div
              key={slide.id}
              className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: slide.backgroundColor }}
            >
              <CarouselSlideEditor
                slide={slide}
                onDelete={handleDeleteSlide}
              />
              {slide.imageUrl && slide.imageUrl.startsWith('/') ? (
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              ) : slide.imageUrl ? (
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              ) : null}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                <h3 className="text-lg font-bold truncate">{slide.title}</h3>
                {slide.description && (
                  <p className="text-sm truncate">{slide.description}</p>
                )}
              </div>
            </div>
          ))}
          
          {/* Add New Slide Card */}
          <div className="h-64 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-primary hover:bg-base-200 transition-colors">
            <CarouselSlideEditor
              isAddSlide={true}
              onAdd={handleAddSlide}
            />
          </div>
        </div>

        {/* Unsaved Changes Warning */}
        {hasChanges && (
          <div className="alert alert-warning mt-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>You have unsaved changes. Don't forget to save!</span>
          </div>
        )}
      </div>
    </div>
  );
}
