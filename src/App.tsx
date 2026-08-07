/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./lib/CartContext";
import ScrollToTop from "./components/ScrollToTop";

import Header from "./components/Header";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import ThankYou from "./pages/ThankYou";

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="font-sans antialiased overflow-x-hidden selection:bg-[#0a0a0a] selection:text-white bg-white text-[#0a0a0a] flex flex-col min-h-screen">
            <Header />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/thank-you" element={<ThankYou />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
}
