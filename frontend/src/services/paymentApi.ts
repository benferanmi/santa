
import api from '../lib/api';
import { PaymentMethod, PaymentRequest, PaymentResponse, ApiResponse } from '../types/api';

export class PaymentApiService {
  // Get user's payment methods
  static async getPaymentMethods(): Promise<ApiResponse<PaymentMethod[]>> {
    try {
      const response = await api.get('/payments/methods');
      return response;
      
      // Expected JSON from backend:
      // {
      //   "success": true,
      //   "data": [
      //     {
      //       "id": "pm_123",
      //       "type": "card",
      //       "last4": "4242",
      //       "brand": "visa",
      //       "expiryMonth": 12,
      //       "expiryYear": 2025,
      //       "isDefault": true
      //     },
      //     {
      //       "id": "pm_456",
      //       "type": "paypal",
      //       "isDefault": false
      //     }
      //   ]
      // }
    } catch (error) {
      return { success: false, error: 'Failed to fetch payment methods' };
    }
  }

  // Add new payment method
  static async addPaymentMethod(type: 'card' | 'paypal' | 'stripe', data: any): Promise<ApiResponse<PaymentMethod>> {
    try {
      const response = await api.post('/payments/methods', { type, ...data });
      return response;

      // Expected request body for card:
      // {
      //   "type": "card",
      //   "cardNumber": "4242424242424242",
      //   "expiryMonth": 12,
      //   "expiryYear": 2025,
      //   "cvv": "123",
      //   "nameOnCard": "John Doe"
      // }
      
      // Expected request body for PayPal:
      // {
      //   "type": "paypal",
      //   "paypalEmail": "user@paypal.com"
      // }
      
      // Expected response: Single PaymentMethod object
    } catch (error) {
      return { success: false, error: 'Failed to add payment method' };
    }
  }

  // Remove payment method
  static async removePaymentMethod(methodId: string): Promise<ApiResponse<void>> {
    try {
      const response = await api.delete(`/payments/methods/${methodId}`);
      return response;
      
      // Expected response:
      // {
      //   "success": true,
      //   "message": "Payment method removed successfully"
      // }
    } catch (error) {
      return { success: false, error: 'Failed to remove payment method' };
    }
  }

  // Set default payment method
  static async setDefaultPaymentMethod(methodId: string): Promise<ApiResponse<void>> {
    try {
      const response = await api.put(`/payments/methods/${methodId}/default`, {});
      return response;
      
      // Expected response:
      // {
      //   "success": true,
      //   "message": "Default payment method updated"
      // }
    } catch (error) {
      return { success: false, error: 'Failed to set default payment method' };
    }
  }

  // Process payment
  static async processPayment(paymentData: PaymentRequest): Promise<ApiResponse<PaymentResponse>> {
    try {
      const response = await api.post('/payments/process', paymentData);
      return response;

      // Expected request body:
      // {
      //   "amount": 4999, // in cents
      //   "currency": "usd",
      //   "paymentMethodId": "pm_123",
      //   "orderData": {
      //     "childName": "Emma",
      //     "childAge": "7",
      //     "frontDoorImage": "base64_string_or_url"
      //   }
      // }
      
      // Expected response:
      // {
      //   "success": true,
      //   "data": {
      //     "id": "pay_123",
      //     "status": "completed", // or "pending" for redirects
      //     "amount": 4999,
      //     "currency": "usd",
      //     "paymentUrl": "https://stripe.com/pay/...", // for redirects
      //     "orderId": "order_456"
      //   }
      // }
    } catch (error) {
      return { success: false, error: 'Failed to process payment' };
    }
  }

  // Create Stripe payment intent
  static async createStripePaymentIntent(amount: number, currency: string = 'usd'): Promise<ApiResponse<{ clientSecret: string }>> {
    try {
      const response = await api.post('/payments/stripe/intent', { amount, currency });
      return response;

      // Expected request body:
      // {
      //   "amount": 4999,
      //   "currency": "usd"
      // }
      
      // Expected response:
      // {
      //   "success": true,
      //   "data": {
      //     "clientSecret": "pi_123_secret_456"
      //   }
      // }
    } catch (error) {
      return { success: false, error: 'Failed to create payment intent' };
    }
  }

  // Create PayPal order
  static async createPayPalOrder(amount: number, currency: string = 'USD'): Promise<ApiResponse<{ orderId: string, approvalUrl: string }>> {
    try {
      const response = await api.post('/payments/paypal/order', { amount, currency });
      return response;

      // Expected request body:
      // {
      //   "amount": 49.99,
      //   "currency": "USD"
      // }
      
      // Expected response:
      // {
      //   "success": true,
      //   "data": {
      //     "orderId": "paypal_order_123",
      //     "approvalUrl": "https://www.paypal.com/checkoutnow?token=..."
      //   }
      // }
    } catch (error) {
      return { success: false, error: 'Failed to create PayPal order' };
    }
  }

  // Verify payment status
  static async verifyPayment(paymentId: string): Promise<ApiResponse<PaymentResponse>> {
    try {
      const response = await api.get(`/payments/verify/${paymentId}`);
      return response;
      
      // Expected response: Same as processPayment response
    } catch (error) {
      return { success: false, error: 'Failed to verify payment' };
    }
  }
}
