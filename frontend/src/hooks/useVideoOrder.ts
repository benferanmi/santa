
import { useVideo } from '../context/VideoContext';

// Re-export the video context hook for backward compatibility
export const useVideoOrder = () => {
  const videoContext = useVideo();
  
  return {
    orders: videoContext.orders,
    loading: videoContext.loading,
    createOrder: async (orderData: {
      childName: string;
      childAge: string;
      frontDoorImage?: File;
    }) => {
      const result = await videoContext.createVideoOrder({
        childName: orderData.childName,
        childAge: orderData.childAge,
        frontDoorImage: orderData.frontDoorImage,
        videoStyle: 'classic'
      });
      
      if (result) {
        // Return a simplified order object for backward compatibility
        return {
          id: result.orderId,
          childName: orderData.childName,
          childAge: orderData.childAge,
          frontDoorImage: orderData.frontDoorImage ? URL.createObjectURL(orderData.frontDoorImage) : undefined,
          status: 'pending' as const,
          paymentStatus: 'pending' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
      
      return null;
    },
    getOrders: videoContext.fetchOrders,
  };
};
