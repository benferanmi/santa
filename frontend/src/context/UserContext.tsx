
import React, { createContext, useContext, useState, useCallback } from 'react';
import { UserSettings } from '../types/api';
import { UserApiService } from '../services/userApi';

interface UserContextType {
  settings: UserSettings | null;
  loading: boolean;
  error: string | null;
  fetchSettings: () => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  clearError: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserApiService.getSettings();
      if (response.success && response.data) {
        setSettings(response.data);
      } else {
        setError(response.error || 'Failed to fetch settings');
      }
    } catch (err) {
      setError('Failed to fetch settings');
    }
    setLoading(false);
  }, []);

  const updateSettings = useCallback(async (newSettings: Partial<UserSettings>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserApiService.updateSettings(newSettings);
      if (response.success && response.data) {
        setSettings(response.data);
        return true;
      } else {
        setError(response.error || 'Failed to update settings');
        return false;
      }
    } catch (err) {
      setError('Failed to update settings');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserApiService.changePassword(currentPassword, newPassword);
      if (response.success) {
        return true;
      } else {
        setError(response.error || 'Failed to change password');
        return false;
      }
    } catch (err) {
      setError('Failed to change password');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAccount = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserApiService.deleteAccount();
      if (response.success) {
        return true;
      } else {
        setError(response.error || 'Failed to delete account');
        return false;
      }
    } catch (err) {
      setError('Failed to delete account');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        settings,
        loading,
        error,
        fetchSettings,
        updateSettings,
        changePassword,
        deleteAccount,
        clearError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
