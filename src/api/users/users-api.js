import axios from "axios";
export const getUserFirstName = async (userId) => {
  // console.log(userId);
  const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
  return response.data.data.user.firstname;
};
export const getUserLastName = async (userId) => {
  const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
  return response.data.data.user.lastname;
};
