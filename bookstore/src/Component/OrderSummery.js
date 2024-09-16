import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';
import Book from "../Assets/Book.png";
import CartItem from './CartItem';

export default function OrderSummery() {
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
          <CartItem/>

      {/* Checkout Button */}
      <Button variant="contained" sx={{ textTransform: 'none', height: '40px', width: '120px',marginLeft:'50vw' }}>
        CHECKOUT
      </Button>
    {/* </Box> */}
  </Box>
  )
}
