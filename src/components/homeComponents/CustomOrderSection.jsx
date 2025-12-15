export default function CustomOrderSection() {
  const admins = [
    { name: "Kak Domi", phoneNumber: "+6285138824884" },
    { name: "Pak Deni", phoneNumber: "+628113878277" },
  ];

  const handleCustomOrder = (phoneNumber) => {
    const whatsappLink = `https://wa.me/${phoneNumber}`;
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="divider divider-neutral m-0"></div>
      <div className="w-full max-w-4xl mx-auto mt-4">
        <div className="bg-gradient-to-r bg-green-500 rounded-lg shadow-lg p-8 text-white">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Pesan Barang Custom</h2>
            <p className="text-lg opacity-90">
              Tidak menemukan yang Anda cari? Pesan barang custom sesuai kebutuhan Anda! Klik tombol di bawah untuk
              menghubungi kami melalui WhatsApp dan diskusikan detail pesanan Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {admins.map((admin, index) => (
                <button
                  key={index}
                  onClick={() => handleCustomOrder(admin.phoneNumber, admin.name)}
                  className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Chat with {admin.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
