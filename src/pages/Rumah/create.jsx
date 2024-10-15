import React, { useState } from "react";
import { Button, TextInput, Textarea, Modal, Select } from "flowbite-react";

const RumahCreate = () => {
  const [isModalOpen, setModalOpen] = useState(false); // State untuk modal tambah penghuni
  const [penghuniList, setPenghuniList] = useState([]); // Daftar penghuni terdaftar
  const [penghuniBaru, setPenghuniBaru] = useState(""); // Input penghuni baru
  const [statusRumah, setStatusRumah] = useState(""); // State untuk status rumah
  
  const handleTambahPenghuni = () => {
    if (penghuniBaru.trim() !== "") {
      setPenghuniList([...penghuniList, penghuniBaru]); // Tambahkan penghuni baru ke list
      setPenghuniBaru(""); // Reset input
      setModalOpen(false); // Tutup modal
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Tambah Rumah</h1>
      <p className="text-gray-600 mb-6">
        Silakan isi informasi berikut untuk menambahkan rumah baru.
      </p>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <TextInput
              type="text"
              placeholder="Masukkan alamat rumah"
              required
              className="border border-gray-300 rounded-md"
            />
          </div>
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Rumah
            </label>
            <Select
              required
              value={statusRumah}
              onChange={(e) => setStatusRumah(e.target.value)}
              className="border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Pilih Status
              </option>
              <option value="Dihuni">Dihuni</option>
              <option value="Tidak Dihuni">Tidak Dihuni</option>
            </Select>
          </div>
        </div>

        {/* Menampilkan opsi penghuni jika status rumah "Dihuni" */}
        {statusRumah === "Dihuni" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pilih Penghuni
            </label>
            <div className="flex items-center gap-4">
              <Select className="flex-1 border-gray-300 rounded-md">
                <option value="">Pilih Penghuni</option>
                {penghuniList.map((penghuni, index) => (
                  <option key={index} value={penghuni}>
                    {penghuni}
                  </option>
                ))}
              </Select>
              <Button color="light" onClick={() => setModalOpen(true)}>
                Tambah Penghuni Baru
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button color="cyan" type="submit">
            Tambah Rumah
          </Button>
        </div>
      </form>

      {/* Modal Tambah Penghuni Baru */}
      <Modal show={isModalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Tambah Penghuni Baru</Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Penghuni
            </label>
            <TextInput
              type="text"
              placeholder="Masukkan nama penghuni"
              value={penghuniBaru}
              onChange={(e) => setPenghuniBaru(e.target.value)}
              className="border border-gray-300 rounded-md"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="cyan" onClick={handleTambahPenghuni}>
            Simpan Penghuni
          </Button>
          <Button color="gray" onClick={() => setModalOpen(false)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RumahCreate;
