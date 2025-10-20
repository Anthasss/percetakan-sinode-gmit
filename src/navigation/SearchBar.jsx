import { ChevronDown, Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex-1 px-4 flex">
      <div className="join w-full">
        <label className="input join-item flex-1">
          <Search className="h-[1em] opacity-50" />
          <input
            type="search"
            placeholder="Telusuri"
            className="grow"
          />
        </label>
        <button className="btn join-item">Kategori <span className="flex justify-center items-center"><ChevronDown className="inline-block h-4 w-4" /></span></button>
      </div>
    </div>
  );
}
