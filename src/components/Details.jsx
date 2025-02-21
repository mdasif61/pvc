import React, { useState } from 'react';
import useGetTotalCollected from '../hooks/useGetTotalCollected';
import useGetTotalExpense from '../hooks/useGetTotalExpense';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar, DateRangePicker } from 'react-date-range';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import useGetDiposite from '../hooks/useGetDiposite';
import EachDiposite from './EachDiposite';

const Details = () => {
    const { totalCollectedTk } = useGetTotalCollected();
    const { totalExpenseAmount } = useGetTotalExpense();
    const {dipositeData,dipositeFetch}=useGetDiposite();
    const [dipositeAmount,setDipositeAmount]=useState("");

    console.log(dipositeData)

    const [dateRange, setDateRange] = useState({
        newDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const handleDatePickerRange = (ranges) => {
        setDateRange(ranges.selection)
    };

    const handleDiposite=async()=>{
        const dipositeData={
            diposite:dipositeAmount,
            ACamount:totalCollectedTk-totalExpenseAmount.toString(),
            totalCollected:totalCollectedTk.toString(),
            totalExpense:totalExpenseAmount.toString(),
            date:dateRange
        };

        if(!dipositeAmount || !totalCollectedTk || !totalExpenseAmount || !totalCollectedTk || !dateRange.startDate || !dateRange.endDate){
            toast.error('please fill every fields')
            return;
        }

        try {
            const config={
                headers:{
                    "Content-type":"application/json"
                }
            }
            const response=await axios.post('http://localhost:5000/api/diposite-in-office',dipositeData,config)
            if(response.status===201){
                dipositeFetch()
                toast.success('Diposite Successfull')
                setDipositeAmount("")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='w-full flex items-center justify-center min-h-screen mx-auto bg-transparent'>
            <div className='flex gap-3 items-center justify-center w-4/6 mx-auto'>
                <div className='w-1/2 min-h-[500px] bg-white p-6 backdrop-blur-2xl opacity-90'>
                    <div className='mb-4'>
                        <div className='flex  items-center justify-between'>
                            <h1 className='text-lg'>Total Collected :</h1>
                            <span className='text-blue-600 font-bold'>{totalCollectedTk || 0} tk/-</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-lg'>Total Expense :</h1>
                            <span className='text-red-600 font-bold'>{totalExpenseAmount || 0} tk/-</span>
                        </div>
                        <hr />
                        <div className='flex items-center justify-between'>
                            <h1 className='text-lg font-bold'>Total Amount :</h1>
                            <span className='text-lg font-bold'>{totalCollectedTk - totalExpenseAmount || 0} tk/-</span>
                        </div>
                    </div>
                    <div className='my-2'>
                        <div className='bg-gradient-to-t w-full from-slate-800 to-gray-500 flex flex-col my-2'>

                            <DateRangePicker
                                className='w-full'
                                ranges={[dateRange]}
                                onChange={handleDatePickerRange}
                            />
                            <input onChange={(e)=>setDipositeAmount(e.target.value)} className='bg-transparent text-center border-blue-600 outline-none text-white focus:outline-none focus:ring-0 placeholder:text-white' type="text" placeholder='Enter Amount' name="" id="" />
                            <button onClick={handleDiposite} className='bg-blue-700 hover:bg-blue-500 text-white text-lg px-2 py-1'>Diposite in office</button>
                        </div>
                        <div className='w-full text-center'>
                            <h1 className='font-semibold text-lg'> From <span className='text-purple-700'>{moment(dateRange.startDate).format("D MMMM Y")}</span> To <span className='text-purple-700'>{moment(dateRange.endDate).format("D MMMM Y")}</span></h1>
                        </div>
                    </div>
                </div>
                <div className='w-1/2 h-[650px] overflow-y-scroll'>
                    {
                       dipositeData?.map((diposite,index)=><EachDiposite
                       key={index}
                       diposite={diposite}
                       />) 
                    }
                </div>
            </div>
        </div>
    );
};

export default Details;