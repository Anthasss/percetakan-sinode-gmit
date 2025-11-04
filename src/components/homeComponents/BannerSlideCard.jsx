import BannerSlideEditor from "./BannerSlideEditor";

export default function BannerSlideCard({ slide, onDelete }) {
  return (
    <div
      className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-black"
    >
      <BannerSlideEditor
        slide={slide}
        onDelete={onDelete}
      />
      {slide.publicUrl && (
        <img
          src={slide.publicUrl}
          alt="Banner slide"
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
}
