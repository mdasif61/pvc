import React, { useState } from "react";
import { useNavigate } from "react-router";

const Folder = ({ folder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFolder = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const getFolder = (folder) => {
    navigate(`/folders/${folder?._id}`, { state: { folder } });
  };

  return (
    <div>
      <div
        onDoubleClick={() => getFolder(folder)}
        onClick={toggleFolder}
        className={`cursor-pointer ${
          folder.type === "folder" ? "font-semibold" : "font-normal"
        }`}
      >
        {folder.type === "folder" ? (isOpen ? "📂" : "📁") : "📄"} {folder.name}
      </div>
      {isOpen && folder.children && (
        <div>
          {folder.children.map((child, index) => (
            <Folder key={index} folder={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
