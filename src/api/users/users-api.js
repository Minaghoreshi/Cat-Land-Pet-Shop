import axios from "axios";
import api from "../axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");

export const getUserFirstName = async (userId) => {
  // console.log(userId);
  const response = await api.get(`http://localhost:8000/api/users/${userId}`);
  return response.data.data.user.firstname;
};
export const getUserLastName = async (userId) => {
  const response = await api.get(`http://localhost:8000/api/users/${userId}`);
  return response.data.data.user.lastname;
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get("http://localhost:8000/api/users", {
      params: { _id: userId },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const editUserById = async (userId, data) => {
  try {
    const response = await api.patch(
      `http://localhost:8000/api/users/${userId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Product edited successfully:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
