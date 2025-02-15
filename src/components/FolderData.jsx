import React from "react";
import useGetFolder from "../hooks/useGetFolder";
import ReusableWork from "./ReusableWork";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router";

const FolderData = () => {
  const { id } = useParams(); // Get the folder ID from the URL
  const { allFolder } = useGetFolder();

  const selectedFolder = allFolder?.find((folder) => folder._id === id);

  if (!selectedFolder) {
    return <div>Folder not found!</div>; // Handle case where folder is not found
  }

  return (
    <div>
      <Link to="/" className="text-gray-500 hover:text-gray-700">
        <ArrowLeft />
      </Link>
      <h1>{selectedFolder.name}</h1> {/* Display folder name */}
      {selectedFolder.work?.map((folderWork) => (
        <ReusableWork key={folderWork._id} product={folderWork} /> // Display work items
      ))}
      {selectedFolder.children?.map((subfolder) => (
        <div key={subfolder._id}>
          <Link to={`/folders/${subfolder._id}`}>{subfolder.name}</Link> {/* Link to subfolder */}
        </div>
      ))}
    </div>
  );
};

export default FolderData;