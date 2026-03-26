/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Branches from "./pages/Branches";
import Booking from "./pages/Booking";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Toaster position="top-center" expand={false} richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="branches" element={<Branches />} />
            <Route path="booking" element={<Booking />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
