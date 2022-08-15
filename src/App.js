import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./components/HomePage";
import Countries from "./components/Countries";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="countries" element={<Countries />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
