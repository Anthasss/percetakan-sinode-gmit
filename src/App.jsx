import "./App.css";
import Layout from "./navigation/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

function App() {
  console.log("Auth0 Domain:", import.meta.env.VITE_AUTH0_DOMAIN);
  console.log("Auth0 Client ID:", import.meta.env.VITE_AUTH0_CLIENT_ID);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/product/:productId"
            element={<ProductPage />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
