import axios from "axios";

export const createCategory = async (token, value) => {
  return await axios.post(import.meta.env.REACT_APP_KEY + "/category", value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listCategory = async (token) =>
  await axios.get(import.meta.env.REACT_APP_KEY + "/category", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteCategory = async (token, id) =>
  await axios.delete(import.meta.env.REACT_APP_KEY + "/category/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const editCategory = async (token, id, newCategory) => {
  return await axios.put(
    import.meta.env.REACT_APP_KEY + "/category/" + id,
    newCategory,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
