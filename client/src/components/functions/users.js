import axios from "axios";

export const listUser = async (token) => {
  return await axios.get(import.meta.env.REACT_APP_KEY + "/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeStatus = async (token, value) => {
  return await axios.post(
    import.meta.env.REACT_APP_KEY + "/change-status",
    value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const changeRole = async (token, value) => {
  return await axios.post(
    import.meta.env.REACT_APP_KEY + "/change-role",
    value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeUser = async (token, id) => {
  return await axios.delete(import.meta.env.REACT_APP_KEY + "/users/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const resetPassword = async (token, id, values) => {
  return await axios.put(
    import.meta.env.REACT_APP_KEY + "/users/" + id,
    values,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const userCart = async (token, cart) => {
  return await axios.post(
    import.meta.env.REACT_APP_KEY + "/user/cart",
    { cart },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getUserCart = async (token) => {
  return await axios.get(import.meta.env.REACT_APP_KEY + "/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const emptyCart = async (token) => {
  return await axios.delete(import.meta.env.REACT_APP_KEY + "/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveAddress = async (token, address) => {
  return await axios.post(
    import.meta.env.REACT_APP_KEY + "/user/address",
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const saveOrder = async (token) => {
  return await axios.post(
    import.meta.env.REACT_APP_KEY + "/user/order",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};




export const getOrders = async (token) => {
  return await axios.get(import.meta.env.REACT_APP_KEY + "/user/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWishlist = async (token) => {
  return await axios.get(import.meta.env.REACT_APP_KEY + "/user/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addToWishlist = async (token, productId) => {
  return await axios.post(
    import.meta.env.REACT_APP_KEY + "/user/wishlist",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeWishlist = async (token, productId) => {
  return await axios.put(
    import.meta.env.REACT_APP_KEY + "/user/wishlist/" + productId,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};