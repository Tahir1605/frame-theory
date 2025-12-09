import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  PhotoIcon,
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <HomeIcon className="h-5 w-5" /> },
  { name: "Admin List", path: "/admin-list", icon: <ClipboardDocumentListIcon className="h-5 w-5" /> },
  { name: "Add Photo", path: "/add-photo", icon: <PhotoIcon className="h-5 w-5" /> },
  { name: "Photo List", path: "/photo-list", icon: <PhotoIcon className="h-5 w-5" /> },
  { name: "Add Blog", path: "/add-blog", icon: <PencilSquareIcon className="h-5 w-5" /> },
  { name: "Blog List", path: "/blog-list", icon: <ClipboardDocumentListIcon className="h-5 w-5" /> },
  { name: "Review", path: "/review", icon: <ChatBubbleLeftRightIcon className="h-5 w-5" /> },
  { name: "Contacts", path: "/contacts", icon: <PhoneIcon className="h-5 w-5" /> },
];

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 
          bg-white/95 backdrop-blur-xl shadow-2xl
          transition-transform duration-300 z-40
          ${open ? "translate-x-0" : "-translate-x-64"}
          md:translate-x-0
          rounded-r-2xl
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-2xl font-extrabold text-blue-600 tracking-wide">
            Admin Panel
          </h2>

          <button
            className="md:hidden cursor-pointer p-2 rounded-lg hover:bg-gray-200"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-4">
          <ul className="px-4 space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-4 px-4 py-3 rounded-xl
                    transition-all duration-200 font-medium
                    ${
                      isActive
                        ? "bg-blue-600 from-blue-600 to-blue-500 text-white shadow-lg scale-[1.02]"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `
                  }
                  onClick={() => setOpen(false)}
                >
                  <div className="text-blue-600">{item.icon}</div>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
