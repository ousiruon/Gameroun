import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexPage from "./components/IndexPage";
import ErrorPage from "./components/ErrorPage";
import SingleGame from "./components/SingleGame";
import RandomGame from "./components/RandomGame";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import CategoryPage from "./components/CategoryPage";
import TagsPage from "./components/TagsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: "game/:gameId/:gameName",
        element: <SingleGame />,
      },
      {
        path: "category/:categoryName/:categoryId",
        element: <CategoryPage />,
      },
      {
        path: "randomGame",
        element: <RandomGame />,
      },
      {
        path: "search",
        element: <SearchResults />,
      },
      {
        path: "tags/:tagSlug",
        element: <TagsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
