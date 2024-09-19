import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, MenuItem, Button, InputAdornment,Breadcrumbs} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CartItem from './CartItem';
import { addCartItem, getBooks, getCartItems, updateUser } from '../Services/admin_service';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import CustomerDetails from './CustomerDetails';
import OrderSummery from './OrderSummery';
import QuantityNo from './QuantityNo';
import Cart from './Cart';



export default function MyCart(props) {
  const { booksDetails, addToCart, getAllBooks, getBooks,cartItem,getCartItems,getAllCartItems,addresses } = props
    // const { id } = useParams();
    const [toggleCustomerDetails,setToggleCustomerDetails] = useState(false)
    const [toggleOrderSummary,setToggleOrderSummary] = useState(false)
  // const [booksDetails, setbooksDetails] = useState();
  // const [cartItem, setCartItem] = useState();
  // const [addCart, setAddCart] = useState();
  // const [addresses, setAddresses] = useState({
  //   fullName: '',
  //   mobileNumber: '',
  //   addressType: 'Home',
  //   fullAddress: '',
  //   city: '',
  //   state: '',
  // });
  const onPlaceOrder = () => {
    setToggleCustomerDetails(true);
  }
  const onContinue = async(addresses) => {
    setToggleOrderSummary(true);
    // setAddresses(addresses);
    await updateUser(addresses)
  }
    // const [books, setBooks] = useState({
    //     bookName: "",
    //  author: "",
    // description: "",
    //   quantity: "",
    // price: '',
    //   discountPrice: ''
    // });
    
  // useEffect(() => {
  //   fetchbooksDetails();
  // }, [id]);
 
  // const fetchbooksDetails = async () => {
    
  //   const response = await getBooks();
  //   console.log("booksDetails", response, id);
  //   let filteredData = response.data.result.filter((val) => val._id === id);
  //   console.log(filteredData);
  //   setbooksDetails(filteredData[0]);
  // };
 
    
  // console.log('cartItem',cartItem);
  // const addToCart = async () => {
  //   const cartItemResponse = await addCartItem();
  //   setCartItem([...cartItem, cartItemResponse.data]);  // Add new item to cart state
  //   console.log("cart");
  //   getAllCartItems();  // Refresh cart items
  // };
  // const addToCart = async () => {
  //   const cartItemResponse = await addCartItem(id);
  //   setCartItem({
  //     ...cartItemResponse.data,
  //     quantityToBuy: 1 // Set the initial quantity to 1
  //   });
    
  //   setAddCart(true); // Set to true to show the QuantityNo component
  //   getCartItems()
  // };
  return (
    <>
      <Box container sx={{ flexDirection: 'column', border: '1px solid #DCDCDC', py: { xs: 0, sm: 2 }, px: { xs: 0, sm: 3 }, minWidth: 360, marginLeft: '10vw', marginRight: '26vw', marginTop: '2vw' }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{mx:'11%',my:2}}>
      <Link to='/dashboard' sx={{textDecoration:'none',color:'#9D9D9D'}}>
          Home
      </Link>s
      <Typography color="text.primary">My Cart</Typography>
        </Breadcrumbs>
        <Cart onPlaceOrder={onPlaceOrder}  />
      </Box>
    
      <CustomerDetails toggleCustomerDetails={toggleCustomerDetails} onContinue={onContinue} addresses={addresses} />
      {toggleOrderSummary && (
        <OrderSummery toggleOrderSummary={toggleOrderSummary} booksDetails={booksDetails} addToCart={addToCart} getAllBooks={getAllBooks} getBooks={getBooks} cartItem={cartItem} getCartItems={getCartItems} getAllCartItems={getAllCartItems} />
        )}
    </>  
  )
}
