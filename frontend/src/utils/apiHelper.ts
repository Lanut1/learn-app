const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {},
  withCredentials: boolean = true
): Promise<any> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    const fetchOptions: RequestInit = {
      ...options,
      headers,
    };

    if (withCredentials) {
      fetchOptions.credentials = 'include';
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);

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