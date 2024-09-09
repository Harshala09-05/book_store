import React, { useState,createContext } from 'react';
import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { modifyCartItem, removeCartItem } from "../Services/admin_service";
import { useLocation } from "react-router";
import{useDispatch} from 'react-redux'
import {DataContext} from '../Context/DataProvider';
import { addToCart, removeFromCart } from './Reducer/cartActions';

export default function QuantityNo({ cartItem,id, setCartItem, setAddCart, getCartItems, fetchbooksDetails }) {
  const location = useLocation();
    const [item, setItem] = useState(cartItem);
    const { cartCount, setCartCount, updateCartCount } = createContext(DataContext);

    const dispatch = useDispatch()

  const handleCount = async (type) => {
      try {
        console.log("cartItem :", cartItem);
        console.log("Item :", item);
      // Log to check if item._id exists
      console.log("Item ID:", id);

      if (!id) {
        throw new Error("Cart item ID is undefined!");
      }

      if (type === "plus") {
        const updatedQuantity = item.quantityToBuy + 1;
        setItem((prev) => ({
          ...prev,
          quantityToBuy: updatedQuantity,
        }));
        await modifyCartItem(id, { quantityToBuy: updatedQuantity });
        // fetchbooksDetails(item._id); // Fetch the book details after modifying the cart
          dispatch(addToCart(item));
      } else if (type === "minus") {
        if (item.quantityToBuy === 1) {
          setAddCart(false);
            await removeCartItem(id);
            dispatch(removeFromCart(id));
          return getCartItems(); // Refresh cart items after removal
        }
        const updatedQuantity = item.quantityToBuy - 1;
        setItem((prev) => ({
          ...prev,
          quantityToBuy: updatedQuantity,
        }));
        await modifyCartItem(id, { quantityToBuy: updatedQuantity });
      }
      getCartItems(); // Refresh cart after modification
    } catch (err) {
      console.error("Error updating cart item:", err);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        size="small"
        sx={{ backgroundColor: "#FAFAFA", border: "1px solid #DBDBDB" }}
        onClick={() => handleCount("minus")}
        disabled={item.quantityToBuy === 1 && location.pathname.includes('cart')}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <TextField
        sx={{ width: "50px", mx: 1 }}
        inputProps={{
          style: {
            padding: 4,
            textAlign: "center",
          },
        }}
        value={item.quantityToBuy}
        onChange={(e) => setItem({ ...item, quantityToBuy: Number(e.target.value) })}
      />
      <IconButton
        size="small"
        sx={{ backgroundColor: "#FAFAFA", border: "1px solid #DBDBDB" }}
        onClick={() => handleCount("plus")}
        disabled={item.quantityToBuy >= 10 && location.pathname.includes('cart')}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
