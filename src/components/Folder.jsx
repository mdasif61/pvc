import React, { useState } from "react";

const Folder = ({ folder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFolder = () => setIsOpen(!isOpen);

  return (
    <div style={{ marginLeft: "20px" }}>
      <div
        onClick={toggleFolder}
        className={`cursor-pointer ${folder.type==="folder"?"font-bold":"font-normal"}`}
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
