import useCart from "../hooks/useCart";

const RemoveButton = ({ id, refresh }: { id: string; refresh: () => void }) => {
  const { removeFromCart } = useCart();

  const handleRemove = async () => {
    try {
      await removeFromCart(id);
      refresh();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <button
      className="p-2 border-2 border-b-4 border-r-4 rounded-md w-full cursor-pointer bg-[#FF937E] hover:bg-[#FF5555]"
      onClick={handleRemove}
    >
      Remove from cart
    </button>
  );
};

export default RemoveButton;
