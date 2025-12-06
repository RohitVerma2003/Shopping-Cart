import { useEffect, useState } from "react";
import type { Item } from "../constants";
import useGetItems from "../hooks/useGetItems";
import Card from "../components/Card";
import AddButton from "../components/AddButton";

const Home = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { loading, getItems } = useGetItems();

  const fetchItems = async () => {
    const data: Item[] = await getItems();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return <div className="w-full h-[80vh] flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-4/5 grid grid-cols-3 items-center flex-wrap gap-10 my-5">
        {items.map((item) => (
          <Card key={item._id} item={item} addOrRemove={<AddButton id={item._id}/>}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
