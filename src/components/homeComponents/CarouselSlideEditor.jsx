import { X, Plus, Upload } from "lucide-react";
import { useState } from "react";

export default function CarouselSlideEditor({ slide, onDelete, onAdd, isAddSlide = false }) {
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#000000");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSlide = () => {
    if (imagePreview || title) {
      const newSlide = {
        id: Date.now(),
        imageUrl: imagePreview || "",
        title: title || "New Slide",
        description: description || "",
        backgroundColor: backgroundColor
      };
      onAdd(newSlide);
      // Reset form
      setImagePreview("");
      setTitle("");
      setDescription("");
      setBackgroundColor("#000000");
      document.getElementById('add_slide_modal').close();
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
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter slide title"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Description (Optional)</span>
              </label>
              <textarea
                placeholder="Enter slide description"
                className="textarea textarea-bordered"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Background Color</span>
              </label>
              <input
                type="color"
                className="input input-bordered w-full h-12"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>

            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Upload Image (Optional)</span>
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
                disabled={!imagePreview && !title}
              >
                Add Slide
              </button>
              <form method="dialog">
                <button className="btn">Cancel</button>
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
