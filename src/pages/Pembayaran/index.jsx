import React, { useEffect, useState } from "react";
import { Table, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Rumah = () => {
  const [pembayaranIuranList, setPembayaranIuranList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/pembayaran-iuran"
        );
        console.log(response.data.data);
        setPembayaranIuranList(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  const bulanMapping = {
    "01": "Januari",
    "02": "Februari",
    "03": "Maret",
    "04": "April",
    "05": "Mei",
    "06": "Juni",
    "07": "Juli",
    "08": "Agustus",
    "09": "September",
    10: "Oktober",
    11: "November",
    12: "Desember",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Daftar Pembayaran Iuran
        </h1>
        <p className="text-gray-600">
          Berikut adalah daftar pembayaran iuran beserta detailnya.
        </p>
      </div>

      <div className="mb-4 flex justify-end">
        <Link to="/pembayaran/create">
          <Button color="cyan" className="mr-2">
            Tambah Pembayaran
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <Table hoverable={true} className="min-w-full text-left">
          <Table.Head className="bg-gray-200 text-gray-800">
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Nama Iuran</Table.HeadCell>
            <Table.HeadCell>Biaya Iuran</Table.HeadCell>
            <Table.HeadCell>Tagihan</Table.HeadCell>
            <Table.HeadCell>Total Biaya Penghuni Belum Bayar</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y bg-white">
            {pembayaranIuranList.map((item, index) => {
              const bulan = item.tanggal_tagihan.split("-")[1];
              const tahun = item.tanggal_tagihan.split("-")[0];
              return (
                <Table.Row key={item.id} className="hover:bg-gray-100">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>{item.nama}</Table.Cell>
                  <Table.Cell>Rp. {item.biaya}</Table.Cell>
                  <Table.Cell>{bulanMapping[bulan]} {tahun}</Table.Cell>{" "}
                  <Table.Cell>
                    Rp. {item.total_pembayaran_belum_bayar}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Rumah;
