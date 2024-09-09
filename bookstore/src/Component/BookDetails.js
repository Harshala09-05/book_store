import {Box,Divider,Grid,Typography,Button,FormGroup,Breadcrumbs,Skeleton,Card,TextField,IconButton} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import React, { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "@mui/material/Link";
import { FormControl, Rating } from "@mui/material";
import { getBooks, addCartItem, getCartItems } from "../Services/admin_service";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Book from "../Assets/Book.png";
import Navbar from "./NavBar";
import { useLocation } from "react-router-dom";
// import DataProvider from "../Context/DataProvider";
import QuantityNo from "./QuantityNo";

function BookDetails() {
  const { id } = useParams();

  const [booksDetails, setbooksDetails] = useState();

  useEffect(() => {
    fetchbooksDetails();
  }, [id]);
 
  const fetchbooksDetails = async () => {
    
    const response = await getBooks();
    console.log("booksDetails", response, id);
    let filteredData = response.data.result.filter((val) => val._id === id);
    console.log(filteredData);
    setbooksDetails(filteredData[0]);
  };
  const [cartItem, setCartItem] = useState();
  const [addCart, setAddCart] = useState();

  const addToCart = async () => {
    const cartItemResponse = await addCartItem(id);
    setCartItem({
      ...cartItemResponse.data,
      quantityToBuy: 1 // Set the initial quantity to 1
    });
    
    setAddCart(true); // Set to true to show the QuantityNo component
    getCartItems()
  };
  

  return (
    <>
      <Navbar />
      <Box>
        <Box sx={{ height: "8vh", marginLeft: "13vw", paddingTop: "3vh" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="">
              Home
            </Link>
            <Typography sx={{ color: "text.primary" }}>booksDetails</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginTop: "2vh",
              marginLeft: "10vw",
            }}
          >
            {/* <box> */}
            <Box
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: 5,
                alignItems: "start",
              }}
            >
              <Typography
                component={"div"}
                sx={{ border: "1px solid #D1D1D1", px: 3, py: 2 }}
              >
                <img src={Book} alt="Book" style={{ height: 367 }} />
              </Typography>
            </Box>
            <Box
              sx={{
                marginLeft: "4.5vw",
                paddingTop: "2vh",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {!addCart && (
                <Button
                  variant="contained"
                  sx={{
                    flexGrow: 1,
                    marginRight: "20px",
                    backgroundColor: "#A03037",
                    "&:hover": { backgroundColor: "#A03037" },
                  }}
                  onClick={addToCart}
                >
                  Add to bag
                </Button>
              )}
              {addCart && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                  }}
                >
                  <QuantityNo
                    cartItem={cartItem}
                    setAddCart={setAddCart}
                    getCartItems={getCartItems}
                    setCartItem={setCartItem}
                    id={id}
                    fetchbooksDetails={fetchbooksDetails}
                  />
                </Box>
              )}
              <Button
                variant="contained"
                sx={{
                  flexGrow: 1,
                  marginRight: "20px",
                  backgroundColor: "Black",
                  // "&:hover": { backgroundColor: "#A03037" },
                }}
              >
                WISHLIST
              </Button>
            </Box>
          </Box>
          {booksDetails && (
            <Box sx={{ marginLeft: "8px", width: "40vw" }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "start", my: 1 }}
              >
                {booksDetails?.bookName}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ display: "flex", alignItems: "start", my: 1 }}
              >
                by {booksDetails?.author}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                sx={{ marginTop: 1, marginBottom: 2 }}
              >
                <Typography
                  variant="span"
                  color="text.secondary"
                  component="div"
                  sx={{ display: "flex", alignItems: "flex-start" }}
                >
                  <span className="rating">
                    {booksDetails?.rating || 4.5}
                    <StarIcon fontSize="sm" />
                  </span>
                  <span className="rating-number">
                    ({booksDetails?.quantity})
                  </span>
                </Typography>
              </Box>
              <Typography
                variant="h6"
                color="textPrimary"
                sx={{
                  display: "flex",
                  alignItems: "start",
                  my: 1,
                  fontWeight: "bold",
                }}
              >
                Rs.{booksDetails?.discountPrice}{" "}
                <Typography
                  component="span"
                  sx={{
                    textDecoration: "line-through",
                    color: "gray",
                    marginLeft: 1,
                  }}
                >
                  Rs.{booksDetails?.price}
                </Typography>
              </Typography>
              <Divider></Divider>
              {/* Book Detail */}
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                <strong>Book Detail:</strong>
                {booksDetails?.description}
              </Typography>
              <Divider></Divider>
              {/* Customer Feedback */}
              <Typography
                variant="h6"
                sx={{
                  marginTop: 4,
                  display: "flex",
                  alignItems: "start",
                  my: 1,
                }}
              >
                Customer Feedback
              </Typography>
              <Box
                display="flex"
                alignItems="start"
                flexDirection="column"
                backgroundColor="#D3D3D3"
                sx={{ marginBottom: 2, borderRadius: 2 }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: "1vh",
                    paddingLeft: "2vw",
                    paddingTop: "2vh",
                  }}
                >
                  Overall rating
                </Typography>
                <Rating
                  name="customer-rating"
                  precision={0.5}
                  sx={{ marginBottom: "1vh", paddingLeft: "2vw" }}
                />
                <TextField
                  fullWidth
                  label="Write your review"
                  variant="outlined"
                  multiline
                  rows={2}
                  sx={{
                    marginBottom: 2,
                    width: "35vw",
                    marginLeft: "2vw",
                    backgroundColor: "white",
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginBottom: "2vh", marginLeft: "27vw" }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default BookDetails;
