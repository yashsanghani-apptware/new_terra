import { BASE_URL } from "@/config/apiBaseUrls";
import axios from "axios";
import { toast } from "react-toastify";

export const login = async (loginData) => {
  try {
    const response = await axios.post(
      `${BASE_URL.POLICY}/auth/login`,
      loginData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return error.response
  }
};

export const signIn = async (signData) => {
  try {
    const response = await axios.post(
      `${BASE_URL.POLICY}/users`,
      signData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return error.response;
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL.POLICY}/auth/refresh-token`,
      {
        token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const newAccessToken = response.data.token;
      // Save the new access token in localStorage
      localStorage.setItem("token", newAccessToken);
      return newAccessToken;
    } else {
      console.error("Failed to refresh token:", response.data.message);
      localStorage.clear();
      window.location.href = "/auth/login";
      return null;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.clear();
    window.location.href = "/auth/login";
    toast.error("Failed to refresh token, please login again.");
    return null;
  }
};

export const createData = async (payload, url) => {
  try {
    const response = await axios.post(
      `${url}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return error.response
  }
};

export const updateData = async (payload, url) => {
  try {
    const response = await axios.put(
      `${url}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return error.response
  }
};

export const updateAccreditationData = async (payload, url, token) => {
  try {
    const response = await axios.put(
      `${url}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return error.response
  }
};

export const uploadDocuments = async (files, url) => {
  try {
    // Create a FormData object to hold the files and metadata
    const formData = new FormData();

    // Append each file to the FormData object
    files.forEach((file, index) => {
      formData.append(file.label, file.file); // Naming each file uniquely
    });
    // Make the axios request
    const response = await axios.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error during file upload:", error);
    return error.response;
  }
};

export const verifyLogin = async (url, code) => {
  try {
    // Make the API call to verify the login
    const response = await axios.put(url, { code });

    if (response.status === 200) {
      return response;
    } else {
      toast.error("Login failed. Please try again.");
      window.location.href = "/auth/login";
    }
  } catch (error) {
    toast.error("Login failed. Please try again.");
    window.location.href = "/auth/login";
  }
};