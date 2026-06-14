import { Navigate, createBrowserRouter } from "react-router";
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
import { SellerDashboardPage } from "./components/SellerDashboardPage";
import { AdminDashboardPage } from "./components/AdminDashboardPage";

export const router = createBrowserRouter([
  { path: "/admin", element: <Navigate to="/admin/dashboard" replace /> },
  { path: "/admin/dashboard", Component: AdminDashboardPage },
  { path: "/admin/users", Component: AdminDashboardPage },
  { path: "/admin/shops", Component: AdminDashboardPage },
  { path: "/admin/products", Component: AdminDashboardPage },
  { path: "/admin/orders", Component: AdminDashboardPage },
  { path: "/admin/categories", Component: AdminDashboardPage },
  { path: "/admin/banners", Component: AdminDashboardPage },
  { path: "/admin/blog", Component: AdminDashboardPage },
  { path: "/admin/finance", Component: AdminDashboardPage },
  { path: "/seller", element: <Navigate to="/seller/dashboard" replace /> },
  { path: "/seller/dashboard", Component: SellerDashboardPage },
  { path: "/seller/products", Component: SellerDashboardPage },
  { path: "/seller/products/new", Component: SellerDashboardPage },
  { path: "/seller/products/:id/edit", Component: SellerDashboardPage },
  { path: "/seller/orders", Component: SellerDashboardPage },
  { path: "/seller/orders/:id", Component: SellerDashboardPage },
  { path: "/seller/reviews", Component: SellerDashboardPage },
  { path: "/seller/messages", Component: SellerDashboardPage },
  { path: "/seller/finance", Component: SellerDashboardPage },
  { path: "/seller/shop", Component: SellerDashboardPage },
  { path: "/seller/settings", Component: SellerDashboardPage },
  { path: "/seller/support", Component: SellerDashboardPage },
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
