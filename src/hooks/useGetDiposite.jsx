import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetDiposite = () => {
    const {data:dipositeData,refetch:dipositeFetch}=useQuery({
        queryKey:['diposite-data'],
        queryFn:async()=>{
            try {
                const response=await axios.get('http://localhost:5000/api/diposite-data');
                return response.data
            } catch (error) {
                throw new Error("Diposite error :", error)
            }
        }
    });
    return {dipositeData,dipositeFetch}
};

export default useGetDiposite;