import React, { useState, useEffect } from "react";
import { Button, TextInput, FileInput, Modal, Select } from "flowbite-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const RumahEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [penghuniList, setPenghuniList] = useState([]);
  const [penghuniBaru, setPenghuniBaru] = useState("");
  const [statusRumah, setStatusRumah] = useState("");
  const [statusPenghuni, setStatusPenghuni] = useState("");
  const [tanggalMulaiHuni, setTanggalMulaiHuni] = useState("");
  const [tanggalAkhirHuni, setTanggalAkhirHuni] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [statusMenikah, setStatusMenikah] = useState("");
  const [fotoKTP, setFotoKTP] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/rumah/${id}/edit`
        );
        const data = response.data.data;

        setAlamat(data.alamat);
        setStatusRumah(data.status_rumah);

        if (
          data.history_rumah &&
          data.history_rumah.length > 0 &&
          data.penghuni &&
          data.penghuni.length > 0
        ) {
          setTanggalMulaiHuni(data.history_rumah[0].tanggal_mulai_huni);
          setTanggalAkhirHuni(data.history_rumah[0].tanggal_akhir_huni);
        } else {
          setTanggalMulaiHuni(null);
          setTanggalAkhirHuni(null);
        }

        setPenghuniList(data.penghuni || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTambahPenghuni = () => {
    if (penghuniBaru.trim() !== "") {
      const penghuni = {
        nama_lengkap: penghuniBaru,
        status_penghuni: statusPenghuni,
        nomor_telepon: nomorTelepon,
        status_menikah: statusMenikah,
        foto_ktp: fotoKTP,
      };

      setPenghuniList([...penghuniList, penghuni]);

      setPenghuniBaru("");
      setStatusPenghuni("");
      setNomorTelepon("");
      setStatusMenikah("");
      setFotoKTP(null);

      setModalOpen(false);
    }
  };

  const handleDeletePenghuni = (index) => {
    const newPenghuniList = penghuniList.filter((_, i) => i !== index);
    setPenghuniList(newPenghuniList);
  };

  const handlePerubahanKepemilikan = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `http://localhost:8000/api/rumah/${id}/perubahan-kepemilikan`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Ada kesalahan saat mengirim data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();

    formData.append("alamat", alamat || "");
    formData.append("status_rumah", statusRumah || "");
    if (statusRumah === "Dihuni") {
      formData.append("tanggal_mulai_huni", tanggalMulaiHuni);
      formData.append("tanggal_akhir_huni", tanggalAkhirHuni);

      penghuniList.forEach((penghuni, index) => {
        formData.append(`penghuni[${index}][id]`, penghuni.id || "");
        formData.append(
          `penghuni[${index}][nama_lengkap]`,
          penghuni.nama_lengkap || ""
        );
        formData.append(
          `penghuni[${index}][status_penghuni]`,
          penghuni.status_penghuni || ""
        );
        formData.append(
          `penghuni[${index}][nomor_telepon]`,
          penghuni.nomor_telepon || ""
        );
        formData.append(
          `penghuni[${index}][status_menikah]`,
          penghuni.status_menikah || ""
        );

        if (penghuni.foto_ktp) {
          formData.append(`penghuni[${index}][foto_ktp]`, penghuni.foto_ktp);
        }
      });
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/rumah/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/rumah");
    } catch (error) {
      console.error("Ada kesalahan saat mengirim data:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Rumah</h1>
      <p className="text-gray-600 mb-6">
        Silakan isi informasi berikut untuk memperbarui data rumah.
      </p>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <TextInput
              type="text"
              defaultValue={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Masukkan alamat rumah"
              className="border border-gray-300 rounded-md"
            />
          </div>
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Rumah
            </label>
            <Select
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

        {statusRumah === "Dihuni" && (
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Mulai Huni
                </label>
                <TextInput
                  type="date"
                  value={tanggalMulaiHuni}
                  onChange={(e) => setTanggalMulaiHuni(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Akhir Huni
                </label>
                <TextInput
                  type="date"
                  value={tanggalAkhirHuni}
                  onChange={(e) => setTanggalAkhirHuni(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-4 bg-gray-100 p-4 rounded-lg shadow-sm">
              <label className="text-lg font-semibold text-gray-800 flex items-center">
                <svg
                  className="w-5 h-5 text-blue-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-9H7a1 1 0 100 2h6a1 1 0 100-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Daftar Penghuni
              </label>
              <button
                type="submit"
                onClick={handlePerubahanKepemilikan}
                className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 011 1v1h4a1 1 0 011 1v1H5V5a1 1 0 011-1h4V3a1 1 0 011-1zM4 7h12v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7zm3 3a1 1 0 012 0v5a1 1 0 01-2 0v-5zm4 0a1 1 0 012 0v5a1 1 0 01-2 0v-5z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Perubahan Kepemilikan
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {penghuniList.length > 0 ? (
                <ul className="space-y-4">
                  {penghuniList.map((penghuni, index) => (
                    <li
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-lg font-semibold text-gray-800">
                            {penghuni.nama_lengkap}
                          </p>
                          <p className="text-gray-600">
                            Status Penghuni : {penghuni.status_penghuni}
                          </p>
                          <p className="text-gray-600">
                            Nomor Telepon : {penghuni.nomor_telepon}
                          </p>
                          <p className="text-gray-600">
                            Status Menikah : {penghuni.status_menikah}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeletePenghuni(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  Belum ada penghuni yang ditambahkan.
                </p>
              )}
              <button
                type="button"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => setModalOpen(true)}
              >
                Tambah Penghuni Baru
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={handleSubmit} color="cyan" type="submit">
            Simpan
          </Button>
        </div>
      </form>

      <Modal show={isModalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Tambah Penghuni Baru</Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <TextInput
              type="text"
              placeholder="Masukkan nama lengkap"
              value={penghuniBaru}
              onChange={(e) => setPenghuniBaru(e.target.value)}
              className="border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto KTP
            </label>
            <FileInput
              id="file"
              onChange={(e) => setFotoKTP(e.target.files[0])}
              helperText="PNG, JPG or JPEG"
              accept=".png,.jpg,.jpeg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Penghuni
            </label>
            <Select
              className="border border-gray-300 rounded-md"
              value={statusPenghuni}
              onChange={(e) => setStatusPenghuni(e.target.value)}
            >
              <option value="" selected>
                Pilih Status Penghuni
              </option>
              <option value="Kontrak">Kontrak</option>
              <option value="Tetap">Tetap</option>
            </Select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Telepon
            </label>
            <TextInput
              type="number"
              placeholder="Masukkan nomor telepon"
              className="border border-gray-300 rounded-md"
              value={nomorTelepon}
              onChange={(e) => setNomorTelepon(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Menikah
            </label>
            <Select
              className="border border-gray-300 rounded-md"
              value={statusMenikah}
              onChange={(e) => setStatusMenikah(e.target.value)}
            >
              <option value="" selected>
                Pilih Status Menikah
              </option>
              <option value="Sudah Menikah">Sudah Menikah</option>
              <option value="Belum Menikah">Belum Menikah</option>
            </Select>
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

export default RumahEdit;
