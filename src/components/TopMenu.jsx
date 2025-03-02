import axios from 'axios';
import { SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const TopMenu = ({searchText,setSearchText,setSearchResults}) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        } else if (e.key === "Escape") {
            setSearchText("");
        }
    }

    return (
        <div className='border-b flex items-center mb-2'>
            <div>
                <Link to='/details' className="bg-blue-500 py-1 px-2 hover:bg-blue-400 font-semibold text-md text-white">Details</Link>
            </div>
            <div>
                <select>
                    <option>Check Dues</option>
                </select>
            </div>
            <div className='my-2 w-full'>
                <div className='w-full flex items-center px-3 border'>
                    <SearchIcon />
                    <input onKeyDown={handleKeyDown} onChange={(e) => setSearchText(e.target.value)} className='px-3 focus:ring-0 focus:outline-none py-2 w-full bg-transparent' type="search" name="" placeholder='search' id="" />
                </div>
            </div>
        </div>
    );
};

export default TopMenu;