import axios from "axios";
import { useState } from "react";
import type { ErrorResponse, Item } from "../constants";
import toast from "react-hot-toast";

interface Response {
  cart: {
    _id: string;
    userId: string;
    items: Item[];
  };
  message: String;
}

const useCart = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addToCart = async (id: string) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.post(`/api/cart/add/${id}`);
      const data = await res.data;
      toast.success("Add to cart");
      return data;
    } catch (error: any) {
      console.log("Error in adding item", error.response.data.message || error.message);
      toast.error(error.response.data.message || error.message)
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id: string) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.post(`/api/cart/remove/${id}`);
      const data = await res.data;
      toast.success("Removed from the cart");
      return data;
    } catch (error: any) {
      console.log("Error in removing item", error.message);
      toast.error(error.message)
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getCart = async (): Promise<Item[]> => {
    if (loading) return [];
    setLoading(true);

    try {
      const res = await axios.get<Response | ErrorResponse>(`/api/cart/`);
      const data = res.data;

      if ("error" in data) {
        throw new Error(data.error);
      }

      return data.cart.items;
    } catch (error: any) {
      console.log("Error in getting item", error.response.data.message || error);
      toast.error(error.response.data.message)
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, addToCart, removeFromCart, getCart };
};

export default useCart;
