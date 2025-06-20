
import React, { createContext, useContext, useState, useCallback } from 'react';
import { PaymentMethod, PaymentRequest, PaymentResponse } from '../types/api';
import { PaymentApiService } from '../services/paymentApi';

interface PaymentContextType {
  paymentMethods: PaymentMethod[];
  loading: boolean;
  error: string | null;
  fetchPaymentMethods: () => Promise<void>;
  addPaymentMethod: (type: 'card' | 'paypal' | 'stripe', data: any) => Promise<boolean>;
  removePaymentMethod: (methodId: string) => Promise<boolean>;
  setDefaultPaymentMethod: (methodId: string) => Promise<boolean>;
  processPayment: (paymentData: PaymentRequest) => Promise<PaymentResponse | null>;
  createStripePaymentIntent: (amount: number) => Promise<string | null>;
  createPayPalOrder: (amount: number) => Promise<{ orderId: string, approvalUrl: string } | null>;
  clearError: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchPaymentMethods = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await PaymentApiService.getPaymentMethods();
      if (response.success && response.data) {
        setPaymentMethods(response.data);
      } else {
        setError(response.error || 'Failed to fetch payment methods');
      }
    } catch (err) {
      setError('Failed to fetch payment methods');
    }
    setLoading(false);
  }, []);

  const addPaymentMethod = useCallback(async (type: 'card' | 'paypal' | 'stripe', data: any): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await PaymentApiService.addPaymentMethod(type, data);
      if (response.success && response.data) {
        setPaymentMethods(prev => [...prev, response.data!]);
        return true;
      } else {
        setError(response.error || 'Failed to add payment method');
        return false;
      }
    } catch (err) {
      setError('Failed to add payment method');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const removePaymentMethod = useCallback(async (methodId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await PaymentApiService.removePaymentMethod(methodId);
      if (response.success) {
        setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
        return true;
      } else {
        setError(response.error || 'Failed to remove payment method');
        return false;
      }
    } catch (err) {
      setError('Failed to remove payment method');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const setDefaultPaymentMethod = useCallback(async (methodId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await PaymentApiService.setDefaultPaymentMethod(methodId);
      if (response.success) {
        setPaymentMethods(prev => prev.map(method => ({
          ...method,
          isDefault: method.id === methodId
        })));
        return true;
      } else {
        setError(response.error || 'Failed to set default payment method');
        return false;
      }
    } catch (err) {
      setError('Failed to set default payment method');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const processPayment = useCallback(async (paymentData: PaymentRequest): Promise<PaymentResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await PaymentApiService.processPayment(paymentData);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Payment failed');
        return null;
      }
    } catch (err) {
      setError('Payment failed');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createStripePaymentIntent = useCallback(async (amount: number): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await PaymentApiService.createStripePaymentIntent(amount);
      if (response.success && response.data) {
        return response.data.clientSecret;
      } else {
        setError(response.error || 'Failed to create payment intent');
        return null;
      }
    } catch (err) {
      setError('Failed to create payment intent');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPayPalOrder = useCallback(async (amount: number): Promise<{ orderId: string, approvalUrl: string } | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await PaymentApiService.createPayPalOrder(amount);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Failed to create PayPal order');
        return null;
      }
    } catch (err) {
      setError('Failed to create PayPal order');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <PaymentContext.Provider
      value={{
        paymentMethods,
        loading,
        error,
        fetchPaymentMethods,
        addPaymentMethod,
        removePaymentMethod,
        setDefaultPaymentMethod,
        processPayment,
        createStripePaymentIntent,
        createPayPalOrder,
        clearError,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
