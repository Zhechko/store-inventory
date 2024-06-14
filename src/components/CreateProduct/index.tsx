import React, { useState } from "react";
import { Product } from "../../types";
import { Link } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";

interface CreateProductProps {
  add: (item: Product) => Promise<void>;
}

const CreateProduct: React.FC<CreateProductProps> = ({ add }) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await add({ name });
      setName("");
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <Link
        to="/"
        className="mt-4 inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs mb-4"
      >
        Back
      </Link>
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Product Name"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            name ? "bg-blue-500" : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!name}
        >
          Save
        </button>
      </form>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default CreateProduct;
