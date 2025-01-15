import axios from "axios";
import { toast } from "react-toastify";
import useGetProduct from "../hooks/useGetProduct";
import { Pencil, Trash2 } from "lucide-react";
import useSizeAndQuantityCalc from "../hooks/useSizeAndQuantityCalc";
import moment from "moment";
import Folder from "./Folder";

const Home = () => {
  const folderStructure = [
    {
      name: "Folder 1",
      type: "folder",
      children: [
        { name: "File 1.txt", type: "file" },
        {
          name: "Subfolder 1",
          type: "folder",
          children: [{ name: "File 2.txt", type: "file" }],
        },
      ],
    },
    {
      name: "Folder 2",
      type: "folder",
      children: [{ name: "File 2.txt", type: "file" }],
    },
  ];

  const { allProduct, isLoading, refetch } = useGetProduct();
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
    };

    if (!name || !size || !quantity || !rate) {
      toast.error("please fill all data");
      return;
    }

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
    } catch (error) {}
  };

  return (
    <div className="flex w-full gap-6 min-h-screen items-center justify-center">
      <div className="w-2/4 relative h-[450px] bg-white p-6 backdrop-blur-xl opacity-90">
        <div className="w-full flex flex-col">
          <ul className="flex items-center border-b-2 border-black pb-1 justify-between">
            <li className="w-full font-bold">Name</li>
            <li className="w-full font-bold">Size</li>
            <li className="w-full font-bold">Quantity</li>
            <li className="w-full font-bold">SQ.FT</li>
            <li className="w-full font-bold">Rate</li>
            <li className="w-full font-bold">T. Amount</li>
            <li className="w-full font-bold">Found</li>
            {/* <li className="w-full font-bold">Actions</li> */}
          </ul>
          <div className="w-full h-full pt-2">
            {allProduct?.map((product) => (
              <div className="flex justify-between border-b">
                <div className="w-full relative flex flex-col">
                  <input
                    readOnly
                    value={product.name}
                    className="border-none font-medium p-0 focus:ring-0 w-full"
                    type="text"
                  />
                  <span className="text-xs absolute -bottom-0 left-0 text-gray-500">
                    {moment(product.createdAt).format("D MMMM Y")}
                  </span>
                </div>
                <div className="w-full">
                  <input
                    readOnly
                    value={product.size}
                    className="border-none p-0 focus:ring-0 w-full"
                    type="text"
                  />
                </div>
                <div className="w-full">
                  <input
                    readOnly
                    value={product.quantity}
                    className="border-none p-0 focus:ring-0 w-full"
                    type="text"
                  />
                </div>
                <div className="w-full">
                  <input
                    readOnly
                    value={product.sqft}
                    className="border-none p-0 focus:ring-0 w-full"
                    type="text"
                  />
                </div>
                <div className="w-full">
                  <input
                    readOnly
                    value={product.rate}
                    className="border-none p-0 focus:ring-0 w-full"
                    type="text"
                  />
                </div>
                <div className="w-full">
                  <input
                    readOnly
                    value={product.amount}
                    className="border-none p-0 focus:ring-0 w-full"
                    type="text"
                  />
                </div>
                <div className="w-full">
                  <input
                    className="border-b font-bold focus:ring-0 border-r-0 border-l-0 border-t-0  outline-none w-full"
                    type="text"
                  />
                </div>
                {/* <div className="flex items-center w-full">
                  <button className="text-blue-500 hover:text-blue-400">
                    <Pencil className="w-5 h-5 mx-1" />
                  </button>
                  <button className="text-red-500 hover:text-red-400">
                    <Trash2 className="w-5 h-5 mx-1" />
                  </button>
                </div> */}
              </div>
            ))}
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
                      Save
                    </button>
                  </li>
                  <li
                    title="create folder"
                    className="cursor-pointer text-2xl hover:text-xl ml-5 items-center"
                  >
                    Create 📁
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-1/4 h-[450px] bg-white p-6 backdrop-blur-xl opacity-80">
        <h1>Folder System</h1>
        {folderStructure.map((folder, index) => (
          <Folder key={index} folder={folder} />
        ))}
      </div>
    </div>
  );
};

export default Home;
