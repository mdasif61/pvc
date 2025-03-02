import axios from "axios";
import { toast } from "react-toastify";
import useGetProduct from "../hooks/useGetProduct";
import useSizeAndQuantityCalc from "../hooks/useSizeAndQuantityCalc";
import Folder from "./Folder";
import useGetFolder from "../hooks/useGetFolder";
import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Expense from "./Expense";
import useGetTotalCollected from "../hooks/useGetTotalCollected";
import TopMenu from "./TopMenu";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeFolderId, setActiveFolderId] = useState(null)
  const { allProduct, isLoading, refetch } = useGetProduct();
  const { allFolder, folderFetch } = useGetFolder();
  const { totalCollectedTk, totalCollectedTkRefetch } = useGetTotalCollected()
  const location = useLocation().pathname.split("/");
  const id = location[2];


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

  const folderStructure = [
    {
      name: "New Folder",
      type: "folder",
      children: [

      ],
      work: [],
      parent: activeFolderId
    },
  ];

  const createFolder = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await axios.post(
      "http://localhost:5000/api/new-folder",
      folderStructure,
      config
    );

    if (response.status === 201) {
      refetch();
      folderFetch()
      toast.success("Folder created");
      console.log(response.data);
    }
  };


  // start search results
  const performSearch = async (query) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    if (!id) {
      const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
      const data = await response.data;
      if (data.length === 0) {
        setSearchResults([])
      }
      setSearchResults(data);
    } else {
      const response = await axios.get(`http://localhost:5000/api/search-folder-work/${id}?query=${query}`);
      const data = await response.data;
      if (data.length === 0) {
        setSearchResults([])
      }
      setSearchResults(data);
    }

  };
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(performSearch, 300);

  useEffect(() => {
    debouncedSearch(searchText);
  }, [searchText]);

  return (
    <div className="flex fixed left-0 top-0 w-full gap-6 min-h-screen items-center justify-center">
      <div className="w-3/5 relative h-[450px] bg-white p-6 backdrop-blur-xl opacity-90">

        <TopMenu
          searchText={searchText}
          setSearchText={setSearchText}
          searchResults={searchResults}
        />

        <div className="w-full flex flex-col">
          <ul className="flex items-center border-b-2 mr-5 border-black pb-1 justify-between">
            <li className="w-full font-bold">Name</li>
            <li className="w-full font-bold text-center">Size</li>
            <li className="w-full font-bold text-center">Quantity</li>
            <li className="w-full font-bold text-center">SQ.FT</li>
            <li className="w-full font-bold text-center">Rate</li>
            <li className="w-full font-bold text-center">T. Amount</li>
            <li className="w-full font-bold text-center">Collected</li>
            <li className="w-full font-bold text-center">Dues</li>
            <li className="w-full font-bold text-center">Actions</li>
          </ul>
          <div className="w-full overflow-y-scroll h-[300px] mb-5 pt-2">
            {allFolder?.rootFolders?.map((folder, index) => (
              <Folder key={folder._id} index={index} setActiveFolderId={setActiveFolderId} searchResults={searchResults} folder={folder} />
            ))}

            <Outlet context={{ searchResults, searchText }} />
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
                      Upload
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
      <div className="w-1/4 h-[450px] bg-black p-6 backdrop-blur-sm bg-opacity-50">
        <Expense />
      </div>
    </div>
  );
};

export default Home;
