import React, { useState } from "react";

const Folder = ({ folder, onNavigate, onRename }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(folder.name);

  const handleRename = async () => {
    await onRename(folder._id, newName);
    setIsRenaming(false);
  };

  return (
    <div>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        onDoubleClick={() => onNavigate(folder)} // Double-click to navigate
        style={{ cursor: "pointer" }}
      >
        {isRenaming ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            autoFocus
          />
        ) : (
          folder.name
        )}
        <button onClick={() => setIsRenaming(true)}>✏️</button> {/* Rename button */}
      </div>
      {isExpanded && folder.children && (
        <div style={{ marginLeft: "20px" }}>
          {folder.children.map((subfolder) => (
            <Folder
              key={subfolder._id}
              folder={subfolder}
              onNavigate={onNavigate} // Pass the navigate function
              onRename={onRename}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;