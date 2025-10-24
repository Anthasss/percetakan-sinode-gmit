import { useState } from "react";
import DropdownInput from "../productUserInputComponents/DropdownInput";
import NumberInput from "../productUserInputComponents/NumberInput";
import FileUploadInput from "../productUserInputComponents/FileUploadInput";

export default function SablonBajuForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    pesanBaju: "",
    warnaBaju: "",
    jumlahPesanan: "",
    ukuranDanJumlah: "",
    file: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-4">
        <div className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Ukuran bisa campur (misal 3 M, 2 L) atau sama semua (All M)</span>
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
        <NumberInput
          label="Jumlah Pesanan"
          value={formData.jumlahPesanan}
          onChange={(value) => setFormData({ ...formData, jumlahPesanan: value })}
          placeholder="Jumlah"
          unit="pcs"
        />
        <DropdownInput
          label="Ukuran dan Jumlah"
          options={["S Anak", "M Anak", "S", "M", "L", "XL", "XXL"]}
          value={formData.ukuranDanJumlah}
          onChange={(value) => setFormData({ ...formData, ukuranDanJumlah: value })}
          placeholder="Pilih ukuran"
        />
        <FileUploadInput
          label="File"
          onChange={(files) => setFormData({ ...formData, file: files })}
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>
      <button type="submit" className="btn btn-primary mt-auto">
        Submit Order
      </button>
    </form>
  );
}
