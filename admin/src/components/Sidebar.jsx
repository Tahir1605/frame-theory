import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  PhotoIcon,
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  { name: "Dashboard", path: "/", icon: HomeIcon },
  { name: "Admin", path: "/admin", icon: ClipboardDocumentListIcon },
  { name: "Add Photo", path: "/add-photo", icon: PhotoIcon },
  { name: "Photo List", path: "/photo-list", icon: PhotoIcon },
  { name: "Edit Photo", path: "/edit-photo", icon: PhotoIcon },
  { name: "Edit Photo List", path: "/edit-photo-list", icon: PhotoIcon },
  { name: "Add Video", path: "/add-video", icon: VideoCameraIcon },
  { name: "Video List", path: "/video-list", icon: VideoCameraIcon },
  { name: "Add Blog", path: "/add-blog", icon: PencilSquareIcon },
  { name: "Blog List", path: "/blog-list", icon: ClipboardDocumentListIcon },
  { name: "Review", path: "/review", icon: ChatBubbleLeftRightIcon },
  { name: "Contacts", path: "/contacts", icon: PhoneIcon },
];

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 z-40
          h-screen w-64
          bg-white/95 backdrop-blur-xl shadow-2xl
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-64"}
          md:translate-x-0
          rounded-r-2xl
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0">
          <h2 className="text-2xl font-extrabold text-blue-600 tracking-wide">
            Admin Panel
          </h2>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-200"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Menu */}
        <nav className="flex-1 overflow-y-auto px-4 pb-6 sidebar-scroll">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `
                        flex items-center gap-4 px-4 py-3 rounded-xl
                        font-medium transition-all duration-200
                        ${
                          isActive
                            ? "bg-blue-600 text-white shadow-lg"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                      `
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`h-5 w-5 ${
                            isActive ? "text-white" : "text-blue-600"
                          }`}
                        />
                        <span className="truncate">{item.name}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
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

      {/* Scrollbar styling */}
      <style>
        {`
          .sidebar-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .sidebar-scroll::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,0.15);
            border-radius: 10px;
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;
