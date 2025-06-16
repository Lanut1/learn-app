const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<any> => {
  try {
    const token = localStorage.getItem('token');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      const errorData = await response.json();

      if (errorData.message) {
        errorMessage = Array.isArray(errorData.message)
          ? errorData.message.join(', ')
          : errorData.message;
      }

      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return { success: true };
    }

    return response.json();
  } catch (error) {
    console.error(`API Fetch Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};