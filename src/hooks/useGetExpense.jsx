import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetExpense = () => {
    const {data:allExpnese,refetch:expenseRefetch} = useQuery({
        queryKey: ['all-expense'],
        queryFn: async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/all-expense");
                return response.data
            } catch (error) {
                throw new Error(error)
            }
        }
    });
    return {allExpnese,expenseRefetch}
};

export default useGetExpense;