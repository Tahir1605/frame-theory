import { useState, useMemo } from "react";
import {
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

/* ================= DEMO DATA ================= */
const demoContacts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@gmail.com`,
  phone: `+91 98765 43${String(i).padStart(2, "0")}`,
}));

const ITEMS_PER_PAGE = 5;

const Contacts = () => {
  const [contacts, setContacts] = useState(demoContacts);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    if (window.confirm("Delete this contact?")) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setPage(1);
    }
  };

  /* ================= SEARCH ================= */
  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    );
  }, [contacts, search]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentContacts = filteredContacts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="mt-14 px-4 max-w-7xl mx-auto">

      {/* ================= HEADER ================= */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900">
            Contacts
          </h2>
          <p className="text-gray-500 mt-1">
            Customer communication details
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-72 px-4 py-3 rounded-xl bg-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* ================= DESKTOP / TABLET TABLE ================= */}
      <div className="hidden md:block bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-4 lg:px-8 py-5 text-left w-[22%]">
                Customer
              </th>
              <th className="px-4 lg:px-8 py-5 text-left w-[33%]">
                Email
              </th>
              <th className="px-4 lg:px-8 py-5 text-left w-[25%]">
                Phone
              </th>
              <th className="px-4 lg:px-8 py-5 text-center w-[20%]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {currentContacts.map((contact, idx) => (
              <tr
                key={contact.id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                } hover:bg-gray-100 transition`}
              >
                {/* Customer */}
                <td className="px-4 lg:px-8 py-5 font-semibold text-gray-900 whitespace-nowrap truncate">
                  {contact.name}
                </td>

                {/* Email */}
                <td className="px-4 lg:px-8 py-5">
                  <div className="flex items-center gap-2 max-w-full">
                    <span className="truncate whitespace-nowrap text-gray-700">
                      {contact.email}
                    </span>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      <EnvelopeIcon className="w-4 h-4" />
                    </a>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-4 lg:px-8 py-5">
                  <div className="flex items-center gap-2">
                    <span className="truncate whitespace-nowrap text-gray-700">
                      {contact.phone}
                    </span>
                    <a
                      href={`tel:${contact.phone}`}
                      className="shrink-0 p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                    >
                      <PhoneIcon className="w-4 h-4" />
                    </a>
                  </div>
                </td>

                {/* Action */}
                <td className="px-4 lg:px-8 py-5 text-center">
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="p-2 cursor-pointer rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}

            {currentContacts.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-400">
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {currentContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-2xl shadow-md p-5"
          >
            <h3 className="font-semibold truncate">
              {contact.name}
            </h3>

            <p className="text-sm text-gray-500 truncate mt-1">
              {contact.email}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              {contact.phone}
            </p>

            <div className="flex justify-between mt-4">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`}
                className="p-3 rounded-xl bg-blue-50 text-blue-600"
              >
                <EnvelopeIcon className="w-5 h-5" />
              </a>

              <a
                href={`tel:${contact.phone}`}
                className="p-3 rounded-xl bg-green-50 text-green-600"
              >
                <PhoneIcon className="w-5 h-5" />
              </a>

              <button
                onClick={() => handleDelete(contact.id)}
                className="p-3 cursor-pointer rounded-xl bg-red-50 text-red-600"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 cursor-pointer py-2 rounded-xl font-medium ${
                page === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
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

export default Contacts;
