import { useState } from "react";
import DropdownInput from "../productUserInputComponents/DropdownInput";
import FileUploadInput from "../productUserInputComponents/FileUploadInput";

export default function StempelForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    designKepalaStempel: "",
    tipe: "",
    ukuranLogo: "",
    fileLogo: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-4">
        <DropdownInput
          label="Design Kepala Stempel"
          options={["Persegi", "Segitiga", "Oval", "Custom"]}
          value={formData.designKepalaStempel}
          onChange={(value) => setFormData({ ...formData, designKepalaStempel: value })}
          placeholder="Pilih design kepala stempel"
        />
        <DropdownInput
          label="Tipe"
          options={["Stempel Biasa", "Stempel Kotak"]}
          value={formData.tipe}
          onChange={(value) => setFormData({ ...formData, tipe: value })}
          placeholder="Pilih tipe stempel"
        />
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Ukuran Logo / Design</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Contoh: 5x5 cm"
            value={formData.ukuranLogo}
            onChange={(e) => setFormData({ ...formData, ukuranLogo: e.target.value })}
          />
        </div>
        <FileUploadInput
          label="File Logo"
          onChange={(files) => setFormData({ ...formData, fileLogo: files })}
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>
      <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Deskripsi tambahan (opsional)</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Deskripsikan tambahan untuk pesanan"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          />
        </div>
      <button type="submit" className="btn btn-primary mt-auto">
        Pesan
      </button>
    </form>
  );
}
