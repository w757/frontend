import ProductsView from "./pages/ProductsView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Layout from "./layout/Layout";
import { Row } from "react-bootstrap";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={Layout(<Auth />)} />
        <Route
          path="/"
          element={Layout(
            <Row>
              <ProductsView />
            </Row>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
