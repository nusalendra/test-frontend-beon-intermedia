import React, { useEffect, useState } from "react";
import { Table, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Rumah = () => {
  const [rumahList, setRumahList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/rumah");
        setRumahList(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Daftar Rumah</h1>
        <p className="text-gray-600">
          Berikut adalah daftar rumah beserta detailnya.
        </p>
      </div>

      <div className="mb-4 flex justify-end">
        <Link to="/rumah/create">
          <Button color="cyan" className="mr-2">
            Tambah Rumah
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <Table hoverable={true} className="min-w-full text-left">
          <Table.Head className="bg-gray-200 text-gray-800">
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Alamat</Table.HeadCell>
            <Table.HeadCell>Status Rumah</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y bg-white">
            {rumahList.map((item, index) => (
              <Table.Row key={item.id} className="hover:bg-gray-100">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{item.alamat}</Table.Cell>
                <Table.Cell>{item.status_rumah}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/rumah/${item.id}`}
                    className="font-medium text-green-600 hover:underline me-3"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/rumah/${item.id}/edit`}
                    className="font-medium text-cyan-600 hover:underline"
                  >
                    Edit
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Rumah;
