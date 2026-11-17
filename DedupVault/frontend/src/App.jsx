import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Backups from "./pages/Backups";
import Snapshots from "./pages/Snapshots";
import StorageExplorer from "./pages/StorageExplorer";
import IntegrityCheck from "./pages/IntegrityCheck";
import Restore from "./pages/Restore";
import ActivityLogs from "./pages/ActivityLogs";
import Settings from "./pages/Settings";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Application Pages */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                }
              />

              <Route
                path="/backups"
                element={
                  <MainLayout>
                    <Backups />
                  </MainLayout>
                }
              />

              <Route
                path="/snapshots"
                element={
                  <MainLayout>
                    <Snapshots />
                  </MainLayout>
                }
              />

              <Route
                path="/storage"
                element={
                  <MainLayout>
                    <StorageExplorer />
                  </MainLayout>
                }
              />

              <Route
                path="/integrity"
                element={
                  <MainLayout>
                    <IntegrityCheck />
                  </MainLayout>
                }
              />

              <Route
                path="/restore"
                element={
                  <MainLayout>
                    <Restore />
                  </MainLayout>
                }
              />

              <Route
                path="/activity"
                element={
                  <MainLayout>
                    <ActivityLogs />
                  </MainLayout>
                }
              />

              <Route
                path="/settings"
                element={
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                }
              />
            </Route>

            {/* Unknown Routes */}
            <Route
              path="*"
              element={<h1 className="p-10">404 - Page Not Found</h1>}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
