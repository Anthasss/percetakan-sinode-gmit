import { useState } from "react";
import DropdownInput from "../productUserInputComponents/DropdownInput";
import FileUploadInput from "../productUserInputComponents/FileUploadInput";

export default function PrintBiasaForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    tipeKertas: "",
    jenisWarna: "",
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
          label="Tipe Kertas"
          options={["A4", "A3"]}
          value={formData.tipeKertas}
          onChange={(value) => setFormData({ ...formData, tipeKertas: value })}
          placeholder="Pilih tipe kertas"
        />
        <DropdownInput
          label="Jenis Warna"
          options={["Hitam Putih", "Warna"]}
          value={formData.jenisWarna}
          onChange={(value) => setFormData({ ...formData, jenisWarna: value })}
          placeholder="Pilih jenis warna"
        />
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
