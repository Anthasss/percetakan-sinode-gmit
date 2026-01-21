import { useState } from "react";
import DropdownInput from "../productUserInputComponents/DropdownInput";
import NumberInput from "../productUserInputComponents/NumberInput";
import FileUploadInput from "../productUserInputComponents/FileUploadInput";

export default function SpandukBalihoForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    bahan: "",
    panjang: "",
    lebar: "",
    file: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <NumberInput
            label="Panjang"
            value={formData.panjang}
            onChange={(value) => setFormData({ ...formData, panjang: value })}
            placeholder="Panjang"
            unit="m"
          />
          <NumberInput
            label="Lebar"
            value={formData.lebar}
            onChange={(value) => setFormData({ ...formData, lebar: value })}
            placeholder="Lebar"
            unit="m"
          />
        </div>
        <FileUploadInput
          label="File"
          onChange={(files) => setFormData({ ...formData, file: files })}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </div>
      <button type="submit" className="btn btn-primary mt-auto">
        Pesan
      </button>
    </form>
  );
}
