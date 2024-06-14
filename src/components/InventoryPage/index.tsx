import React, { useEffect, useState } from "react";
import { InventoryItemType, Product } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { Link } from "react-router-dom";
import InventoryItem from "../InventoryItem";

interface InventoryListProps {
  inventory: InventoryItemType[];
  deleteItem: (index: number) => void;
  products: Product[];
  addInventory: (item: InventoryItemType) => void;
  resetInventory: () => void;
}

const InventoryPage: React.FC<InventoryListProps> = ({
  inventory,
  deleteItem,
  products,
  addInventory,
  resetInventory,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number | null>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (products.length > 0) {
      setSelectedProduct(products[0].name);
    }
  }, [products]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct && quantity !== null && quantity >= 1) {
      const product = products.find((p) => p.name === selectedProduct);
      if (product) {
        try {
          await addInventory({
            name: product.name,
            quantity: Number(quantity),
          });
          setSelectedProduct(products[0].name);
          setQuantity(null);
          setError(null);
        } catch (err) {
          setError("Failed to add inventory item");
        }
      }
    } else {
      setError("Quantity must be 1 or more");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">Inventory List</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-8 items-start sm:items-center"
      >
        <div className="flex flex-col w-full sm:w-64">
          <label
            htmlFor="products"
            className="mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product name
          </label>
          <select
            value={selectedProduct || ""}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="products"
          >
            <option value="">Select a product</option>
            {products.map((product, index) => (
              <option key={index} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full sm:w-64">
          <label
            htmlFor="quantity"
            className="mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="text"
            min="1"
            value={quantity || ""}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white self-end ${
            selectedProduct && quantity !== null && quantity >= 1
              ? "bg-blue-500"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedProduct || quantity === null || quantity < 1}
        >
          Save
        </button>
      </form>

      {error && <ErrorMessage message={error} />}

      <div className="flex justify-start">
        <Link
          to="/create-product"
          className="mt-4 inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs mb-4"
        >
          Create Product
        </Link>
      </div>

      <div className="flex justify-start">
        <button
          onClick={resetInventory}
          className="px-4 py-2 rounded text-white bg-red-500"
        >
          Reset Inventory
        </button>
      </div>

      <div className="border-t mt-4">
        {inventory.map((item, index) => (
          <InventoryItem
            key={index}
            item={item}
            deleteItem={() => deleteItem(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
