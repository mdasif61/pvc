import React from 'react';
import { Link, useParams } from 'react-router';
import useGetFolder from '../hooks/useGetFolder';
import ReusableWork from './ReusableWork';
import { ArrowLeft } from 'lucide-react';

const FolderData = () => {
    const {id}=useParams();
    const {allFolder}=useGetFolder();
    
    const filterFolder=allFolder?.find((folder)=>folder._id===id);
    

    return (
        <div>
            <Link to='/' className='text-gray-500 hover:text-gray-700'><ArrowLeft/></Link>
            {filterFolder?.work?.map((folderWork)=>(
                <ReusableWork key={folderWork._id} product={folderWork}/>
            ))}
        </div>
    );
};

export default FolderData;