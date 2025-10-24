import { Upload, X } from "lucide-react";
import { useState } from "react";

export default function FileUploadInput({ label, onChange, accept = "*", multiple = false }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (multiple) {
        setFileName(`${files.length} file(s) selected`);
      } else {
        setFileName(files[0].name);
      }
      onChange(files);
    }
  };

  const handleClear = () => {
    setFileName("");
    onChange(null);
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold">{label}</span>
      </label>
      <div className="flex gap-2">
        <label className="input input-bordered flex items-center gap-2 flex-1 cursor-pointer">
          <Upload className="h-4 w-4 opacity-70" />
          <span className="grow text-base-content/70 truncate">
            {fileName || "Choose file..."}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={accept}
            multiple={multiple}
          />
        </label>
        {fileName && (
          <button
            className="btn btn-square btn-outline"
            onClick={handleClear}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
