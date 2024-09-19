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


function Cart({onPlaceOrder}) {
    const { id } = useParams();
    const [booksDetails, setbooksDetails] = useState();
    const [cartItem, setCartItem] = useState();
    const [addCart, setAddCart] = useState();

    useEffect(() => {
        getAllBooks();
        getAllCartItems(); // Call the function to fetch cart items here.
      }, []);
      const handleRemoveCartItem = (id) => {
        setCartItem((prevItems) => prevItems.filter(item => item._id !== id));
      };
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
    
    <Box>
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
               booksDetails={booksDetails} addToCart={addToCart}getBooks={getBooks}getCartItems={getCartItems} getAllCartItems={getAllCartItems} cartItem={book} onRemove={handleRemoveCartItem} 

           /> 
              ))

              }
            </Box>
            
                <Box item sx={{alignSelf:'end'}}>
                    <Button variant="contained" sx={{width:150,marginLeft:'43vw'}} onClick={()=> onPlaceOrder()} >
                        Place Order
                    </Button>
                </Box>
            </Box>            
          </Box>
          
        </Box>
    
  )
}

export default Cart;