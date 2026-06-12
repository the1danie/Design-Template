import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { CatalogPage } from "./components/CatalogPage";
import { ProductPage } from "./components/ProductPage";
import { CollectionsPage } from "./components/CollectionsPage";
import { MastersPage } from "./components/MastersPage";
import { AuthPage } from "./components/AuthPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "catalog", Component: CatalogPage },
      { path: "catalog/:category", Component: CatalogPage },
      { path: "product/:category/:id", Component: ProductPage },
      { path: "collections", Component: CollectionsPage },
      { path: "masters", Component: MastersPage },
      { path: "login", Component: AuthPage },
    ],
  },
]);
