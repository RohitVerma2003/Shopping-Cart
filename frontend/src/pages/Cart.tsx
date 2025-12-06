import { useEffect, useState } from "react";
import useCart from "../hooks/useCart";
import type { Item } from "../constants";
import Card from "../components/Card";
import RemoveButton from "../components/RemoveButton";
import { useAuthContext } from "../context/AuthContext";

const EmptyCart = () => {
  return <div className="w-4/5 text-3xl text-center">Your cart is empty.</div>;
};

const Cart = () => {
  const { getCart } = useCart();
  const [items, setItems] = useState<Item[]>([]);
  const { authUser } = useAuthContext();

  const fetchData = async () => {
    const data = await getCart();
    setItems(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="text-3xl m-2 mx-6">
        That's Your Cart, {authUser?.name}
      </div>
      <div className="w-full h-full flex justify-center items-center">
        {items.length > 0 ? (
          <div className="w-4/5 grid grid-cols-3 items-center flex-wrap gap-10 my-5">
            {items.map((item) => (
              <Card
                key={item._id}
                item={item}
                addOrRemove={<RemoveButton id={item._id} refresh={fetchData} />}
              />
            ))}
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default Cart;
