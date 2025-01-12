import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetProduct = () => {
  const {
    data: allProduct,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-product"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/all-product"
        );
        return response.data;
      } catch (error) {
        throw new Error("all-product error :", error);
      }
    },
  });
  return { allProduct, isLoading, refetch };
};

export default useGetProduct;
