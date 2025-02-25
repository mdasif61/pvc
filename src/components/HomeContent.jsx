
import { useOutletContext } from "react-router";
import useGetProduct from "../hooks/useGetProduct";
import ReusableWork from "./ReusableWork";

const HomeContent = () => {
  const { allProduct } = useGetProduct();
  const {searchResults}=useOutletContext();

  const renderData=searchResults.length>0?searchResults:allProduct

  return (
    <div>
      {renderData?.map((product) => (
        <ReusableWork key={product._id} product={product} />
      ))}
    </div>
  );
};

export default HomeContent;
