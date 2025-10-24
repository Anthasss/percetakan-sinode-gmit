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
      </div>
      <button type="submit" className="btn btn-primary mt-auto">
        Pesan
      </button>
    </form>
  );
}
