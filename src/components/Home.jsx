import axios from "axios";
import { toast } from "react-toastify";
import useGetProduct from "../hooks/useGetProduct";
import { Pencil, Trash2 } from "lucide-react";
import useSizeAndQuantityCalc from "../hooks/useSizeAndQuantityCalc";
import moment from "moment";
import Folder from "./Folder";
import useGetFolder from "../hooks/useGetFolder";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useState } from "react";

const Home = () => {
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const { allProduct, isLoading, refetch } = useGetProduct();
  const { allFolder, folderFetch } = useGetFolder();
  const location = useLocation().pathname.split("/");
  const id = location[2];
  const navigate = useNavigate();

  const {
    sizeAndQuantity,
    isLoading: sizeQuanLoading,
    refetch: sizeAndQuanLoading,
  } = useSizeAndQuantityCalc(allProduct?.map((product) => product?._id || []));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const size = form.size.value;
    const quantity = form.quantity.value;
    const rate = form.rate.value;

    const productData = {
      name,
      size,
      quantity,
      rate,
      sqft: "",
      amount: "",
      total: "",
      collectedTk: "",
      dues: ""
    };

    if (!name || !size || !quantity || !rate) {
      toast.error("please fill all data");
      return;
    }

    if (!id) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const response = await axios.post(
          "http://localhost:5000/api/addProduct",
          productData,
          config
        );
        if (response.status === 201) {
          refetch();
          toast.success("successfully saved!");
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const response = await axios.patch(
          `http://localhost:5000/api/addwork/${id}`,
          productData,
          config
        );
        if (response.status === 201) {
          folderFetch()
          toast.success("successfully saved!");
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  const createFolder = async () => {
    const folderName = "New Folder"; // Default name for the new folder

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Create the new folder with the current folder as its parent
      const response = await axios.post(
        "http://localhost:5000/api/new-folder",
        {
          name: folderName,
          parentFolderId: currentFolderId, // Set the current folder as the parent
        },
        config
      );

      if (response.status === 201) {
        folderFetch(); // Refresh the folder list
        toast.success("Folder created successfully!");
        console.log("Folder created:", response.data);
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      toast.error("Failed to create folder");
    }
  };
  
  const handleNavigate = (folder) => {
    setCurrentFolderId(folder._id); // Update the current folder ID
    navigate(`/folders/${folder._id}`); // Navigate to the folder's page
  };

  const handleRename = async (folderId, newName) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.patch(
        `http://localhost:5000/api/rename-folder/${folderId}`,
        { name: newName },
        config
      );

      if (response.status === 200) {
        folderFetch(); // Refresh the folder list
        toast.success("Folder renamed successfully!");
      }
    } catch (error) {
      console.error("Failed to rename folder:", error);
      toast.error("Failed to rename folder");
    }
  };


  return (
    <div className="flex fixed left-0 top-0 w-full gap-6 min-h-screen items-center justify-center">
      <div className="w-3/5 relative h-[450px] bg-white p-6 backdrop-blur-xl opacity-90">
        <div className="w-full flex flex-col">
          <ul className="flex items-center border-b-2 border-black pb-1 justify-between">
            <li className="w-full font-bold">Name</li>
            <li className="w-full font-bold">Size</li>
            <li className="w-full font-bold">Quantity</li>
            <li className="w-full font-bold">SQ.FT</li>
            <li className="w-full font-bold">Rate</li>
            <li className="w-full font-bold">T. Amount</li>
            <li className="w-full font-bold">Collected</li>
            <li className="w-full font-bold">Dues</li>
            <li className="w-full font-bold">Actions</li>
          </ul>

          <div className="w-full overflow-y-scroll h-[335px] mb-5 pt-2">
          {currentFolderId ? (
              <Folder
                folder={allFolder.find((f) => f._id === currentFolderId)} // Find the current folder
                onNavigate={handleNavigate} // Pass the navigate function
                onRename={handleRename}
              />
            ) : (
              allFolder?.map((folder) => (
                <div
                  key={folder._id}
                  onDoubleClick={() => handleNavigate(folder)} // Double-click to navigate
                >
                  <Folder
                    folder={folder}
                    onNavigate={handleNavigate} // Pass the navigate function
                    onRename={handleRename}
                  />
                </div>
              ))
            )}

            <Outlet />
          </div>
          <div className="items-end absolute m-2 bottom-0 left-0">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mt-4">
                <ul className="flex items-center justify-between w-full">
                  <li>
                    <input
                      name="name"
                      type="text"
                      placeholder="Name"
                      className="w-full p-2 border border-gray-300"
                    />
                  </li>
                  <li>
                    <input
                      name="size"
                      type="text"
                      placeholder="Size"
                      className="w-full p-2 border border-gray-300"
                    />
                  </li>
                  <li>
                    <input
                      name="quantity"
                      type="text"
                      placeholder="Quantity"
                      className="w-full p-2 border border-gray-300"
                    />
                  </li>
                  <li>
                    <input
                      name="rate"
                      type="text"
                      placeholder="Current Rate"
                      className="w-full p-2 border border-gray-300"
                    />
                  </li>
                  <li>
                    <button
                      type="submit"
                      className="text-white w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br dark:focus:ring-blue-800 font-medium text-sm px-5 py-2.5 text-center ml-2"
                    >
                      Post
                    </button>
                  </li>
                  <li
                    onClick={createFolder}
                    title="create folder"
                    className="cursor-pointer text-2xl hover:text-xl ml-5 items-center"
                  >
                    📁
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-1/4 h-[450px] bg-white p-6 backdrop-blur-xl opacity-80">
        <h1>summary</h1>
      </div>
    </div>
  );
};

export default Home;
