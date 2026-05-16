import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Analytics from './pages/Analytics';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import Leaves from './pages/Leaves';
import Teams from './pages/Teams';
import Calendar from './pages/Calendar';
import Payroll from './pages/Payroll';
import Messages from './pages/Messages';
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
                <Route path="profile" element={<Profile />} />
                <Route path="employees" element={<Employees />} />
                <Route path="projects" element={<Projects />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="leaves" element={<Leaves />} />
                <Route path="teams" element={<Teams />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="messages" element={<Messages />} />

                {/* Admin Only Routes */}
                <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="payroll" element={<Payroll />} />
                  <Route path="settings" element={<PlaceholderPage title="Settings" />} />
                </Route>

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
