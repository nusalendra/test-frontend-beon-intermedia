import React, { useState } from "react";
import { Button, TextInput, FileInput, Modal, Select } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PembayaranCreate = () => {
  const navigate = useNavigate();
  const [iuranList, setIuranList] = useState([
    { nama: "", biaya: 0, bulan_tagihan: "", tahun_tagihan: "" },
  ]);
  console.log(iuranList)
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedIuran = [...iuranList];
    updatedIuran[index][name] = value;
    setIuranList(updatedIuran);
  };

  const handleAddIuran = () => {
    setIuranList([...iuranList, { nama: "", biaya: 0, bulan_tagihan: "", tahun_tagihan: "" }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();

    iuranList.forEach((iuran, index) => {
      formData.append(`iuran[${index}][nama]`, iuran.nama);
      formData.append(`iuran[${index}][biaya]`, iuran.biaya);
      formData.append(`iuran[${index}][bulan_tagihan]`, iuran.bulan_tagihan);
      formData.append(`iuran[${index}][tahun_tagihan]`, iuran.tahun_tagihan);
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/pembayaran-iuran",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate("/pembayaran");
    } catch (error) {
      console.error("Ada kesalahan saat mengirim data:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Tambah Pembayaran Iuran
      </h1>
      <p className="text-gray-600 mb-6">
        Silakan isi informasi berikut untuk menambahkan pembayaran iuran.
      </p>
      <form>
        {iuranList.map((iuran, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Iuran
              </label>
              <TextInput
                type="text"
                name="nama"
                value={iuran.nama}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Masukkan alamat rumah"
                required
                className="border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biaya Iuran
              </label>
              <TextInput
                type="number"
                name="biaya"
                min="0"
                value={iuran.biaya}
                onChange={(e) => handleInputChange(index, e)}
                required
                className="border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tagihan Pada Bulan
              </label>
              <Select
                name="bulan_tagihan"
                required
                value={iuran.bulan_tagihan}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md"
              >
                <option value="" selected>
                  Pilih Bulan
                </option>
                <option value="01">Januari</option>
                <option value="02">Februari</option>
                <option value="03">Maret</option>
                <option value="04">April</option>
                <option value="05">Mei</option>
                <option value="06">Juni</option>
                <option value="07">Juli</option>
                <option value="08">Agustus</option>
                <option value="09">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tagihan Pada Tahun
              </label>
              <Select
                name="tahun_tagihan"
                required
                value={iuran.tahun_tagihan}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md"
              >
                <option value="" selected>
                  Pilih Tahun
                </option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </Select>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddIuran}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Tambah Iuran
        </button>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} color="cyan" type="submit">
            Tambah Iuran
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PembayaranCreate;
