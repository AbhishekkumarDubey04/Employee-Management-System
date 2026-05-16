import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Analytics from './pages/Analytics';
import Projects from './pages/Projects';
import Auth from './pages/Auth';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="employees" element={<Employees />} />
                <Route path="projects" element={<Projects />} />
                
                {/* Admin Only Routes */}
                <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="payroll" element={<PlaceholderPage title="Payroll" />} />
                  <Route path="settings" element={<PlaceholderPage title="Settings" />} />
                </Route>

                {/* Common Routes */}
                <Route path="attendance" element={<PlaceholderPage title="Attendance" />} />
                <Route path="leaves" element={<PlaceholderPage title="Leaves" />} />
                <Route path="teams" element={<PlaceholderPage title="Teams" />} />
                <Route path="calendar" element={<PlaceholderPage title="Calendar" />} />
                <Route path="messages" element={<PlaceholderPage title="Messages" />} />
                <Route path="slack" element={<PlaceholderPage title="Slack Integration" />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
