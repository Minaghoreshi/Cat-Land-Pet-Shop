import axios from "axios";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzA1M2QwNmU5ZmY3MTY0ZjEzOWQ1NiIsImlhdCI6MTcwMTk2NDIzNCwiZXhwIjoxNzAxOTY2MDM0fQ.CDGqdYo-nE7XU70Ukec6Z-QZQPdYPIDd24hc1SLwzQI`;
export const getUser = async (userId) => {
  // console.log(userId);
  const response = await axios.get(
    `http://localhost:8000/api/users/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data.user;
};
