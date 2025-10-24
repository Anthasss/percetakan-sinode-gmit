import { useState } from "react";
import DropdownInput from "../productUserInputComponents/DropdownInput";
import FileUploadInput from "../productUserInputComponents/FileUploadInput";

export default function BukuForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    tipeKertasIsi: "",
    tipeKertasCover: "",
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
          label="Tipe Kertas Isi"
          options={["HVS", "HVS Coklat", "Art Paper"]}
          value={formData.tipeKertasIsi}
          onChange={(value) => setFormData({ ...formData, tipeKertasIsi: value })}
          placeholder="Pilih tipe kertas isi"
        />
        <DropdownInput
          label="Tipe Kertas Cover"
          options={["Buffalo", "Manila", "Art Paper"]}
          value={formData.tipeKertasCover}
          onChange={(value) => setFormData({ ...formData, tipeKertasCover: value })}
          placeholder="Pilih tipe kertas cover"
        />
        <FileUploadInput
          label="File Cover dan Isi"
          onChange={(files) => setFormData({ ...formData, file: files })}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          multiple
        />
      </div>
      <button type="submit" className="btn btn-primary mt-auto">
        Pesan
      </button>
    </form>
  );
}
