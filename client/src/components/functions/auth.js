import axios from "axios";

export const register = async (value) =>
  // await axios.post(process.env.REACT_APP_API_URL + "/register", value);
  await axios.post(import.meta.env.REACT_APP_KEY + "/register", value); // This is the correct way to do it

export const login = async (value) =>
  await axios.post(import.meta.env.REACT_APP_KEY + "/login", value); // This is the correct way to do it

export const currentUser = async (token) => {
  return await axios.post(
    import.meta.env.REACT_APP_KEY + "/current-user",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const currentAdmin = async (token) => {
  return await axios.post(
    import.meta.env.REACT_APP_KEY + "/current-admin",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
