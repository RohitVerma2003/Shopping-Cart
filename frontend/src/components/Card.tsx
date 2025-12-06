import type { ReactNode } from "react";
import type { Item } from "../constants";

const Card = ({
  item,
  addOrRemove,
}: {
  item: Item;
  addOrRemove: ReactNode;
}) => {
  return (
    <div className="p-2 border-2 border-b-4 border-r-4 rounded-md hover:bg-[#FFEE91]">
      <div className="w-full">
        <img
          src={item.image}
          alt={item.name}
          className="object-contain rounded-md"
        />
      </div>

      <div className="mt-5">
        <div className="flex justify-between items-center mb-6">
          <div className="w-3/4">
            <p className="text-2xl text-start">{item.name}</p>
            <p className="text-sm text-start">{item.description}</p>
          </div>
          <div className="text-2xl">
            ₹ <span>{item.price.toString()}</span>
          </div>
        </div>
        {addOrRemove}
      </div>
    </div>
  );
};

export default Card;
