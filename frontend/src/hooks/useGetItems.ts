import axios from "axios";
import { useState } from "react";
import type { Item, ErrorResponse } from "../constants";
import toast from "react-hot-toast";

interface Response {
  items: Item[];
  message: String;
}

const useGetItems = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const getItems = async (): Promise<Item[]> => {
    if (loading) return [];
    setLoading(true);

    try {
      const res = await axios.get<Response | ErrorResponse>("/api/items");
      const data = res.data;

      if ("error" in data) {
        throw new Error(data.error);
      }

      return data.items;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message)
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, getItems };
};

export default useGetItems;
