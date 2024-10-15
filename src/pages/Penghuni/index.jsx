import React from 'react';
import { Table, Button } from "flowbite-react";

const Penghuni = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Judul Halaman */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Daftar Penghuni</h1>
        <p className="text-gray-600">
          Berikut adalah daftar penghuni beserta detailnya.
        </p>
      </div>

      {/* Tombol Aksi */}
      <div className="mb-4 flex justify-end">
        <Button color="cyan" href="#" className="mr-2">
          Tambah Produk
        </Button>
        <Button color="light" href="#">
          Kelola Produk
        </Button>
      </div>
      {/*  */}
      {/* Tabel */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <Table hoverable={true} className="min-w-full text-left">
          <Table.Head className="bg-gray-200 text-gray-800">
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Color</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y bg-white">
            <Table.Row className="hover:bg-gray-100">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                {'Apple MacBook Pro 17"'}
              </Table.Cell>
              <Table.Cell>Sliver</Table.Cell>
              <Table.Cell>Laptop</Table.Cell>
              <Table.Cell>$2999</Table.Cell>
              <Table.Cell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="hover:bg-gray-100">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                Microsoft Surface Pro
              </Table.Cell>
              <Table.Cell>White</Table.Cell>
              <Table.Cell>Laptop PC</Table.Cell>
              <Table.Cell>$1999</Table.Cell>
              <Table.Cell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="hover:bg-gray-100">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                Magic Mouse 2
              </Table.Cell>
              <Table.Cell>Black</Table.Cell>
              <Table.Cell>Accessories</Table.Cell>
              <Table.Cell>$99</Table.Cell>
              <Table.Cell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Penghuni;