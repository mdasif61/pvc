import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetFolder = () => {
  const {data:allFolder,refetch:folderFetch} = useQuery({
    queryKey: ["all-folder"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/all-folder"
        );
        return response.data;
      } catch (error) {
        throw new Error("all-folder error :",error)
      }
    },
  });
  return {allFolder,folderFetch}
};

export default useGetFolder;
