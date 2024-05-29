import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "../pages/global/Topbar";
import Sidebar from "../pages/global/Sidebar";
import Dashboard from "../pages/dashboard";
import Team from "../pages/team";
import Invoices from "../pages/invoices";
import Contacts from "../pages/StudentList";
import Form from "../pages/addStudents";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Calendar from "../pages/calendar/calendar";

function Home() {
  const [theme, colorMode] = useMode();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
          <main className="content">
            <Topbar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Home;
