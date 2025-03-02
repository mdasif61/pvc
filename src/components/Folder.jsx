import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useGetFolder from "../hooks/useGetFolder";
import { ArrowBigLeft } from "lucide-react";

const Folder = ({ folder, setActiveFolderId, searchResults }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFolder = () => setIsOpen(!isOpen);
  const [rename, setRename] = useState(false);
  const { folderFetch } = useGetFolder();
  const [newName, setNewName] = useState(folder.name);
  const [contextMenu, setContextMenu] = useState(null);
  const [isFolderOpened, setIsFolderOpened] = useState(false);
  const navigate = useNavigate();


  const location = useLocation().pathname.split("/");
  const folderPageId = location[2];

  useEffect(() => {
    setIsFolderOpened(!!folderPageId);
  }, [folderPageId]);

  const getFolder = (folder) => {
    setIsFolderOpened(true);
    setActiveFolderId(folder._id);
    navigate(`/folders/${folder?._id}`, { state: { folder, searchResults } });
  };

  const handleRenameOfFolder = (e) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleRename = () => {
    setRename(true);
    setContextMenu(null);
  };

  const handleCloseMenu = () => {
    setContextMenu(null);
  };

  const handleSubmitRename = async () => {
    if (newName && newName.trim() !== "") {
      const response = await axios.patch(
        `http://localhost:5000/api/rename-folder/${folder._id}?foldername=${newName}`
      );
      setRename(false);
      if (response.status === 201) {
        folderFetch();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitRename();
    } else if (e.key === "Escape") {
      setRename(false);
    }
  };

  if (isFolderOpened) {
    return null;
  }

  return (
    <>
      <div onClick={handleCloseMenu}>
        <div
          onContextMenu={handleRenameOfFolder}
          onDoubleClick={() => getFolder(folder)}
          onClick={toggleFolder}
          className={`cursor-pointer flex items-center hover:bg-gray-100 my-1 ${
            folder.type === "folder" ? "font-semibold" : "font-normal"
          }`}
        >
          {folder.type === "folder" ? (isOpen ? "📂" : "📁") : "📄"}{" "}
          {rename ? (
            <div className="mt-2">
              <input
                type="text"
                defaultValue={folder.name}
                autoFocus
                onKeyDown={handleKeyDown}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={() => {
                  handleSubmitRename();
                  setRename(false);
                }}
                className="border p-1"
              />
            </div>
          ) : (
            folder.name
          )}
        </div>
        {isOpen && folder.children?.length > 0 && (
          <div className="ml-4">
            {folder.children.map((child) => (
              <Folder
                key={child._id}
                folder={child}
                setActiveFolderId={setActiveFolderId}
                searchResults={searchResults}
              />
            ))}
          </div>
        )}
        {contextMenu && (
          <div
            className="fixed bg-white border rounded shadow-md p-2"
            style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          >
            <button
              onClick={handleRename}
              className="block w-full text-left px-2 py-1 hover:bg-gray-200"
            >
              Rename
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Folder;