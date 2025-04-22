import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { XCircle } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';
import { data, useLocation } from 'react-router';

const ReusableWork = ({ product }) => {
    const [showDelete, setShowDelete] = useState(false)
    const [collected, setCollected] = useState({ collectedTk: product.collectedTk } || 0);
    const [dues, setDues] = useState({ dues: product.dues } || 0)

    const location = useLocation().pathname.split("/");
    const folderPageId = location[2];


    const updateCollected = async ({ id, collectedAndduesAmount }) => {

        try {
            if (!folderPageId) {
                const response = await axios.patch(`http://localhost:5000/api/collected-tk/${id}`, { collectedAndduesAmount })
                return response.data;
            } else {
                const response = await axios.patch(`http://localhost:5000/api/folder-collected-tk/${id}?folderid=${folderPageId}`, { collectedAndduesAmount })
                return response.data;
            }
        } catch (error) {
            console.log(error)
        }
    };
    const { mutate } = useMutation({
        mutationFn: updateCollected,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const handleCollectedAndDues = (id) => {
        mutate({ id, collectedAndduesAmount: [collected, dues] })
    }

    const handleDeleteWork=(id)=>{
        console.log(id)
    }

    return (
        <>
            <div key={product._id} className="flex relative justify-between border-b">
                <div className="w-full flex items-center flex-col">
                    <input
                        readOnly
                        value={product.name}
                        className="border-none font-medium p-0 focus:ring-0 w-full"
                        type="text"
                    />
                    <span className="text-xs -bottom-0 left-0 text-gray-500">
                        {moment(product.createdAt).format("D MMMM Y")}
                    </span>
                </div>
                <div className="w-full flex items-center">
                    <input
                        readOnly
                        value={product.size}
                        className="border-none h-full text-center p-0 focus:ring-0 w-full"
                        type="text"
                    />
                </div>
                <div className="w-full flex items-center">
                    <input
                        readOnly
                        value={product.quantity}
                        className="border-none h-full text-center p-0 focus:ring-0 w-full"
                        type="text"
                    />
                </div>
                <div className="w-full flex items-center">
                    <input
                        readOnly
                        value={product.sqft}
                        className="border-none h-full text-center p-0 focus:ring-0 w-full"
                        type="text"
                    />
                </div>
                <div className="w-full flex items-center">
                    <input
                        readOnly
                        value={product.rate}
                        className="border-none h-full text-center p-0 focus:ring-0 w-full"
                        type="text"
                    />
                </div>
                <div className="w-full flex items-center">
                    <input
                        readOnly
                        value={product.amount}
                        className="border-none text-center h-full p-0 focus:ring-0 w-full"
                        type="text"
                    />
                </div>
                <div className="w-full flex items-center">
                    <input
                        onChange={(e) => {
                            setCollected({ id: product._id, collectedTk: e.target.value });
                        }}
                        placeholder='Collected'
                        defaultValue={product.collectedTk && product.collectedTk}
                        className="border-b h-full text-center placeholder:font-normal font-bold focus:ring-0 border-r-0 border-l-0 border-t-0  outline-none w-full"
                        type="text"
                    />
                </div>
                <div className="w-full flex items-center">
                    <input
                        onChange={(e) => setDues({ id: product._id, dues: e.target.value })}
                        defaultValue={product.dues && product.dues || 0}
                        placeholder='Dues'
                        className="border-b h-full text-center font-bold placeholder:font-normal focus:ring-0 border-r-0 border-l-0 border-t-0  outline-none w-full"
                        type="text"
                    />
                </div>
                <div className="flex bg-black items-center justify-between text-center w-full">
                    <button onClick={() => {
                        handleCollectedAndDues(product._id)
                    }} className={`h-full w-1/2 text-center btn btn-neutral rounded-none`}>
                        Save
                    </button>
                    <button onClick={() => setShowDelete(!showDelete)} className='w-1/2 bg-red-400 hover:bg-red-500 h-full text-white flex items-center
                     justify-center'><XCircle /></button>
                </div>
                {showDelete && <div className='absolute z-50 right-10 top-10 rounded-md border overflow-hidden shadow-sm bg-white'>
                    <div className='p-2 font-semibold'>
                        Are you sure? for delete
                    </div>
                    <div className='flex items-center'>
                        <button onClick={()=>handleDeleteWork(product._id)} className='bg-red-500 hover:bg-red-600 text-white font-medium w-full'>Yes</button>
                        <button onClick={()=>setShowDelete(false)} className='bg-gray-700 hover:bg-gray-800 text-white font-medium w-full'>No</button>
                    </div>
                </div>}
            </div>
        </>
    );
};

export default ReusableWork;