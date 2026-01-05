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
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Admin List
      </h3>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Admin</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Password</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {adminData.map((admin) => (
              <tr
                key={admin.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={admin.photo}
                    alt={admin.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="font-semibold text-gray-800">
                    {admin.name}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {admin.email}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
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
                      className="text-gray-500 hover:text-blue-600"
                    >
                      {visiblePassword === admin.id ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button className="p-2 cursor-pointer rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition">
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>

                    <button className="p-2 cursor-pointer rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-5">
        {adminData.map((admin) => (
          <div
            key={admin.id}
            className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <img
                src={admin.photo}
                alt={admin.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-gray-800">
                  {admin.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {admin.email}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              {/* Password */}
              <div className="flex items-center gap-2">
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
                  className="text-gray-500 hover:text-blue-600"
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
                <button className="p-2 rounded-lg bg-green-100 text-green-600">
                  <PencilSquareIcon className="w-5 h-5" />
                </button>

                <button className="p-2 rounded-lg bg-red-100 text-red-600">
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
