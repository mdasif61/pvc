import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useGetTotalExpense = () => {
    const {data:totalExpenseAmount,refetch:totalAmountRefetch}=useQuery({
        queryKey:['total-expense'],
        queryFn:async()=>{
            try {
                const response=await axios.get('http://localhost:5000/api/total-expense');
                return response.data;
            } catch (error) {
                throw new Error (error)
            }
        }
    });
    return {totalExpenseAmount, totalAmountRefetch}
};

export default useGetTotalExpense;