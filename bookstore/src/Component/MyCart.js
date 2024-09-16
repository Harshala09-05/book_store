import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, MenuItem, Button, InputAdornment} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CartItem from './CartItem';
import { addCartItem, getBooks, getCartItems } from '../Services/admin_service';
import { useParams } from "react-router-dom";
import CustomerDetails from './CustomerDetails';
import OrderSummery from './OrderSummery';
import QuantityNo from './QuantityNo';



export default function MyCart() {
    const { id } = useParams();

  const [booksDetails, setbooksDetails] = useState();
  const [cartItem, setCartItem] = useState();
  const [addCart, setAddCart] = useState();
    // const [books, setBooks] = useState({
    //     bookName: "",
    //  author: "",
    // description: "",
    //   quantity: "",
    // price: '',
    //   discountPrice: ''
    // });
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
 
    
  console.log('cartItem',cartItem);
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
    <Box container sx={{flexDirection:'column',border:'1px solid #DCDCDC',py:{xs:0,sm:2},px:{xs:0,sm:3},minWidth:360,marginLeft:'10vw',marginRight:'26vw',marginTop:'2vw'}}>
        <Box item sx={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',p:1,px:2}}>
            <Typography variant="h6" color="initial" sx={{fontWeight:'bold',whiteSpace: 'nowrap'}}>My Cart({cartItem?.length})</Typography>
            <TextField
              id="location"
              select
              InputProps={{
                startAdornment: <InputAdornment position="start"><LocationOnIcon sx={{color:'#A03037'}}/></InputAdornment>,
                style:{margin:0,padding:0},
            }}
            value={"Use Current Location"}
            >
                <MenuItem value={"Use Current Location"}>Use Current Location</MenuItem>
            </TextField>
        </Box>
        <Box item sx={{display:'flex',p:1,px:3}}>
            <Box container sx={{flexDirection:'column',gap:1}}>
            <Box item sx={{ display: 'flex', flexDirection: 'column' }}>
              {cartItem?.map((book) => (
               
               <CartItem
               booksDetails={booksDetails} addToCart={addToCart}getBooks={getBooks}getCartItems={getCartItems} getAllCartItems={getAllCartItems} cartItem={book}
           /> 
              ))

              }
            </Box>
            
                <Box item sx={{alignSelf:'end'}}>
                    <Button variant="contained" sx={{width:150,marginLeft:'43vw'}} >
                        Place Order
                    </Button>
                </Box>
            </Box>            
      </Box>
    
    </Box>
      <CustomerDetails />
      {/* <OrderSummery/> */}
       </>
  )
}
