import React from 'react';
import { Link } from 'react-router';

const TopMenu = () => {
    return (
        <div className='border-b mb-2'>
            <div>
                <Link to='/details' className="bg-blue-500 py-1 px-2 hover:bg-blue-400 font-semibold text-md text-white">Details</Link>
            </div>
        </div>
    );
};

export default TopMenu;