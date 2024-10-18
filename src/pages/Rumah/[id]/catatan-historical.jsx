import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CatatanHistorical = () => {
  const { id } = useParams();
  const [penghuniList, setPenghuniList] = useState([]);
  const [alamat, setAlamat] = useState("");
  console.log(penghuniList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/rumah/${id}/historical-penghuni`
        );
        const data = response.data.data;
        console.log(data);
        setAlamat(data.alamat);
        setPenghuniList(data.penghuni);
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
      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-blue-800">Alamat Rumah</h2>
        <p className="text-gray-800">{alamat}</p>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Catatan Historical Penghuni
      </h1>
      <p className="text-gray-600 mb-6">
        Daftar penghuni yang pernah tinggal di rumah ini.
      </p>

      <div className="relative border-l border-gray-200">
        <div className="relative border-l border-gray-200">
          {penghuniList.length > 0 ? (
            <ul className="space-y-4">
              {penghuniList.map((penghuni, index) => (
                <li
                  key={index}
                  className="mb-10 ml-6 bg-gray-50 p-4 rounded-lg shadow-md flex items-start border border-gray-200"
                >
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full ring-8 ring-white">
                    <svg
                      className="w-3 h-3 text-white"
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
                  </span>
                  <img
                    src={penghuni.foto_ktp}
                    alt={`KTP ${penghuni.nama_lengkap}`}
                    className="w-32 h-32 object-cover rounded-lg mr-4 border border-gray-300"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {penghuni.nama_lengkap}
                    </h3>
                    <p className="text-gray-700 mb-1">
                      <span className="font-semibold">Status Penghuni:</span>{" "}
                      {penghuni.status_penghuni}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <span className="font-semibold">Nomor Telepon:</span>{" "}
                      {penghuni.nomor_telepon}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <span className="font-semibold">Status Menikah:</span>{" "}
                      {penghuni.status_menikah}
                    </p>
                    {penghuni.history_rumah.map((history, idx) => (
                      <div key={idx}>
                        <p className="text-gray-700 mb-1">
                          <span className="font-semibold">
                            Tanggal Mulai Huni:
                          </span>{" "}
                          {formatDate(history.tanggal_mulai_huni)}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">
                            Tanggal Akhir Huni:
                          </span>{" "}
                          {formatDate(history.tanggal_akhir_huni)}
                        </p>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              Belum ada riwayat penghuni.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatatanHistorical;
