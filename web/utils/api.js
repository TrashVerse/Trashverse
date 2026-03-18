// utils/api.js
export const BASE_URL = "https://trashverse.onrender.com"; // your Render backend

// Returns headers with JWT token if available
export const getAuthHeader = () => {
  const token = localStorage.getItem("trashverse_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};