import { useOutletContext } from "react-router";
import useGetProduct from "../hooks/useGetProduct";
import ReusableWork from "./ReusableWork";

const HomeContent = () => {
  const { allProduct } = useGetProduct();
  const { searchResults, searchText } = useOutletContext();
  console.log(searchResults)

  const renderData = searchText.trim() === "" ? allProduct : searchResults;

  return (
    <div>
      {renderData?.length > 0 ? (
        renderData.map((product) => (
          <ReusableWork key={product._id} product={product} />
        ))
      ) : (
        <p className="text-center">No matching data</p>
      )}
    </div>
  );
};

export default HomeContent;