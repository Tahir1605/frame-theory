import { useState } from "react";
import {
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const demoContacts = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@gmail.com`,
  phone: `+91 98765 43${String(i).padStart(2, "0")}`,
}));

const Contacts = () => {
  const [contacts, setContacts] = useState(demoContacts);

  const handleDelete = (id) => {
    if (window.confirm("Delete this contact?")) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="mt-14 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Contacts
        </h2>
        <p className="text-gray-500 mt-1">
          Customer communication details
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm">
              <th className="px-8 py-5 text-left">Customer</th>
              <th className="px-8 py-5 text-left">Email</th>
              <th className="px-8 py-5 text-left">Phone</th>
              <th className="px-8 py-5 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact, idx) => (
              <tr
                key={contact.id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    {/* <div className="w-11 h-11 rounded-full bg-gradient-to from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {contact.name.charAt(0)}
                    </div> */}
                    <span className="font-semibold text-gray-900">
                      {contact.name}
                    </span>
                  </div>
                </td>

                <td className="px-8 py-5">
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="truncate max-w-[220px]">
                      {contact.email}
                    </span>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                      title="Send Email"
                    >
                      <EnvelopeIcon className="w-4 h-4" />
                    </a>
                  </div>
                </td>

                <td className="px-8 py-5">
                  <div className="flex items-center gap-3 text-gray-700">
                    <span>{contact.phone}</span>
                    <a
                      href={`tel:${contact.phone}`}
                      className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
                      title="Call"
                    >
                      <PhoneIcon className="w-4 h-4" />
                    </a>
                  </div>
                </td>

                <td className="px-8 py-5 text-center">
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="p-2 cursor-pointer rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                    title="Delete"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-2xl shadow-md p-5 border border-gray-100"
          >
            <div className="flex items-center gap-3">
              {/* <div className="w-10 h-10 rounded-full bg-gradient-to from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {contact.name.charAt(0)}
              </div> */}
              <div>
                <h3 className="font-semibold text-gray-900">
                  {contact.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {contact.email}
                </p>
              </div>
            </div>

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
                className="p-3 rounded-xl cursor-pointer bg-red-50 text-red-600"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
