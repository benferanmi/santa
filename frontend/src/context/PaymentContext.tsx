import React, { createContext, useContext, useState, useCallback } from "react";
import {
  GenerateVideoResponse,
  GetPlansResponse,
  PaymentMethod,
  PaymentRequest,
  PaymentResponse,
  StripePaymentIntentResponse,
} from "../types/api";
import { PaymentApiService } from "../services/paymentApi";

interface PaymentContextType {
  paymentMethods: PaymentMethod[];
  loading: boolean;
  error: string | null;
  fetchPaymentMethods: () => Promise<void>;
  // addPaymentMethod: (
  //   type: "card" | "paypal" | "stripe",
  //   data: any
  // ) => Promise<boolean>;
  removePaymentMethod: (methodId: string) => Promise<boolean>;
  setDefaultPaymentMethod: (methodId: string) => Promise<boolean>;
  processPayment: (
    paymentData: PaymentRequest,
  ) => Promise<PaymentResponse | null>;
  createStripePaymentIntent: (
    orderData,
  ) => Promise<StripePaymentIntentResponse | null>;
  generateVideo: (data: GenerateVideoData) => Promise<GenerateVideoResponse>;
  getPlans: () => Promise<GetPlansResponse>;
  createPayPalOrder: (
    amount: number,
  ) => Promise<{ orderId: string; approvalUrl: string } | null>;
  clearError: () => void;
}

export interface OrderData {
  childName: string;
  childAge: number;
  pricingId: string;
  door_url?: string;
  someone_special?: string;
}

export interface GenerateVideoData {
  childName: string;
  childAge: number;
  pricingId: string;
  paymentIntentId?: string;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
        setError(response.error || "Failed to fetch payment methods");
      }
    } catch (err) {
      setError("Failed to fetch payment methods");
    }
    setLoading(false);
  }, []);

  // const addPaymentMethod = useCallback(
  //   async (type: "card" | "paypal" | "stripe", data: any): Promise<boolean> => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await PaymentApiService.addPaymentMethod(type, data);
  //       if (response.success && response.data) {
  //         setPaymentMethods((prev) => [...prev, response.data!]);
  //         return true;
  //       } else {
  //         setError(response.error || "Failed to add payment method");
  //         return false;
  //       }
  //     } catch (err) {
  //       setError("Failed to add payment method");
  //       return false;
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   []
  // );

  const removePaymentMethod = useCallback(
    async (methodId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const response = await PaymentApiService.removePaymentMethod(methodId);
        if (response.success) {
          setPaymentMethods((prev) =>
            prev.filter((method) => method.id !== methodId),
          );
          return true;
        } else {
          setError(response.error || "Failed to remove payment method");
          return false;
        }
      } catch (err) {
        setError("Failed to remove payment method");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const setDefaultPaymentMethod = useCallback(
    async (methodId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const response =
          await PaymentApiService.setDefaultPaymentMethod(methodId);
        if (response.success) {
          setPaymentMethods((prev) =>
            prev.map((method) => ({
              ...method,
              isDefault: method.id === methodId,
            })),
          );
          return true;
        } else {
          setError(response.error || "Failed to set default payment method");
          return false;
        }
      } catch (err) {
        setError("Failed to set default payment method");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const processPayment = useCallback(
    async (paymentData: PaymentRequest): Promise<PaymentResponse | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await PaymentApiService.processPayment(paymentData);
        if (response.success && response.data) {
          return response.data;
        } else {
          setError(response.error || "Payment failed");
          return null;
        }
      } catch (err) {
        setError("Payment failed");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const createStripePaymentIntent = useCallback(
    async (
      orderData: OrderData,
    ): Promise<StripePaymentIntentResponse | null> => {
      setLoading(true);
      setError(null);

      try {
        const response =
          await PaymentApiService.createStripePaymentIntent(orderData);

        if (response.success) {
          return response;
        } else {
          setError("Failed to create payment intent");
          return null;
        }
      } catch (err) {
        console.error(err);
        setError("Failed to create payment intent");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const getPlans = useCallback(async (): Promise<GetPlansResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await PaymentApiService.getPlans();

      if (response.success) {
        return response;
      } else {
        setError("Failed to fetch plans");
        return null;
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch plans");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateVideo = useCallback(
    async (data: GenerateVideoData): Promise<GenerateVideoResponse> => {
      setLoading(true);
      setError(null);
      try {
        console.log("called");
        const response = await PaymentApiService.generateVideo(data);
        console.log(response);
        return response;
      } catch (err) {
        console.error(err);
        setError("Failed to fetch plans");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const createPayPalOrder = useCallback(
    async (
      amount: number,
    ): Promise<{ orderId: string; approvalUrl: string } | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await PaymentApiService.createPayPalOrder(amount);
        if (response.success && response.data) {
          return response.data;
        } else {
          setError(response.error || "Failed to create PayPal order");
          return null;
        }
      } catch (err) {
        setError("Failed to create PayPal order");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <PaymentContext.Provider
      value={{
        paymentMethods,
        loading,
        error,
        fetchPaymentMethods,
        // addPaymentMethod,
        removePaymentMethod,
        setDefaultPaymentMethod,
        processPayment,
        createStripePaymentIntent,
        getPlans,
        generateVideo,
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
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
