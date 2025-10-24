import { useState } from "react";
import DropdownInput from "../productUserInputComponents/DropdownInput";
import NumberInput from "../productUserInputComponents/NumberInput";
import FileUploadInput from "../productUserInputComponents/FileUploadInput";
import { Plus, Trash2 } from "lucide-react";

export default function SablonBajuForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    pesanBaju: "",
    warnaBaju: "",
    file: null
  });

  const [sizeBreakdown, setSizeBreakdown] = useState([
    { size: "", quantity: "" }
  ]);

  const availableSizes = ["S Anak", "M Anak", "S", "M", "L", "XL", "XXL"];

  const addSizeRow = () => {
    setSizeBreakdown([...sizeBreakdown, { size: "", quantity: "" }]);
  };

  const removeSizeRow = (index) => {
    if (sizeBreakdown.length > 1) {
      setSizeBreakdown(sizeBreakdown.filter((_, i) => i !== index));
    }
  };

  const updateSizeRow = (index, field, value) => {
    const updated = [...sizeBreakdown];
    updated[index][field] = value;
    setSizeBreakdown(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, sizeBreakdown });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-4">
        <div className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Ukuran bisa dicampur (misal 3 M, 2 L).</span>
        </div>
        
        <DropdownInput
          label="Pesan Baju"
          options={["Ya", "Tidak"]}
          value={formData.pesanBaju}
          onChange={(value) => setFormData({ ...formData, pesanBaju: value })}
          placeholder="Apakah perlu pesan baju?"
        />
        
        <DropdownInput
          label="Warna Baju"
          options={["(Belum ditentukan)"]}
          value={formData.warnaBaju}
          onChange={(value) => setFormData({ ...formData, warnaBaju: value })}
          placeholder="Pilih warna baju"
        />

        {/* Size Breakdown Section */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Ukuran dan Jumlah</label>
          {sizeBreakdown.map((item, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <select
                  className="select select-bordered w-full"
                  value={item.size}
                  onChange={(e) => updateSizeRow(index, "size", e.target.value)}
                >
                  <option value="">Pilih ukuran</option>
                  {availableSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-32">
                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="Jumlah"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateSizeRow(index, "quantity", e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-error btn-square"
                onClick={() => removeSizeRow(index)}
                disabled={sizeBreakdown.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline btn-sm gap-2"
            onClick={addSizeRow}
          >
            <Plus className="h-4 w-4" />
            Tambah Ukuran
          </button>
        </div>

        <FileUploadInput
          label="File"
          onChange={(files) => setFormData({ ...formData, file: files })}
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>
      <button type="submit" className="btn btn-primary mt-auto">
        Pesan
      </button>
    </form>
  );
}
