import axios from 'axios';
import { Label, Select } from 'flowbite-react';
import { ArrowLeft, SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

const TopMenu = ({ searchText, setSearchText, setSearchResults }) => {

    const location = useLocation().pathname;

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        } else if (e.key === "Escape") {
            setSearchText("");
        }
    }

    return (
        <div className='border-b flex items-center mb-2'>
            {location !== "/" && <div>
                <Link to='/' className='text-gray-500 hover:text-gray-700'><ArrowLeft /></Link>
            </div>}
            <div>
                <Link to='/details' className="bg-blue-500 py-1 px-2 hover:bg-blue-400 font-semibold text-md text-white">Details</Link>
            </div>

            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="countries">Select your country</Label>
                </div>
                <Select id="countries" required>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>France</option>
                    <option>Germany</option>
                </Select>
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