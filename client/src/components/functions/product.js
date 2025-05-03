import axios from "axios";

export const createProduct = async (token, value) => {
  return await axios.post(import.meta.env.REACT_APP_KEY + "/product", value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const productList = async (count) => {
  return await axios.get(import.meta.env.REACT_APP_KEY + "/product/" + count);
};

export const removeProduct = async (token, id) => {
  return await axios.delete(import.meta.env.REACT_APP_KEY + "/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Update
export const readProduct = async (id) => {
  return await axios.get(import.meta.env.REACT_APP_KEY + "/products/" + id);
};

export const updateProduct = async (token, id, product) => {
  return await axios.put(
    import.meta.env.REACT_APP_KEY + "/product/" + id,
    product,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const productListby = async (sort, order, limit) => {
  return await axios.post(import.meta.env.REACT_APP_KEY + "/productby", {
    sort,
    order,
    limit,
  });
};

//Search
export const searchFilters = async (arg) =>
  await axios.post(import.meta.env.REACT_APP_KEY + "/search/filters", arg);
