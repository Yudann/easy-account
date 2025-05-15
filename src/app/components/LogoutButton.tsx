"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import Modal from "./Modal";

export default function LogoutButton() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    Cookies.remove("isLogin");
    router.replace("/login");
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-sm bg-red-500 text-white py-2 px-3 rounded cursor-pointer hover:bg-red-600 transition"
      >
        Logout
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-lg font-semibold mb-4">Konfirmasi Logout</h2>
        <p className="mb-4">Apakah kamu yakin ingin logout?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer transition"
          >
            Batal
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 cursor-pointer transition"
          >
            Logout
          </button>
        </div>
      </Modal>
    </>
  );
}
