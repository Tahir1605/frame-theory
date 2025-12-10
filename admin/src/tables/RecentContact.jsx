import React from "react";
import { NavLink } from "react-router-dom";

const RecentContact = () => {
  const contacts = [
    { name: "Alice Johnson", email: "alice@gmail.com" },
    { name: "Bob Smith", email: "bob@gmail.com" },
    { name: "Charlie Lee", email: "charlie@gmail.com" },
    { name: "Diana Rose", email: "diana@gmail.com" },
    { name: "Ethan Brown", email: "ethan@gmail.com" },
  ];

  return (
    <div className="mt-12 w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">
        Recent Contacts
      </h2>

      <div className="backdrop-blur-xl bg-white/70 p-6 rounded-3xl shadow-xl border border-gray-200/60">

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4 font-semibold text-sm">SL No.</th>
                <th className="p-4 font-semibold text-sm">Name</th>
                <th className="p-4 font-semibold text-sm">Email</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((contact, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-gray-50/80 transition-all duration-300"
                >
                  <td className="p-4 font-semibold text-gray-900">{i + 1}</td>
                  <td className="p-4 font-medium text-gray-900">{contact.name}</td>
                  <td className="p-4 text-gray-700 font-medium">{contact.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {contacts.map((contact, i) => (
            <div
              key={i}
              className="bg-white/80 border border-gray-200 rounded-3xl p-4 shadow-md hover:shadow-lg transition-all backdrop-blur-xl"
            >
              <p className="text-gray-900 font-bold text-lg">#{i + 1}</p>
              <p className="text-gray-800 font-semibold mt-1">Name: {contact.name}</p>
              <p className="text-gray-600 text-sm mt-1">Email: {contact.email}</p>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="mt-6 flex justify-center">
          <NavLink
            to="/contacts"
            className="px-8 py-2.5 rounded-2xl bg-blue-600 text-white font-semibold text-sm shadow-md hover:shadow-xl hover:bg-blue-700 transition-all"
          >
            See More →
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RecentContact;
