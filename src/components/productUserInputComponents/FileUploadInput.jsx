import { Upload, X } from "lucide-react";
import { useState } from "react";
import { validateFiles, FILE_VALIDATION } from "../../services/orderApi";
import toast from "../../utils/toast";

export default function FileUploadInput({ label, onChange, accept = "*", multiple = false }) {
  const [fileName, setFileName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Validate files
      const validation = validateFiles(files);
      
      if (!validation.valid) {
        toast.error(validation.error);
        e.target.value = ''; // Clear input
        return;
      }

      // Update display
      if (multiple) {
        setFileName(`${files.length} file(s) selected`);
      } else {
        setFileName(files[0].name);
      }
      
      setSelectedFiles(files);
      onChange(files);
    }
  };

  const handleClear = () => {
    setFileName("");
    setSelectedFiles(null);
    onChange(null);
  };

  const acceptTypes = accept === "*" 
    ? FILE_VALIDATION.ALLOWED_EXTENSIONS.join(',')
    : accept;

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold">{label}</span>
        {multiple && (
          <span className="label-text-alt text-xs opacity-70">
            Max {FILE_VALIDATION.MAX_FILES} files, 10MB each
          </span>
        )}
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
            accept={acceptTypes}
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
      {!multiple && (
        <label className="label">
          <span className="label-text-alt text-xs opacity-70">
            Max 10MB - JPEG, PNG, WebP, or PDF
          </span>
        </label>
      )}
    </div>
  );
}
