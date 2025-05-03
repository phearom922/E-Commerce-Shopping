import axios from "axios";

export const updateStatusOrder = async (token, orderId, orderStatus) => {
  return await axios.put(
    import.meta.env.REACT_APP_KEY + "/admin/order-status",
    { orderId, orderStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getAllOrder = async (token) => {
  return await axios.get(
    import.meta.env.REACT_APP_KEY + "/admin/manage-order",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
