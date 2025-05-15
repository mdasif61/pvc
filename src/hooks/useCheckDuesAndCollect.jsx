import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCheckDuesAndCollect = (folderId, checkQuery) => {
    const { data: duesAndCollect, refetch: dcRefetch } = useQuery({
        queryKey: ['options', folderId, checkQuery],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/api/options/${folderId}?query=${checkQuery}`);
            return response.data;
        },
        enabled: !!folderId && !!checkQuery
    });

    return { duesAndCollect, dcRefetch };
};

export default useCheckDuesAndCollect;