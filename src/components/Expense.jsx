import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useGetExpense from '../hooks/useGetExpense';
import useGetTotalExpense from '../hooks/useGetTotalExpense';

const Expense = () => {
    const [expenseTitle, setExpenseTitle] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const { allExpnese, expenseRefetch } = useGetExpense();
    const { totalExpenseAmount, totalAmountRefetch } = useGetTotalExpense();

    const saveExpense = async (e) => {
        e.preventDefault()
        const expenseData = {
            title: expenseTitle,
            amount: expenseAmount
        };

        const config = {
            headers: {
                "Content-type":"application/json"
            }
        }
        if (expenseTitle || expenseAmount) {
            const response = await axios.post(`http://localhost:5000/api/expense`, expenseData, config);

            if (response.status === 201) {
                setExpenseAmount("");
                setExpenseTitle("");
                expenseRefetch();
                totalAmountRefetch();
                toast.success("expense saved");
            }
        } else {
            toast.error("please fill the input")
        }

    }

    return (
        <div className='relative w-full h-full'>

            {allExpnese?.map((expense) => (
                <div className='flex justify-between items-center border-b'>
                    <h1>{expense.title}</h1>
                    <h1 className='font-semibold'>{expense.amount}/-</h1>
                </div>
            ))}
            <div className='bg-blue-600 mt-4 text-white p-2 font-semibold text-lg  flex items-center justify-between'>
                <h1>Total Expense : </h1>
                <h1>{totalExpenseAmount}/-</h1>
            </div>

            <form onSubmit={saveExpense} className='absolute w-full flex flex-col bottom-0 left-0'>
                <div className='flex'>
                    <input onChange={(e) => setExpenseTitle(e.target.value)} className='w-full' type="text" placeholder='Type your title' />
                    <input onChange={(e) => setExpenseAmount(e.target.value)} className='w-full' type="text" placeholder='Type your amount' />
                </div>
                <button className='w-full font-semibold mt-1 py-2 bg-red-600 text-white ' type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Expense;