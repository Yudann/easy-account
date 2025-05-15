"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Transaksi", path: "/transaksi" },
  { name: "Jurnal Umum", path: "/jurnal-umum" },
  { name: "Buku Besar", path: "/buku-besar" },
  { name: "Neraca Saldo", path: "/neraca-saldo" },
  {
    name: "Laporan Laba Rugi",
    path: "/laporan/laba-rugi",
  },
  {
    name: "Laporan Neraca",
    path: "/laporan/neraca",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[350px] bg-white shadow-md h-screen p-8">
      <h1 className="text-xl font-bold mb-6">EasyAccount</h1>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={clsx(
              "px-3 py-2 rounded hover:bg-gray-200",
              pathname === item.path &&
                "bg-blue-100 text-blue-600 font-semibold"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
