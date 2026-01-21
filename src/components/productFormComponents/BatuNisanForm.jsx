import { useState } from "react";
import DropdownInput from "../productUserInputComponents/DropdownInput";
import NumberInput from "../productUserInputComponents/NumberInput";

export default function BatuNisanForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    tulisan: "",
    panjang: "",
    tinggi: "",
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
            placeholder="Masukkan tulisan untuk batu nisan"
            value={formData.tulisan}
            onChange={(e) => setFormData({ ...formData, tulisan: e.target.value })}
            rows={3}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <NumberInput
            label="Panjang"
            value={formData.panjang}
            onChange={(value) => setFormData({ ...formData, panjang: value })}
            placeholder="Panjang"
            unit="cm"
          />
          <NumberInput
            label="Tinggi"
            value={formData.tinggi}
            onChange={(value) => setFormData({ ...formData, tinggi: value })}
            placeholder="Tinggi"
            unit="cm"
          />
        </div>
        <DropdownInput
          label="Model"
          options={["Persegi", "Lainnya"]}
          value={formData.model}
          onChange={(value) => setFormData({ ...formData, model: value })}
          placeholder="Pilih model"
        />
        {formData.model === "Lainnya" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Model Custom</label>
            <input
              type="text"
              value={formData.customModel}
              onChange={(e) => setFormData({ ...formData, customModel: e.target.value })}
              placeholder="Masukkan nama model custom"
              className="input input-bordered w-full"
            />
            <p className="text text-red-500">MOHON HUBUNGI ADMIN UNTUK KONFIRMASI KEJELASAN MODEL.</p>
          </div>
        )}
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
      </div>
      <button type="submit" className="btn btn-primary mt-auto">
        Pesan
      </button>
    </form>
  );
}
