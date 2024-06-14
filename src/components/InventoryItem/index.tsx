import React from "react";
import { InventoryItemType } from "../../types";

interface InventoryItemProps {
  item: InventoryItemType;
  deleteItem: () => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ item, deleteItem }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 mb-2 rounded">
    <p className="text-lg sm:text-xl">
      {item.name}: {item.quantity}
    </p>
    <button
      onClick={deleteItem}
      className="bg-red-500 text-white px-4 py-2 rounded mt-4 sm:mt-0"
    >
      Delete
    </button>
  </div>
);

export default InventoryItem;
