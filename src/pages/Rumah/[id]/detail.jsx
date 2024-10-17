import React, { useState, useEffect } from "react";
import { TextInput } from "flowbite-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RumahDetail = () => {
  const { id } = useParams();
  const [penghuniList, setPenghuniList] = useState([]);
  const [statusRumah, setStatusRumah] = useState("");
  const [alamat, setAlamat] = useState("");
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Detail Rumah</h1>
      <p className="text-gray-600 mb-6">Menampilkan Informasi Detail Rumah</p>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <TextInput
              type="text"
              defaultValue={alamat}
              placeholder="Masukkan alamat rumah"
              className="border border-gray-300 rounded-md"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Rumah
            </label>
            <TextInput
              type="text"
              defaultValue={statusRumah}
              placeholder="Masukkan alamat rumah"
              className="border border-gray-300 rounded-md"
              readOnly
            />
          </div>
        </div>

        {statusRumah === "Dihuni" && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Daftar Penghuni
            </label>
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
                            <span className="font-semibold">
                              Nomor Telepon :
                            </span>{" "}
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
      </form>
    </div>
  );
};

export default RumahDetail;
