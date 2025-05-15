import axios from 'axios';
import { Label, Select } from 'flowbite-react';
import { ArrowLeft, SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

const TopMenu = ({ searchText, setSearchText, setSearchResults }) => {

    const location = useLocation().pathname;
    const folderId=location.split("/")[2];

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        } else if (e.key === "Escape") {
            setSearchText("");
        }
    }

    const checkDuesAndCollected=async(e)=>{
        try {
            const response=await axios.get(`http://localhost:5000/api/options/${folderId}?query=${e.target.value}`)
        } catch (error) {
            
        }
    }

    return (
        <div className='flex h-8 items-center mb-2'>
            {location !== "/" && <div>
                <Link to='/' className='text-gray-500 hover:text-gray-700'><ArrowLeft /></Link>
            </div>}
            <div>
                <Link to='/details' className="bg-blue-500 py-1 px-2 hover:bg-blue-400 font-semibold text-md text-white">Details</Link>
            </div>

            <div className="w-48 bg-black h-full m-2">
                <select onChange={checkDuesAndCollected} className='w-full h-full border px-2 py-1 focus:ring-0 focus:outline-none'>
                    <option disabled selected>Customers</option>
                    <option>All</option>
                    <option>Collected</option>
                    <option>Dues</option>
                </select>
            </div>

            <div className='my-2 h-full w-full'>
                <div className='w-full h-full flex items-center px-3 border'>
                    <SearchIcon />
                    <input onKeyDown={handleKeyDown} onChange={(e) => setSearchText(e.target.value)} className='px-3 focus:ring-0 focus:outline-none py-2 w-full bg-transparent' type="search" name="" placeholder='search' id="" />
                </div>
            </div>
        </div>
    );
};

export default TopMenu;