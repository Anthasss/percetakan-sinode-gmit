import { ChevronLeft, ChevronRight } from "lucide-react";

export function PrevButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-[-32px] top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm btn-ghost hover:btn-primary"
      aria-label="Previous image"
    >
      <ChevronLeft size={20} />
    </button>
  );
}

export function NextButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-[-32px] top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm btn-ghost hover:btn-primary"
      aria-label="Next image"
    >
      <ChevronRight size={20} />
    </button>
  );
}
