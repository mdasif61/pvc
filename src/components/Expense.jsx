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

        if (!expenseTitle || !expenseAmount) {
            toast.error("please fill the input")
            return;
        }

        const config = {
            headers: {
                "Content-type": "application/json"
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
            <div className='overflow-y-auto h-[calc(100%-150px)]'>
                {allExpnese?.map((expense) => (
                    <div key={expense._id} className='flex justify-between items-center border-b'>
                        <h1 className='text-white'>{expense.title}</h1>
                        <h1 className='font-semibold text-white'>{expense.amount}/-</h1>
                    </div>
                ))}
            </div>

            {/* Total Expense - Fixed Position */}
            <div className='bg-blue-600 mt-4 text-white p-2 font-semibold text-lg flex items-center justify-between'>
                <h1>Total Expense : </h1>
                <h1>{totalExpenseAmount}/-</h1>
            </div>

            {/* Form - Fixed Position */}
            <form onSubmit={saveExpense} className='absolute w-full flex flex-col bottom-0 left-0'>
                <div className='flex'>
                    <input 
                        onChange={(e) => setExpenseTitle(e.target.value)} 
                        className='w-full border focus:ring-0 focus:outline-none px-2 h-10' 
                        type="text" 
                        placeholder='Type your title' 
                        value={expenseTitle}
                    />
                    <input 
                        onChange={(e) => setExpenseAmount(e.target.value)} 
                        className='w-full border focus:ring-0 focus:outline-none px-2 h-10' 
                        type="text" 
                        placeholder='Enter your amount' 
                        value={expenseAmount}
                    />
                </div>
                <button className='w-full font-semibold mt-1 py-2 bg-red-600 text-white' type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Expense;