import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddBlog from "./components/AddBlog";
import AddPhoto from "./components/AddPhoto";
import Admin from "./components/Admin";
import BlogList from "./components/BlogList";
import Contacts from "./components/Contacts";
import Dashboard from "./components/Dashboard";
import PhotoList from "./components/PhotoList";
import Review from "./components/Review";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Logout from "./components/Logout";

// ⏬ Import new components
import AddVideo from "./components/AddVideo";
import VideoList from "./components/VideoList";
import EditPhoto from "./components/EditPhoto";
import EditPhotoList from "./components/EditPhotoList";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Dashboard />
        </Layout>
      ),
    },
    {
      path: "/admin",
      element: (
        <Layout>
          <Admin />
        </Layout>
      ),
    },
    {
      path: "/add-photo",
      element: (
        <Layout>
          <AddPhoto />
        </Layout>
      ),
    },
    {
      path: "/photo-list",
      element: (
        <Layout>
          <PhotoList />
        </Layout>
      ),
    },
    {
      path: "/edit-photo",
      element: (
        <Layout>
          <EditPhoto/>
        </Layout>
      ),
    },
    {
      path: "/edit-photo-list",
      element: (
        <Layout>
          <EditPhotoList/>
        </Layout>
      ),
    },
    {
      path: "/add-blog",
      element: (
        <Layout>
          <AddBlog />
        </Layout>
      ),
    },
    {
      path: "/blog-list",
      element: (
        <Layout>
          <BlogList />
        </Layout>
      ),
    },
    {
      path: "/review",
      element: (
        <Layout>
          <Review />
        </Layout>
      ),
    },
    {
      path: "/contacts",
      element: (
        <Layout>
          <Contacts />
        </Layout>
      ),
    },

    // ⏬ NEW ROUTES
    {
      path: "/add-video",
      element: (
        <Layout>
          <AddVideo />
        </Layout>
      ),
    },
    {
      path: "/video-list",
      element: (
        <Layout>
          <VideoList />
        </Layout>
      ),
    },

    {
      path: "/profile",
      element: (
        <Layout>
          <Profile />
        </Layout>
      ),
    },
    {
      path: "/logout",
      element: (
        <Layout>
          <Logout />
        </Layout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
