import React, { useState } from "react";

const Folder = ({ folder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFolder = () => setIsOpen(!isOpen);
  console.log(folder);

  return (
    <div style={{ marginLeft: "10px" }}>
      <div
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
