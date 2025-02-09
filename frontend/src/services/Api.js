const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    console.log(response)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};