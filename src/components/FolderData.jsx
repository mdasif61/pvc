import React from 'react';
import { useOutletContext, useParams } from 'react-router';
import useGetFolder from '../hooks/useGetFolder';
import ReusableWork from './ReusableWork';

const FolderData = () => {
    const { id } = useParams();
    const { allFolder } = useGetFolder();
    const { searchResults, searchText } = useOutletContext()
    const filterFolder =allFolder?.rootFolders?.find((folder) => folder._id === id);

    const subfolders = allFolder?.subfolders?.find((subfolder) => subfolder._id === id);

    return (
        <div>
            {searchResults.length > 0 ? <>
                {searchResults.map((folderWork) => (
                    <ReusableWork product={folderWork} />
                ))}
            </> : <>
                {searchText.trim() === "" && filterFolder?.work?.map((folderWork) => (
                    <ReusableWork key={folderWork._id} product={folderWork} />
                ))}
                {searchText.trim() === "" && subfolders && subfolders?.work?.map((folderWork) => (
                    <ReusableWork key={folderWork._id} product={folderWork} />
                ))}
            </>}

        </div>
    );
};

export default FolderData;