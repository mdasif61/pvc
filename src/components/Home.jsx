import axios from "axios";
import { toast } from "react-toastify";
import useGetProduct from "../hooks/useGetProduct";
import { Pencil, Trash2 } from "lucide-react";

const Home = () => {
  const { allProduct, isLoading, refetch } = useGetProduct();
  console.log(allProduct);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const size = form.size.value;
    const quantity = form.quantity.value;
    const amount = form.amount.value;
    const total = form.total.value;

    const productData = {
      name,
      size,
      quantity,
      amount,
      total,
    };

    if (!name || !size || !quantity || !amount || !total) {
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
        toast.success("successfully saved!");
        console.log(response.data);
      }
    } catch (error) {}
  };

  return (
    <div className="flex w-full gap-6 min-h-screen items-center justify-center">
      <div className="w-2/4 relative h-[450px] bg-white p-6 backdrop-blur-xl opacity-80">
        <div className="w-full flex flex-col">
          <ul className="flex items-center border-b-2 border-black pb-1 justify-between">
            <li className="w-full font-bold">Name</li>
            <li className="w-full font-bold">Size</li>
            <li className="w-full font-bold">Quantity</li>
            <li className="w-full font-bold">amount</li>
            <li className="w-full font-bold">Total</li>
            <li className="w-full font-bold">Actions</li>
          </ul>
          <div className="w-full h-full pt-2">
            {allProduct?.map((product) => (
              <div className="flex justify-between border-b">
                <div className="w-full">
                  <p>{product.name}</p>
                </div>
                <div className="w-full">
                  <p>{product.size}</p>
                </div>
                <div className="w-full">
                  <p>{product.quantity}</p>
                </div>
                <div className="w-full">
                  <p>{product.amount}</p>
                </div>
                <div className="w-full">
                  <p>{product.total}</p>
                </div>
                <div className="flex items-center w-full">
                  <button className="text-blue-500 hover:text-blue-400">
                    <Pencil className="w-5 h-5 mx-1" />
                  </button>
                  <button className="text-red-500 hover:text-red-400">
                    <Trash2 className="w-5 h-5 mx-1" />
                  </button>
                </div>
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
                      name="amount"
                      type="text"
                      placeholder="Amount"
                      className="w-full p-2 border border-gray-300"
                    />
                  </li>
                  <li>
                    <input
                      name="total"
                      type="text"
                      placeholder="Total"
                      className="w-full p-2 border border-gray-300"
                    />
                  </li>
                  <li>
                    <button
                      type="submit"
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br dark:focus:ring-blue-800 font-medium text-sm px-5 py-2.5 text-center ml-2"
                    >
                      Save
                    </button>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-1/4 h-[450px] bg-white p-6 backdrop-blur-xl opacity-80">
        <h1>Div two</h1>
      </div>
    </div>
  );
};

export default Home;
