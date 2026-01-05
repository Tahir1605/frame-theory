import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

const adminData = [
  {
    id: 1,
    name: "Tahirul Islam",
    email: "tahir@example.com",
    password: "Admin@123",
    photo: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 2,
    name: "Rahul Das",
    email: "rahul@example.com",
    password: "Rahul@456",
    photo: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "Ayesha Khatun",
    email: "ayesha@example.com",
    password: "Ayesha@789",
    photo: "https://i.pravatar.cc/150?img=7",
  },
];

const AdminList = () => {
  const [visiblePassword, setVisiblePassword] = useState(null);

  return (
    <div className="mt-16 px-4">
      <h3 className="text-3xl font-extrabold text-gray-800 mb-8 tracking-tight">
        Admin Management
      </h3>

      {/* ===== Desktop Table ===== */}
      <div className="hidden md:block bg-white/80 backdrop-blur rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to from-gray-50 to-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-8 py-5 text-left">Admin</th>
              <th className="px-8 py-5 text-left">Email</th>
              <th className="px-8 py-5 text-left">Password</th>
              <th className="px-8 py-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {adminData.map((admin) => (
              <tr
                key={admin.id}
                className="border-t hover:bg-gray-50/70 transition-all"
              >
                {/* Admin */}
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={admin.photo}
                      alt={admin.name}
                      className="w-12 h-12 rounded-full ring-2 ring-white shadow object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {admin.name}
                      </p>
                      <span className="text-xs text-gray-500">
                        Administrator
                      </span>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-8 py-5 text-gray-600">
                  {admin.email}
                </td>

                {/* Password */}
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm tracking-wide">
                      {visiblePassword === admin.id
                        ? admin.password
                        : "••••••••"}
                    </span>
                    <button
                      onClick={() =>
                        setVisiblePassword(
                          visiblePassword === admin.id ? null : admin.id
                        )
                      }
                      className="p-1 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
                    >
                      {visiblePassword === admin.id ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-8 py-5">
                  <div className="flex justify-center gap-3">
                    <button className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 hover:bg-emerald-200 hover:scale-105 transition">
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 hover:scale-105 transition">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Cards ===== */}
      <div className="md:hidden space-y-6">
        {adminData.map((admin) => (
          <div
            key={admin.id}
            className="bg-white rounded-3xl shadow-xl p-5 border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <img
                src={admin.photo}
                alt={admin.name}
                className="w-16 h-16 rounded-full shadow ring-2 ring-white"
              />
              <div>
                <h4 className="font-bold text-gray-800 text-lg">
                  {admin.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {admin.email}
                </p>
              </div>
            </div>

            {/* Password */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm">
                  {visiblePassword === admin.id
                    ? admin.password
                    : "••••••••"}
                </span>
                <button
                  onClick={() =>
                    setVisiblePassword(
                      visiblePassword === admin.id ? null : admin.id
                    )
                  }
                  className="p-1 rounded-md text-gray-500 hover:text-indigo-600"
                >
                  {visiblePassword === admin.id ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600">
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button className="p-2.5 rounded-xl bg-red-100 text-red-600">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminList;
