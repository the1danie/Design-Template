import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    /* MARKER-MAKE-KIT-INVOKED */
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
