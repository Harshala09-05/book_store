// import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';
import Book from "../Assets/Book.png";
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react'
import {  TextField, MenuItem,  InputAdornment,Breadcrumbs} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import CartItem from './CartItem';
import { addCartItem, getBooks, getCartItems, updateUser } from '../Services/admin_service';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import CustomerDetails from './CustomerDetails';
// import OrderSummery from './OrderSummery';
import QuantityNo from './QuantityNo';
export default function OrderSummery({toggleOrderSummary}) {
  // const { booksDetails, addToCart, getAllBooks, getBooks,cartItem,getCartItems,getAllCartItems,toggleOrderSummary } = props
  const navigate = useNavigate();
  const onCheckOut = async(data) => {
     
    navigate('/successful')
  }
  let isOrderSummary;
  // console.log('booksDetails',booksDetails);
  const [booksDetails, setbooksDetails] = useState();
    const [cartItem, setCartItem] = useState();
  const [addCart, setAddCart] = useState();
  const [showQuantity, setShowQuantity] = useState(false);

    useEffect(() => {
        getAllBooks();
        getAllCartItems(); // Call the function to fetch cart items here.
      }, []);
    
      // Fetch all books
      const getAllBooks = async () => {
        try {
          let response = await getBooks();
          console.log("booksDetails", response);
          setbooksDetails(response.data.result);
          console.log("Books fetched: ", response.data.result);
          
        } catch (error) {
          console.error("Error fetching books: ", error);
        }
      };
      console.log('BookDetails',booksDetails);
     // Fetch all cart items
      const getAllCartItems = async () => {
        try {
          let response = await getCartItems();  // Fetch the cart items
          setCartItem(response.data.result);    // Update the state with fetched cart items
          console.log("Cart items fetched: ", response.data.result);  // Log fetched data to console
        } catch (error) {
          console.error("Error fetching cart items: ", error);
        }
      };
    
      const addToCart = async () => {
        try {
          const cartItemResponse = await addCartItem();  // Add item to cart
          setCartItem([...cartItem, cartItemResponse.data]);  // Update state with the new cart item
          console.log("Item added to cart: ", cartItemResponse.data);
          getAllCartItems();  // Refresh the cart items after adding
        } catch (error) {
          console.error("Error adding item to cart: ", error);
        }
    };
    console.log('cartItem',cartItem);

  return (
    <Box sx={{ padding: '20px', border: '1px solid #ccc', width: '61%', margin: '2vw 10vw' }}>
    {/* Order Summary Header */}
    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px',display:'flex',justifyContent:'start' }}>
      Order Summary
    </Typography>

    {/* Book Card */}
    {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Card sx={{ display: 'flex', width: '50%' }}>
        <CardMedia
          component="img"
          sx={{ width: 100, height: 140 }}
          image={Book}
          alt="Don't Make Me Think"
        />
        <CardContent>
          <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
            Don't Make Me Think
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            by Steve Krug
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: '10px' }}>
              Rs. 1500
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              Rs. 2000
            </Typography>
          </Box>
        </CardContent>
      </Card> */}
          <Box item sx={{ display: 'flex', flexDirection: 'column' }}>
              {cartItem?.map((book) => (
               
               <CartItem
               booksDetails={booksDetails} addToCart={addToCart}getBooks={getBooks}getCartItems={getCartItems} getAllCartItems={getAllCartItems} cartItem={book} isOrderSummary={true}
           /> 
              ))

              }
            </Box>

      {/* Checkout Button */}
      <Button variant="contained" sx={{ textTransform: 'none', height: '40px', width: '120px',marginLeft:'50vw' }} onClick={()=>onCheckOut()}>
        CHECKOUT
      </Button>
    {/* </Box> */}
  </Box>
  )
}
