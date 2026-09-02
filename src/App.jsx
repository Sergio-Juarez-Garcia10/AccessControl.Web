import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import VisitsPage from "./pages/VisitsPage";
import PersonsPage from "./pages/PersonsPage";
import PersonHistoryPage from "./pages/PersonHistoryPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/visitas" element={<VisitsPage />} />
        <Route path="/personas" element={<PersonsPage />} />
        <Route path="/personas/:id/historial" element={<PersonHistoryPage />} />
        <Route path="*" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}
