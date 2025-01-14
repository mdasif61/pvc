import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSizeAndQuantityCalc = (id) => {
  const {
    data: sizeAndQuantity,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sizeAndQuantityCalu", id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sizeAndQuantityCalu/${id}`
        );
        return response.data;
      } catch (error) {
        throw new Error("Size And Quantity Calc :", error);
      }
    },
  });
  return { sizeAndQuantity, isLoading, refetch };
};

export default useSizeAndQuantityCalc;
