
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  showToast?: boolean;
}

export function useApi<T>(
  apiFunction: () => Promise<any>,
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError, showToast = true } = options;
  const { toast } = useToast();
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiFunction();
      const data = response.data;
      
      setState({
        data,
        loading: false,
        error: null,
      });

      if (onSuccess) {
        onSuccess(data);
      }

      if (showToast && response.message) {
        toast({
          title: "Success",
          description: response.message,
        });
      }

      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });

      if (onError) {
        onError(errorMessage);
      }

      if (showToast) {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }

      throw error;
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return {
    ...state,
    execute,
    refetch: execute,
  };
}

export function useMutation<T, P = any>(
  apiFunction: (params: P) => Promise<any>,
  options: UseApiOptions = {}
) {
  const { onSuccess, onError, showToast = true } = options;
  const { toast } = useToast();
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = async (params: P) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiFunction(params);
      const data = response.data;
      
      setState({
        data,
        loading: false,
        error: null,
      });

      if (onSuccess) {
        onSuccess(data);
      }

      if (showToast && response.message) {
        toast({
          title: "Success",
          description: response.message,
        });
      }

      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });

      if (onError) {
        onError(errorMessage);
      }

      if (showToast) {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }

      throw error;
    }
  };

  return {
    ...state,
    mutate,
  };
}
