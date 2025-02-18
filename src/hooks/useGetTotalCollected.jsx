import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetTotalCollected = () => {
    const {data:totalCollectedTk,refetch:totalCollectedTkRefetch}=useQuery({
        queryKey:['total-collected'],
        queryFn:async()=>{
            const response=await axios.get('http://localhost:5000/api/total-collected');
            return response.data;
        }
    });
    return {totalCollectedTk,totalCollectedTkRefetch}
};

export default useGetTotalCollected;