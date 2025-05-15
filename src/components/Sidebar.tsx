"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import LogoutButton from "./LogoutButton";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Transaksi", path: "/transaksi" },
  { name: "Jurnal Umum", path: "/jurnal-umum" },
  { name: "Buku Besar", path: "/buku-besar" },
  { name: "Neraca Saldo", path: "/neraca-saldo" },
  { name: "Laporan Laba Rugi", path: "/laporan/laba-rugi" },
  { name: "Laporan Neraca", path: "/laporan/neraca" },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-full p-6 flex flex-col justify-between bg-white">
      <div>
        {/* Tombol close di mobile */}
        <div className="flex justify-between items-center mb-6 md:hidden h-fit">
          <h1 className="text-xl font-bold">EasyAccount</h1>
        </div>

        {/* Judul tetap di desktop */}
        <h1 className="text-xl font-bold mb-6 hidden md:block">EasyAccount</h1>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={onClose}
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
      </div>

      <LogoutButton />
    </aside>
  );
}
