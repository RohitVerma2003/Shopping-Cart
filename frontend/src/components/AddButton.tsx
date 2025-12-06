import useCart from "../hooks/useCart";

const AddButton = ({ id }: { id: string }) => {
  const { addToCart } = useCart();
  return (
    <button
      className="p-2 border-2 border-b-4 border-r-4 rounded-md w-full cursor-pointer bg-white hover:bg-[#8BAE66]"
      onClick={() => addToCart(id)}
    >
      Add To Cart
    </button>
  );
};

export default AddButton;
