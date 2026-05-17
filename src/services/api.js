import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Create axios instance ─────────────────────────────────
const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Attach JWT token to every request ────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('aura_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Handle 401 (expired token) globally ──────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('aura_token');
      localStorage.removeItem('aura_user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// ════════════════════════════════════════════════════════════
//   AUTH
// ════════════════════════════════════════════════════════════
export const authApi = {
  login:      (email, password) => api.post('/auth/login', { email, password }),
  register:   (data)            => api.post('/auth/register', data),
  me:         ()                => api.get('/auth/me'),
  updateProfile: (data)         => api.put('/auth/profile', data),
};

// ════════════════════════════════════════════════════════════
//   EMPLOYEES
// ════════════════════════════════════════════════════════════
export const employeesApi = {
  getAll:  ()        => api.get('/employees'),
  getOne:  (id)      => api.get(`/employees/${id}`),
  create:  (data)    => api.post('/employees', data),
  update:  (id,data) => api.put(`/employees/${id}`, data),
  remove:  (id)      => api.delete(`/employees/${id}`),
};

// ════════════════════════════════════════════════════════════
//   LEAVES
// ════════════════════════════════════════════════════════════
export const leavesApi = {
  getAll:       ()          => api.get('/leaves'),
  apply:        (data)      => api.post('/leaves', data),
  updateStatus: (id,status) => api.put(`/leaves/${id}/status`, { status }),
};

// ════════════════════════════════════════════════════════════
//   ATTENDANCE
// ════════════════════════════════════════════════════════════
export const attendanceApi = {
  getByDate:    (date)   => api.get(`/attendance?date=${date}`),
  getMonthly:   (month)  => api.get(`/attendance/monthly?month=${month}`),
  record:       (data)   => api.post('/attendance', data),
};

// ════════════════════════════════════════════════════════════
//   PAYROLL
// ════════════════════════════════════════════════════════════
export const payrollApi = {
  getByMonth:  (month) => api.get(`/payroll?month=${month}`),
  disburse:    (id)    => api.put(`/payroll/${id}/disburse`),
  disburseAll: (month) => api.put('/payroll/disburse-all', { month }),
};

// ════════════════════════════════════════════════════════════
//   MESSAGES
// ════════════════════════════════════════════════════════════
export const messagesApi = {
  getContacts:      ()         => api.get('/messages/contacts'),
  getConversation:  (userId)   => api.get(`/messages/${userId}`),
  send:             (userId,text) => api.post(`/messages/${userId}`, { text }),
};

export default api;
