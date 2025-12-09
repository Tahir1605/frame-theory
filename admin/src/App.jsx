import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddBlog from "./components/AddBlog";
import AddPhoto from "./components/AddPhoto";
import AdminList from "./components/AdminList";
import BlogList from "./components/BlogList";
import Contacts from "./components/Contacts";
import Dashboard from "./components/Dashboard";
import PhotoList from "./components/PhotoList";
import Review from "./components/Review";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Logout from "./components/Logout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout><Dashboard /></Layout>
    },
    {
      path: "/admin-list",
      element: <Layout><AdminList /></Layout>
    },
    {
      path: "/add-photo",
      element: <Layout><AddPhoto /></Layout>
    },
    {
      path: "/photo-list",
      element: <Layout><PhotoList /></Layout>
    },
    {
      path: "/add-blog",
      element: <Layout><AddBlog /></Layout>
    },
    {
      path: "/blog-list",
      element: <Layout><BlogList /></Layout>
    },
    {
      path: "/review",
      element: <Layout><Review /></Layout>
    },
    {
      path: "/contacts",
      element: <Layout><Contacts /></Layout>
    },
    {
      path: "/profile",
      element: <Layout><Profile /></Layout>
    },
    {
      path: "/logout",
      element: <Layout><Logout /></Layout>
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
