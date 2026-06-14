import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { CatalogPage } from "./components/CatalogPage";
import { ProductPage } from "./components/ProductPage";
import { CollectionsPage } from "./components/CollectionsPage";
import { MastersPage } from "./components/MastersPage";
import { ShopPage } from "./components/ShopPage";
import { ProfilePage } from "./components/ProfilePage";
import { AuthPage } from "./components/AuthPage";
import { ApplyPage } from "./components/ApplyPage";
import { CartPage } from "./components/CartPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { OrderSuccessPage } from "./components/OrderSuccessPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "catalog", Component: CatalogPage },
      { path: "catalog/:category", Component: CatalogPage },
      { path: "product/:category/:id", Component: ProductPage },
      { path: "new", Component: CollectionsPage },
      { path: "collections", Component: CollectionsPage },
      { path: "masters", Component: MastersPage },
      { path: "shop/:masterId", Component: ShopPage },
      { path: "profile", Component: ProfilePage },
      { path: "profile/:section", Component: ProfilePage },
      { path: "login", Component: AuthPage },
      { path: "apply", Component: ApplyPage },
      { path: "cart", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "order-success", Component: OrderSuccessPage },
    ],
  },
]);
