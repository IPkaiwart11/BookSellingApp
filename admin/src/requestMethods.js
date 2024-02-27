// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
// console.log(TOKEN);
// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { token: `Bearer ${TOKEN}` },
// });




import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

// Function to get the access token from localStorage
const getToken = () => {
  const persistedRoot = localStorage.getItem("persist:root");
  if (persistedRoot) {
    const user = JSON.parse(JSON.parse(persistedRoot).user);
    return user?.currentUser?.accessToken || null;
  }
  return null;
};

// Create a userRequest with the access token if available
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${getToken()}` },
});

// Create a publicRequest without the access token
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
