import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const demoProfiles = [
  {
    email: 'aiden.mercer@luckyhotel.com',
    name: 'Aiden Mercer',
    role: 'staff',
    staffRole: 'front-desk',
    department: 'Front Desk & Reception',
    position: 'Senior Receptionist',
    employeeId: 'EMP-4109',
    property: 'THE LUCKY HOTEL • Main Property'
  },
  {
    email: 'elena.rostova@luckyhotel.com',
    name: 'Elena Rostova',
    role: 'staff',
    staffRole: 'housekeeping',
    department: 'Housekeeping & Rooms',
    position: 'Housekeeping Supervisor',
    employeeId: 'EMP-3882',
    property: 'THE LUCKY HOTEL • Main Property'
  },
  {
    email: 'mateo.rossi@luckyhotel.com',
    name: 'Mateo Rossi',
    role: 'staff',
    staffRole: 'food-beverage',
    department: 'F&B Service & Banquets',
    position: 'Lead Fine Dining Server',
    employeeId: 'EMP-5021',
    property: 'THE LUCKY HOTEL • Main Property'
  },
  {
    email: 'director@luckyhotel.com',
    name: 'Marcus Vance',
    role: 'manager',
    staffRole: 'management',
    department: 'Operations & Quality Directorate',
    position: 'Director of Learning & Quality Standards',
    employeeId: 'EMP-1002',
    property: 'THE LUCKY HOTEL • Main Property'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [portalType, setPortalType] = useState('staff'); // 'staff' | 'director'

  const fetchUser = async () => {
    try {
      const savedUser = localStorage.getItem('grandluxe_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Start logged out so user can see and test the different login pages!
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to load user:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (identifier, password, expectedRole) => {
    try {
      setLoading(true);
      const res = await api.login(identifier, password, expectedRole);
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('grandluxe_user', JSON.stringify(res.user));
        if (res.token) localStorage.setItem('grandluxe_token', res.token);
        return { success: true, user: res.user };
      } else {
        return { success: false, message: res.message || 'Login failed' };
      }
    } catch (err) {
      return { success: false, message: err.message || 'Connection error' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('grandluxe_user');
    localStorage.removeItem('grandluxe_token');
  };

  const switchUser = async (email) => {
    try {
      setLoading(true);
      const res = await api.switchDemoUser(email);
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('grandluxe_user', JSON.stringify(res.user));
        if (res.token) localStorage.setItem('grandluxe_token', res.token);
      }
    } catch (err) {
      console.error('Failed to switch demo user:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserState = (newUserData) => {
    setUser(prev => {
      const updated = { ...prev, ...newUserData };
      localStorage.setItem('grandluxe_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      portalType,
      setPortalType,
      login,
      logout,
      switchUser,
      refreshUser: fetchUser,
      updateUserState,
      isManager: user?.role === 'manager' || user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
