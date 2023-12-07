import axios from "axios";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzA1M2QwNmU5ZmY3MTY0ZjEzOWQ1NiIsImlhdCI6MTcwMTk2NzU3MSwiZXhwIjoxNzAxOTY5MzcxfQ.gI7JYfOrEzrQQZsUfXHR4Eii38E7rRqVQb07i-3HRGI`;
export const getUser = async (userId) => {
  // console.log(userId);
  const response = await axios.get(
    `http://localhost:8000/api/users/${userId}`
    // {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
  return response.data.data.user;
};
