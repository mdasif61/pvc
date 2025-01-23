
import useGetProduct from "../hooks/useGetProduct";
import ReusableWork from "./ReusableWork";

const HomeContent = () => {
  const { allProduct } = useGetProduct();

  return (
    <div>
      {allProduct?.map((product) => (
        <ReusableWork product={product} />
      ))}
    </div>
  );
};

export default HomeContent;
