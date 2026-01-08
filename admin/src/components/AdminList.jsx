import { useState, useMemo } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
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
  {
    id: 4,
    name: "Imran Khan",
    email: "imran@example.com",
    password: "Imran@321",
    photo: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 5,
    name: "Sneha Roy",
    email: "sneha@example.com",
    password: "Sneha@555",
    photo: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 6,
    name: "Arjun Mehta",
    email: "arjun@example.com",
    password: "Arjun@999",
    photo: "https://i.pravatar.cc/150?img=13",
  },
];

const ITEMS_PER_PAGE = 5;

const AdminList = () => {
  const [visiblePassword, setVisiblePassword] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* 🔍 Search */
  const filteredAdmins = useMemo(() => {
    return adminData.filter(
      (a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  /* 📄 Pagination */
  const totalPages = Math.ceil(filteredAdmins.length / ITEMS_PER_PAGE);
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="mt-16 px-4 max-w-7xl mx-auto">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <h3 className="text-3xl font-extrabold text-gray-800">
          Admin Management
        </h3>

        <div className="relative w-full md:w-72">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search admin..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-3xl shadow-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-8 py-5 text-left">Admin</th>
              <th className="px-8 py-5 text-left">Email</th>
              <th className="px-8 py-5 text-left">Password</th>
              <th className="px-8 py-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedAdmins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50">
                <td className="px-8 py-5 flex items-center gap-4">
                  <img
                    src={admin.photo}
                    className="w-12 h-12 rounded-full object-cover"
                    alt=""
                  />
                  <span className="font-semibold">{admin.name}</span>
                </td>

                <td className="px-8 py-5 text-gray-600">
                  {admin.email}
                </td>

                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm">
                      {visiblePassword === admin.id
                        ? admin.password
                        : "••••••••"}
                    </span>
                    <button
                     className="cursor-pointer"
                      onClick={() =>
                        setVisiblePassword(
                          visiblePassword === admin.id ? null : admin.id
                        )
                      }
                    >
                      {visiblePassword === admin.id ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </td>

                <td className="px-8 py-5">
                  <div className="flex justify-center gap-3">
                    <button className="p-2.5 cursor-pointer rounded-xl bg-emerald-100 text-emerald-600">
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 cursor-pointer rounded-xl bg-red-100 text-red-600">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE / TABLET CARDS ================= */}
      <div className="md:hidden space-y-4">
        {paginatedAdmins.map((admin) => (
          <div
            key={admin.id}
            className="bg-white rounded-2xl shadow p-5"
          >
            <div className="flex items-center gap-4">
              <img
                src={admin.photo}
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <div>
                <h4 className="font-semibold">{admin.name}</h4>
                <p className="text-sm text-gray-500 break-all">
                  {admin.email}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
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
              >
                {visiblePassword === admin.id ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button className="p-2 cursor-pointer rounded-xl bg-emerald-100 text-emerald-600">
                <PencilSquareIcon className="w-5 h-5" />
              </button>
              <button className="p-2 cursor-pointer rounded-xl bg-red-100 text-red-600">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 cursor-pointer py-2 rounded-xl font-semibold
                ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminList;
