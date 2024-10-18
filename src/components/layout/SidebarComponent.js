"use client";

import { Sidebar } from "flowbite-react";
import { HiChartPie, HiUserGroup, HiHome, HiCash } from "react-icons/hi";
import { useLocation } from "react-router-dom"; // Import React Router hook

export function SidebarComponent() {
  const location = useLocation(); // Mendapatkan URL saat ini

  // Fungsi untuk mengecek apakah item sedang aktif berdasarkan path
  const isActive = (path) => location.pathname === path;

  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="/"
            icon={HiChartPie}
            className={isActive("/") ? "bg-blue-500 text-white" : ""}
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            href="/rumah"
            icon={HiHome}
            label="Pro"
            labelColor="dark"
            className={isActive("/rumah") ? "bg-blue-500 text-white" : ""}
          >
            Rumah
          </Sidebar.Item>
          <Sidebar.Item
            href="/pembayaran"
            icon={HiCash}
            className={isActive("/pembayaran") ? "bg-blue-500 text-white" : ""}
          >
            Pembayaran
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
