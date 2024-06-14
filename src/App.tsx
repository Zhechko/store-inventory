import { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateProduct from "./components/CreateProduct";
import InventoryPage from "./components/InventoryPage";
import { API_URL } from "./constants.ts";
import { InventoryItemType, Product } from "./types";
import { toast, ToastContainer } from "react-toastify";

import "./App.css";

type Action =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "SET_INVENTORY"; payload: InventoryItemType[] }
  | { type: "ADD_INVENTORY"; payload: InventoryItemType[] }
  | { type: "DELETE_ITEM"; payload: number }
  | { type: "RESET_INVENTORY" }
  | { type: "UPDATE_INVENTORY"; payload: InventoryItemType[] };

function reducer(state: any, action: Action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "SET_INVENTORY":
      return { ...state, inventory: action.payload };
    case "ADD_INVENTORY":
      return { ...state, inventory: [...action.payload] };
    case "DELETE_ITEM":
      return {
        ...state,
        inventory: state.inventory.filter(
          (_: any, i: number) => i !== action.payload
        ),
      };
    case "RESET_INVENTORY":
      return { ...state, inventory: [] };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    inventory: [],
  });

  useEffect(() => {
    fetch(`${API_URL}/product/all`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_PRODUCTS", payload: data }));

    fetch(`${API_URL}/inventory`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_INVENTORY", payload: data }));
  }, []);

  const addProduct = async (item: Product) => {
    const response = await fetch(`${API_URL}/product`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    const data = await response.json();
    dispatch({ type: "ADD_PRODUCT", payload: data });

    toast.success("Product added successfully");
  };

  const addInventory = async (item: InventoryItemType) => {
    const response = await fetch(`${API_URL}/inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...state.inventory, item]),
    });

    if (!response.ok) {
      throw new Error("Failed to add inventory item");
    }

    const data = await response.json();
    dispatch({ type: "ADD_INVENTORY", payload: data });

    toast.success("Inventory item added successfully");
  };

  const deleteItem = (index: number) => {
    //API call to delete item is not implemented???
    dispatch({ type: "DELETE_ITEM", payload: index });
  };

  const resetInventory = async () => {
    const response = await fetch(`${API_URL}/inventory/reset`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to reset inventory");
    }

    dispatch({ type: "SET_INVENTORY", payload: [] });

    toast.success("Inventory reset successfully");
  };

  return (
    <Router>
      <ToastContainer />
      <div className="p-4">
        <Routes>
          <Route
            path="/create-product"
            element={<CreateProduct add={addProduct} />}
          />
          <Route
            path="/"
            element={
              <InventoryPage
                inventory={state.inventory}
                deleteItem={deleteItem}
                products={state.products}
                addInventory={addInventory}
                resetInventory={resetInventory}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
