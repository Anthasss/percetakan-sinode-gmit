import { useState } from "react";
import FileUploadInput from "../productUserInputComponents/FileUploadInput";

export default function KransBungaForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    tulisan: "",
    fileFoto: null,
    ukuranFoto: "",
    model: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Tulisan</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Masukkan tulisan untuk krans bunga"
            value={formData.tulisan}
            onChange={(e) => setFormData({ ...formData, tulisan: e.target.value })}
            rows={3}
          />
        </div>
        <FileUploadInput
          label="File Foto (opsional)"
          onChange={(files) => setFormData({ ...formData, fileFoto: files })}
          accept=".jpg,.jpeg,.png"
        />
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Ukuran Foto (jika ada)</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Contoh: 10x15 cm"
            value={formData.ukuranFoto}
            onChange={(e) => setFormData({ ...formData, ukuranFoto: e.target.value })}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Deskripsi Model</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Deskripsikan model yang diinginkan"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          />
        </div>
      </div>
      <FileUploadInput
          label="File foto contoh model (opsional)"
          onChange={(files) => setFormData({ ...formData, fileFoto: files })}
          accept=".jpg,.jpeg,.png"
        />
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
