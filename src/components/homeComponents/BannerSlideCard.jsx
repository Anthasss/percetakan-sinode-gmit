import BannerSlideEditor from "./BannerSlideEditor";

export default function BannerSlideCard({ slide, onDelete }) {
  return (
    <div
      className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      style={{ backgroundColor: slide.backgroundColor }}
    >
      <BannerSlideEditor
        slide={slide}
        onDelete={onDelete}
      />
      {slide.imageUrl && slide.imageUrl.startsWith('/') ? (
        <img
          src={slide.imageUrl}
          alt={slide.title}
          className="w-full h-full object-contain"
        />
      ) : slide.imageUrl ? (
        <img
          src={slide.imageUrl}
          alt={slide.title}
          className="w-full h-full object-contain"
        />
      ) : null}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
        <h3 className="text-lg font-bold truncate">{slide.title}</h3>
        {slide.description && (
          <p className="text-sm truncate">{slide.description}</p>
        )}
      </div>
    </div>
  );
}
