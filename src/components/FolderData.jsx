import React from 'react';
import { useOutletContext, useParams } from 'react-router';
import useGetFolder from '../hooks/useGetFolder';
import ReusableWork from './ReusableWork';

const FolderData = () => {
    const { id } = useParams();
    const { allFolder } = useGetFolder();
    const { searchResults, searchText, duesAndCollect } = useOutletContext();
    const filterFolder = allFolder?.rootFolders?.find((folder) => folder._id === id);
    const subfolders = allFolder?.subfolders?.find((subfolder) => subfolder._id === id);

    // Priority 1: Show duesAndCollect if it has items
    if (duesAndCollect?.length > 0) {
        return (
            <div>
                {duesAndCollect.map((folderWork) => (
                    <ReusableWork key={folderWork._id} product={folderWork} />
                ))}
            </div>
        );
    }

    // Priority 2: Show search results if search is active
    if (searchResults.length > 0) {
        return (
            <div>
                {searchResults.map((folderWork) => (
                    <ReusableWork key={folderWork._id} product={folderWork} />
                ))}
            </div>
        );
    }

    // Priority 3: Show regular folder content when no search and no duesAndCollect
    return (
        <div>
            {filterFolder?.work?.map((folderWork) => (
                <ReusableWork key={folderWork._id} product={folderWork} />
            ))}
            {subfolders?.work?.map((folderWork) => (
                <ReusableWork key={folderWork._id} product={folderWork} />
            ))}
        </div>
    );
};

export default FolderData;