import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
  const contextMenuRef = useRef(null);
  const renameInputRef = useRef(null);
  const navigate = useNavigate();


  const location = useLocation().pathname.split("/");
  const folderPageId = location[2];

  useEffect(() => {
    setIsFolderOpened(!!folderPageId);
  }, [folderPageId]);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Close context menu if clicked outside
      if (contextMenu && contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setContextMenu(null);
      }

      // Close rename input if clicked outside
      if (rename && renameInputRef.current && !renameInputRef.current.contains(e.target)) {
        handleSubmitRename();
        setRename(false);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [contextMenu, rename]);




  const getFolder = (folder) => {
    setIsFolderOpened(true);
    setActiveFolderId(folder._id);
    navigate(`/folders/${folder?._id}/${folder?.name}`, { state: { folder, searchResults } });
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

  const handleFolderDelete = async () => {
    const response = await axios.delete(
      `http://localhost:5000/api/delete-folder/${folder._id}`
    );
    if (response.status === 201) {
      folderFetch()
    }
  }

  return (
    <>
      <div onClick={handleCloseMenu}>
        <div
          onContextMenu={handleRenameOfFolder}
          onDoubleClick={() => getFolder(folder)}
          onClick={toggleFolder}
          className={`cursor-pointer flex items-center hover:bg-gray-100 my-1 ${folder.type === "folder" ? "font-semibold" : "font-normal"
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
            className="fixed bg-white border z-50 rounded shadow-md p-2"
            style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          >
            <button
              onClick={handleRename}
              className="block w-full p-1 text-center hover:bg-gray-200"
            >
              Rename
            </button>
            <button
              onClick={handleFolderDelete}
              className="block w-full p-1 text-center hover:bg-gray-200"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Folder;