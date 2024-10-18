import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Button, TextInput, Select } from "flowbite-react";

const CekTagihanIuran = () => {
  const { id } = useParams();
  const [alamat, setAlamat] = useState("");
  const [iuranList, setIuranList] = useState([]);
  const [iuranTahunanList, setIuranTahunanList] = useState([]);
  const [selectedIuranId, setSelectedIuranId] = useState(null);
  const [showModalBayar, setShowModalBayar] = useState(false);
  const [showModalBayarTahunan, setShowModalBayarTahunan] = useState(false);
  const [selectedNamaIuran, setSelectedNamaIuran] = useState("");
  const [bulanTagihan, setBulanTagihan] = useState([]);
  const [tanggalPembayaran, setTanggalPembayaran] = useState("");
  
  useEffect(() => {
    const fetchData = async (path, setDataCallback) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/rumah/${id}/${path}`
        );
        const data = response.data.data;
        setAlamat(data.alamat);
        setDataCallback(data.tagihan);
      } catch (error) {
        console.error(`Error fetching data from ${path}:`, error);
      }
    };

    fetchData("cek-tagihan", setIuranList);
    fetchData("cek-tagihan-tahunan", setIuranTahunanList);
  }, [id]);

  const handlePembayaranTahunanSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("nama", selectedNamaIuran);
    formData.append("tanggal_pembayaran", tanggalPembayaran);

    bulanTagihan.forEach((tagihan, index) => {
      formData.append(`tagihan[${index}][tanggal_tagihan]`, tagihan);
    });

    try {
      const response = await axios.post(
        `http://localhost:8000/api/pembayaran-iuran/bayar-tagihan-tahunan`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Ada kesalahan saat mengirim data:", error);
    }

    setShowModalBayarTahunan(false);
  };

  const handlePembayaranSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("iuran_id", selectedIuranId);
    formData.append("tanggal_pembayaran", tanggalPembayaran);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/pembayaran-iuran/${id}/bayar-tagihan-bulanan`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Ada kesalahan saat mengirim data:", error);
    }

    setShowModalBayar(false);
  };

  const handleIuranChange = (e) => {
    const iuranId = e.target.value;
    setSelectedIuranId(iuranId);

    const iuranTerpilih = iuranTahunanList.find(
      (iuran) => iuran.id === parseInt(iuranId)
    );

    if (iuranTerpilih) {
      setSelectedNamaIuran(iuranTerpilih.nama_iuran);
      setBulanTagihan(iuranTerpilih.tanggal_tagihan);
    }
  };

  function formatTanggal(tanggal) {
    const bulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dateObj = new Date(tanggal);
    const month = bulan[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${month} ${year}`;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-blue-800">Alamat Rumah</h2>
        <p className="text-gray-800">{alamat}</p>
      </div>
      <div className="flex justify-end mb-4">
        <Button color="green" onClick={() => setShowModalBayarTahunan(true)}>
          Bayar Iuran Tahunan
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Daftar Iuran</h1>
      <p className="text-gray-600 mb-6">Menampilkan informasi tagihan iuran</p>
      <div className="mb-8 mt-5">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="p-3 text-left font-semibold">Nama Iuran</th>
                <th className="p-3 text-left font-semibold">
                  Pembayaran per Penghuni
                </th>
                <th className="p-3 text-left font-semibold">Bulan Tagihan</th>
                <th className="p-3 text-left font-semibold">Total Tagihan</th>
                <th className="p-3 text-left font-semibold">Status Tagihan</th>
                <th className="p-3 text-left font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {iuranList.map((iuran, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-100"
                >
                  <td className="p-3 text-gray-800">{iuran.nama_iuran}</td>
                  <td className="p-3 text-gray-800">
                    Rp. {iuran.biaya_iuran.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 text-gray-800">
                    {formatTanggal(iuran.tanggal_tagihan)}
                  </td>
                  <td className="p-3 text-gray-800">
                    Rp. {iuran.total_tagihan.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 text-gray-800">{iuran.status_pembayaran}</td>
                  <td className="p-3 text-gray-800">
                    <Button
                      color="blue"
                      onClick={() => {
                        setSelectedIuranId(iuran.id);
                        setShowModalBayar(true);
                      }}
                    >
                      Bayar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        show={showModalBayarTahunan}
        onClose={() => setShowModalBayarTahunan(false)}
      >
        <Modal.Header>Pembayaran Iuran Tahunan</Modal.Header>
        <Modal.Body>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pilih Iuran
          </label>
          <div className="space-y-2">
            <Select
              className="border border-gray-300 rounded-md"
              value={selectedIuranId}
              onChange={handleIuranChange}
            >
              <option value="">Pilih Iuran</option>
              {iuranTahunanList.map((iuran, index) => (
                <option key={index} value={iuran.id}>
                  {iuran.nama_iuran}
                </option>
              ))}
            </Select>

            {bulanTagihan.length > 0 && (
              <div className="mt-4 mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bulan Tagihan
                </label>
                {bulanTagihan.map((tanggal, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`bulan-tagihan-${index}`}
                      value={tanggal}
                      className="mr-2"
                      checked
                    />
                    <label
                      htmlFor={`bulan-tagihan-${index}`}
                      className="text-gray-700"
                    >
                      {formatTanggal(tanggal)}{" "}
                    </label>
                  </div>
                ))}
              </div>
            )}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Pembayaran
            </label>
            <TextInput
              type="date"
              value={tanggalPembayaran}
              onChange={(e) => setTanggalPembayaran(e.target.value)}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="blue" onClick={handlePembayaranTahunanSubmit}>
            Bayar
          </Button>
          <Button color="gray" onClick={() => setShowModalBayarTahunan(false)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalBayar} onClose={() => setShowModalBayar(false)}>
        <Modal.Header>Pembayaran Iuran Bulanan</Modal.Header>
        <Modal.Body>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Pembayaran
            </label>
            <TextInput
              type="date"
              value={tanggalPembayaran}
              onChange={(e) => setTanggalPembayaran(e.target.value)}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="blue" onClick={handlePembayaranSubmit}>
            Bayar
          </Button>
          <Button color="gray" onClick={() => setShowModalBayar(false)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CekTagihanIuran;
