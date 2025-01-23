import moment from 'moment';
import React from 'react';

const ReusableWork = ({product}) => {
    return (
        <div key={product._id} className="flex justify-between border-b">
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
    );
};

export default ReusableWork;