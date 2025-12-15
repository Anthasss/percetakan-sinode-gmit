import { useState } from "react";
import DropdownInput from "../productUserInputComponents/DropdownInput";
import NumberInput from "../productUserInputComponents/NumberInput";

export default function NeonBoxForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    bahanBox: "",
    warnaLampu: "",
    panjang: "",
    tinggi: "",
    tebal: "",
    deskripsi: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-4">
        <DropdownInput
          label="Bahan Box"
          options={["Akrilik", "(Lainnya - belum diisi)"]}
          value={formData.bahanBox}
          onChange={(value) => setFormData({ ...formData, bahanBox: value })}
          placeholder="Pilih bahan box"
        />
        <DropdownInput
          label="Warna Lampu"
          options={["Putih", "Merah", "Lainnya"]}
          value={formData.warnaLampu}
          onChange={(value) => setFormData({ ...formData, warnaLampu: value })}
          placeholder="Pilih warna lampu"
        />
        {formData.warnaLampu === "Lainnya" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Warna Custom</label>
            <input
              type="text"
              value={formData.customBahanBox}
              onChange={(e) => setFormData({ ...formData, customBahanBox: e.target.value })}
              placeholder="Masukkan nama warna custom"
              className="input input-bordered w-full"
            />
            <p className="text text-red-500">MOHON HUBUNGI ADMIN UNTUK MENANYAKAN KETERSEDIAAN WARNA LAMPU SEBELUM MEMESAN.</p>
          </div>
        )}
        <div className="grid grid-cols-3 gap-4">
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
          <NumberInput
            label="Tebal"
            value={formData.tebal}
            onChange={(value) => setFormData({ ...formData, tebal: value })}
            placeholder="Tebal"
            unit="cm"
          />
        </div>
      </div>
      <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Deskripsi tambahan (opsional)</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Deskripsikan tambahan untuk pesanan"
            value={formData.deskripsi}
            onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
          />
        </div>
      <button type="submit" className="btn btn-primary mt-auto">
        Pesan
      </button>
    </form>
  );
}
