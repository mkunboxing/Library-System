import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "../pages/global/Topbar";
import Sidebar from "../pages/global/Sidebar";
import Dashboard from "../pages/dashboard";
import Team from "../pages/team";
import Invoices from "../pages/invoices";
import Contacts from "../pages/StudentList";
import Form from "../pages/addStudents";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Calendar from "../pages/calendar/calendar";
import LoadingBar from "./LoadingBar";
import { LoadingProvider } from '../LoadingContext';

function Home({ userDetails }) {
  const [theme, colorMode] = useMode();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LoadingProvider>
          <CssBaseline />
          <div className="app">
            <Box>
              <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
            </Box>
            <main className="content">
              <Box>
                <Topbar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
                <LoadingBar />
              </Box>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </main>
          </div>
        </LoadingProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Home;
