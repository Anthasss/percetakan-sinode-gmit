import { useState } from "react";
import DropdownInput from "../productUserInputComponents/DropdownInput";
import FileUploadInput from "../productUserInputComponents/FileUploadInput";

export default function StickerForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    tipeBahan: "",
    file: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-4">
        <DropdownInput
          label="Tipe Bahan"
          options={["Kertas Sticker Biasa", "Vynil"]}
          value={formData.tipeBahan}
          onChange={(value) => setFormData({ ...formData, tipeBahan: value })}
          placeholder="Pilih tipe bahan"
        />
        <FileUploadInput
          label="File"
          onChange={(files) => setFormData({ ...formData, file: files })}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </div>
      <button type="submit" className="btn btn-primary mt-auto">
        Submit Order
      </button>
    </form>
  );
}
