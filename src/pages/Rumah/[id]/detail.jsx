import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RumahDetail = () => {
  const { id } = useParams();
  const [penghuniList, setPenghuniList] = useState([]);
  const [statusRumah, setStatusRumah] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tanggalMulaiHuni, setTanggalMulaiHuni] = useState("");
  const [tanggalAkhirHuni, setTanggalAkhirHuni] = useState("");
  console.log(penghuniList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/rumah/${id}`
        );
        const data = response.data.data;

        setAlamat(data.alamat);
        setStatusRumah(data.status_rumah);
        setPenghuniList(data.penghuni);
        setTanggalMulaiHuni(data.history_rumah[0].tanggal_mulai_huni);
        setTanggalAkhirHuni(data.history_rumah[0].tanggal_akhir_huni);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Detail Rumah</h1>
      <p className="text-gray-600 mb-6">Menampilkan Informasi Detail Rumah</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md shadow-sm">
          <h3 className="text-sm font-semibold text-blue-600 mb-2">
            Alamat Rumah
          </h3>
          <p className="text-lg font-medium text-gray-800">
            {alamat || "Tidak ada data"}
          </p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md shadow-sm">
          <h3 className="text-sm font-semibold text-green-600 mb-2">
            Status Rumah
          </h3>
          <p className="text-lg font-medium text-gray-800">
            {statusRumah || "Tidak ada data"}
          </p>
        </div>
      </div>

      {statusRumah === "Dihuni" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
            <h3 className="text-sm font-semibold text-yellow-600 mb-2">
              Tanggal Mulai Huni
            </h3>
            <p className="text-lg font-medium text-gray-800">
              {tanggalMulaiHuni
                ? formatDate(tanggalMulaiHuni)
                : "Tidak ada data"}
            </p>
          </div>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow-sm">
            <h3 className="text-sm font-semibold text-red-600 mb-2">
              Tanggal Akhir Huni
            </h3>
            <p className="text-lg font-medium text-gray-800">
              {tanggalAkhirHuni
                ? formatDate(tanggalAkhirHuni)
                : "Tidak ada data"}
            </p>
          </div>
        </div>
      )}

      {statusRumah === "Dihuni" && (
        <div className="mb-4">
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
          </div>
          <div className="flex flex-col gap-4">
            {penghuniList.length > 0 ? (
              <ul className="space-y-4">
                {penghuniList.map((penghuni, index) => (
                  <li
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105"
                  >
                    <div className="flex items-center space-x-6 flex-wrap">
                      <img
                        src={penghuni.foto_ktp}
                        alt={`KTP ${penghuni.nama_lengkap}`}
                        className="w-40 h-40 object-contain rounded-lg border border-gray-300"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {penghuni.nama_lengkap}
                        </h3>
                        <p className="text-gray-700 mb-1">
                          <span className="font-semibold">
                            Status Penghuni :
                          </span>{" "}
                          {penghuni.status_penghuni}
                        </p>
                        <p className="text-gray-700 mb-1">
                          <span className="font-semibold">Nomor Telepon :</span>{" "}
                          {penghuni.nomor_telepon}
                        </p>
                        <p className="text-gray-700 mb-1">
                          <span className="font-semibold">
                            Status Menikah :
                          </span>{" "}
                          {penghuni.status_menikah}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                Belum ada penghuni yang ditambahkan.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RumahDetail;
