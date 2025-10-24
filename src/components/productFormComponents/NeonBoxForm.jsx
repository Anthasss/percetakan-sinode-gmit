import { useState } from "react";
import DropdownInput from "../productUserInputComponents/DropdownInput";
import NumberInput from "../productUserInputComponents/NumberInput";

export default function NeonBoxForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    bahanBox: "",
    warnaLampu: "",
    panjang: "",
    tinggi: "",
    tebal: ""
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
      <button type="submit" className="btn btn-primary mt-auto">
        Submit Order
      </button>
    </form>
  );
}
