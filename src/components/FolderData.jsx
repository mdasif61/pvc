import React from 'react';
import { useParams } from 'react-router';
import useGetFolder from '../hooks/useGetFolder';
import ReusableWork from './ReusableWork';

const FolderData = () => {
    const {id}=useParams();
    const {allFolder}=useGetFolder();
    
    const filterFolder=allFolder?.find((folder)=>folder._id===id);
    

    return (
        <div>
            {filterFolder?.work?.map((folderWork)=>(
                <ReusableWork key={folderWork._id} product={folderWork}/>
            ))}
        </div>
    );
};

export default FolderData;