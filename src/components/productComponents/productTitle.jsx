import { Star, Share2 } from "lucide-react";

export default function ProductTitle() {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Product Title</h1>
          <div className="flex">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="ml-2">4.5 (10 Ulasan)</span>
          </div>
        </div>

        <div className="flex items-center px-4">
          <Share2 />
        </div>
      </div>
      <div className="divider divider-neutral m-0"></div>
    </>
  );
}
