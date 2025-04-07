import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar.tsx";
import { Wrappers } from "./Wrappers.tsx";
import { App } from "./App.tsx";
import { Login } from "./pages/Login.tsx";
import { Performance } from "./pages/Performance.tsx";

createRoot(document.getElementById("root")!).render(
  <Wrappers>
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="performance/:baseCrypto" element={<Performance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Wrappers>
);
