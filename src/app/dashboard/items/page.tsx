import { Edit, Trash2 } from "lucide-react";

export default function itemsPage() {
  const dummyRecentItems = [
    {
      id: "item_01",
      name: "MacBook Pro M3 Max",
      category: "ELEKTRONIK",
      brand: "Apple",
      purchasePrice: 65000000,
      purchaseDate: new Date("2024-01-15"),
      location: "Kamar Utama - Laci Meja",
      photos: [
        {
          id: "img_01",
          url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
        },
      ],
      createdAt: new Date("2024-02-10T08:00:00Z"),
    },
    {
      id: "item_02",
      name: "Cincin Emas Putih 18K",
      category: "PERHIASAN",
      brand: "Frank & Co",
      purchasePrice: 24500000,
      purchaseDate: new Date("2023-11-20"),
      location: "Brankas Bawah Tangga",
      photos: [
        {
          id: "img_02",
          url: "https://images.unsplash.com/photo-1605100804763-247f66150ce8?w=800&q=80",
        },
      ],
      createdAt: new Date("2024-02-11T09:30:00Z"),
    },
    {
      id: "item_03",
      name: "BPKB Honda HRV RS",
      category: "DOKUMEN",
      brand: "Honda",
      purchasePrice: null, // Dokumen biasanya tidak ada harga belinya
      purchaseDate: new Date("2022-05-10"),
      location: "Lemari Dokumen (Map Merah)",
      photos: [
        {
          id: "img_03",
          url: "https://images.unsplash.com/photo-1588523793610-85fbdcd5ae0a?w=800&q=80",
        }, // Foto ilustrasi dokumen
      ],
      createdAt: new Date("2024-02-12T14:20:00Z"),
    },
  ];

  return (
    <div className="flex flex-col w-full mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl text-gray-900 tracking-tight">Daftar Item</h1>
      <p className="text-gray-500 mt-2">
        Berikut adalah daftar item yang telah terdaftar di sistem.
      </p>

      <div className="mt-16">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Nama Item
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Merek
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Kategori
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Harga Beli
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dummyRecentItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={item.photos[0].url}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {item.location}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {item.brand}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {item.purchasePrice
                              ? `Rp ${item.purchasePrice.toLocaleString()}`
                              : "Dokumen"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
