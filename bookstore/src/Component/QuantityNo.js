import React, { useState,createContext, useEffect } from 'react';
import { Box, IconButton, TextField,Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { modifyCartItem, removeCartItem } from "../Services/admin_service";
import { useLocation } from "react-router";
import{useDispatch} from 'react-redux'
import {DataContext} from '../Context/DataProvider';
import { addToCart, removeFromCart } from './Reducer/cartActions';

export default function QuantityNo(props) {
  const { cartItem, id, setCartItem, setAddCart, getCartItems, fetchbooksDetails } = props;
  const location = useLocation();
    const [item, setItem] = useState(cartItem);
    const { cartCount, setCartCount, updateCartCount } = createContext(DataContext);

    const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState('');
  // const cartQuantity = cartItem?.find(item => item.product_id.quantity === availableStock);
  // console.log(cartQuantity)
  const availableStock = item?.product_id?.quantity || 0;
  console.log(item?.product_id?.quantity);
    useEffect(() => {
      if (!item.quantityToBuy) {
        setItem((prev) => ({
          ...prev,
          quantityToBuy: 1, // Default value if not already set
        }));
      }
    }, []);
  const handleCount = async (type) => {
      try {
        console.log("cartItem :", cartItem);
        console.log("Item :", item);
      // Log to check if item._id exists
      console.log("Item ID:", id);

      if (!id) {
        throw new Error("Cart item ID is undefined!");
      }
       debugger
        if (type === "plus") {
          console.log(type, item.quantityToBuy);
          if (item.quantityToBuy >= availableStock) {
            setErrorMessage('Order is out of stock!');
            return;
          }
          const updatedQuantity = item.quantityToBuy + 1;
          setItem((prev) => ({
            ...prev,
            quantityToBuy: updatedQuantity,
          }));

          console.log(updatedQuantity, item);

          await modifyCartItem(id, { quantityToBuy: updatedQuantity });
          fetchbooksDetails(); // Fetch the book details after modifying the car
          dispatch(addToCart(item, id));

          setErrorMessage('');

        } else if (type === "minus") {
          console.log(type, item.quantityToBuy);
          debugger
          // If quantity is 1, remove the item from the cart
          if (item.quantityToBuy === 1) {
            setAddCart(false); // Remove item from the frontend cart view
            await removeCartItem(id); // API call to remove the item from the backend cart
            dispatch(removeFromCart(id)); // Redux action to update the state by removing the item
            // return getCartItems(); // Refresh the cart items after removal
          }
          else {
            // If quantity is greater than 1, reduce the quantity
            const updatedQuantity = item.quantityToBuy - 1;
            setItem((prev) => ({
              ...prev,
              quantityToBuy: updatedQuantity, // Update local state for the item
            }));
          
            await modifyCartItem(id, { quantityToBuy: updatedQuantity }); // API call to update the quantity in the backend
            dispatch(removeFromCart(id))
            // getCartItems(); // Refresh the cart items after modifying the quantity
          }
        }
        
      getCartItems(); // Refresh cart after modification
    } catch (err) {
    
      console.error("Error updating cart item:", err);
    }
  };

  
  return (
    <Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        size="small"
        sx={{ backgroundColor: "#FAFAFA", border: "1px solid #DBDBDB" }}
        onClick={() => handleCount("minus")}
        disabled={item?.quantityToBuy === 1 && location.pathname.includes('cart')}
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
        sx={{ backgroundColor: "#FAFAFA", border: "1px solid #DBDBDB" ,marginRight:1}}
        onClick={() => handleCount("plus")}
        disabled={item.quantityToBuy <= availableStock || location.pathname.includes('cart')}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
     {errorMessage && (
      <Typography variant="caption" color="error" sx={{ mt: 1 }}>
        {errorMessage}
      </Typography>
      )}
  </Box>
  );
}
