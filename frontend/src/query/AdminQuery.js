import axios from "axios";
import { useMutation } from "react-query";
const adminLogin = (admin) => {
  return axios.post("/admin/login", admin);
};
export const useAdminLogin = () => {
  return useMutation(adminLogin);
};

const getallproducts = () => {
  return axios.get("/admin/getallproducts", {
    headers: {
      token: sessionStorage.getItem("token"),
    },
    retry: 20,
    retryDelay: 1000,
    refetchOnMount: false,
    enabled: false,
  });
};

export const useGetAllProducts = () => {
  return useMutation(getallproducts);
};
