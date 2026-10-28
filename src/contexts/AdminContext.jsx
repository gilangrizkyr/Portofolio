import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);
  const [adminData, setAdminData] = useState(null);

  const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

  // Check for existing session on load
  useEffect(() => {
    const checkSession = () => {
      const sessionData = localStorage.getItem('adminSession');
      if (sessionData) {
        try {
          const { timestamp, authenticated, adminId } = JSON.parse(sessionData);
          const now = new Date().getTime();
          
          // Check if session is still valid (30 minutes)
          if (authenticated && adminId && (now - timestamp) < SESSION_DURATION) {
            setIsAuthenticated(true);
            setAdminData({ id: adminId });
          } else {
            // Session expired, remove it
            localStorage.removeItem('adminSession');
            setIsAuthenticated(false);
            setAdminData(null);
          }
        } catch (error) {
          localStorage.removeItem('adminSession');
          setIsAuthenticated(false);
          setAdminData(null);
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, [SESSION_DURATION]);

  // Auto logout after session expires
  useEffect(() => {
    if (isAuthenticated) {
      const sessionTimer = setInterval(() => {
        const sessionData = localStorage.getItem('adminSession');
        if (sessionData) {
          const { timestamp } = JSON.parse(sessionData);
          const now = new Date().getTime();
          
          if ((now - timestamp) >= SESSION_DURATION) {
            logout();
          }
        }
      }, 60000); // Check every minute

      return () => clearInterval(sessionTimer);
    }
  }, [isAuthenticated, SESSION_DURATION]);

  // Login function with database verification
  const login = async (username, password) => {
    // Check if account is locked
    if (lockoutTime && new Date().getTime() < lockoutTime) {
      const remainingTime = Math.ceil((lockoutTime - new Date().getTime()) / 1000 / 60);
      throw new Error(`Account locked. Try again in ${remainingTime} minutes.`);
    }

    if (!supabase) {
      if (username === 'admin' && password === 'admin123') {
        const sessionData = {
          authenticated: true,
          timestamp: new Date().getTime(),
          adminId: 'local-admin',
          username: 'admin',
          email: 'admin@local.dev',
          fullName: 'Gilang Rizky Ramadhan'
        };
        localStorage.setItem('adminSession', JSON.stringify(sessionData));
        setIsAuthenticated(true);
        setAdminData({
          id: 'local-admin',
          username: 'admin',
          email: 'admin@local.dev',
          fullName: 'Gilang Rizky Ramadhan'
        });
        setLoginAttempts(0);
        return { success: true, user: sessionData };
      }
      throw new Error('Invalid username or password (offline mode: use admin / admin123).');
    }

    try {
      // Call Supabase RPC function to verify login
      const { data, error } = await supabase.rpc('verify_admin_login', {
        p_username: username,
        p_password: password
      });

      if (error) {
        console.error('Login error:', error);
        throw new Error('An error occurred during login. Please try again.');
      }

      // Check if login successful
      if (data && data.length > 0 && data[0].success) {
        const admin = data[0];
        
        // Update last login timestamp
        await supabase.rpc('update_admin_last_login', {
          p_admin_id: admin.admin_id
        });

        // Create session
        const sessionData = {
          authenticated: true,
          timestamp: new Date().getTime(),
          adminId: admin.admin_id,
          username: admin.username,
          email: admin.email,
          fullName: admin.full_name
        };
        
        localStorage.setItem('adminSession', JSON.stringify(sessionData));
        setIsAuthenticated(true);
        setAdminData({
          id: admin.admin_id,
          username: admin.username,
          email: admin.email,
          fullName: admin.full_name
        });
        setLoginAttempts(0);
        setLockoutTime(null);
        
        console.log('✅ Admin logged in successfully:', admin.username);
        return true;
      } else {
        // Failed login
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        // Lock account after 3 failed attempts for 15 minutes
        if (newAttempts >= 3) {
          const lockTime = new Date().getTime() + (15 * 60 * 1000); // 15 minutes
          setLockoutTime(lockTime);
          throw new Error('Too many failed login attempts. Account locked for 15 minutes.');
        }

        throw new Error(`Invalid username or password. Remaining attempts: ${3 - newAttempts}`);
      }
    } catch (err) {
      // If error already thrown, re-throw it
      if (err.message.includes('Account locked') || err.message.includes('Invalid username')) {
        throw err;
      }
      
      console.error('Login error:', err);
      throw new Error('An error occurred during login. Please try again.');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('adminSession');
    setIsAuthenticated(false);
    setAdminData(null);
    setLoginAttempts(0);
    setLockoutTime(null);
    console.log('🚪 Admin logged out');
  };

  // Extend session
  const extendSession = () => {
    if (isAuthenticated && adminData) {
      const sessionData = {
        authenticated: true,
        timestamp: new Date().getTime(),
        adminId: adminData.id,
        username: adminData.username,
        email: adminData.email,
        fullName: adminData.fullName
      };
      localStorage.setItem('adminSession', JSON.stringify(sessionData));
    }
  };

  // Get remaining session time
  const getSessionTimeRemaining = () => {
    const sessionData = localStorage.getItem('adminSession');
    if (sessionData && isAuthenticated) {
      const { timestamp } = JSON.parse(sessionData);
      const elapsed = new Date().getTime() - timestamp;
      const remaining = SESSION_DURATION - elapsed;
      return Math.max(0, remaining);
    }
    return 0;
  };

  const value = {
    isAuthenticated,
    isLoading,
    adminData,
    login,
    logout,
    extendSession,
    getSessionTimeRemaining,
    loginAttempts,
    lockoutTime
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};