import React from "react";
import { Box, Typography } from "@mui/material";
import Book from "../Assets/Book.png";
import QuantityNo from "../Component/QuantityNo";
import { removeCartItem, deleteWishList } from "../Services/admin_service";
import DeleteIcon from "@mui/icons-material/Delete";
import BookDetails from "./BookDetails";

export default function CartItem(props) {
  const { booksDetails,onRemove, addToCart, getAllBooks, getBooks,cartItem,getCartItems,showQuantity,isOrderSummary } = props
  console.log("cartItems", cartItem);
  console.log('BookDetails', booksDetails);
  console.log(cartItem._id);
  const handleRemove = async () => {
    try {
      await removeCartItem(cartItem._id); // Call the removeCartItem service with the item's ID
      if (onRemove) {
        onRemove(cartItem._id); // Call the onRemove callback if provided
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
 
  // const filterBooks = cartItem.filter((item) => item.length > 0);
  

  // const bookName = cartItem?.bookName || "Unknown Book";
  return (
    <Box container sx={{ my: 1, justifyContent: "space-between" }}>
      
      <Box item sx={{ display: "flex", alignItems: "flex-start" }} xs={12}>
        <Box item>
          <img
            src={Book}
            alt="book"
            style={{ height: 85, objectFit: "contain" }}
          />
        </Box>
        <Box item sx={{ marginLeft: 5 }} xs={10}>
          <Box item>
            <Typography
              variant="h6"
              color="initial"
              sx={{ fontWeight: "bold", lineHeight: 1, display: "flex" }}
            >{cartItem.product_id.bookName}</Typography>
            
            <Typography
              variant="body1"
              color="initial"
              sx={{
                fontSize: 12,
                color: "#9D9D9D",
                marginTop: 2,
                marginBottom: 1,
                marginRight:'12vw'
              }}
            >by {cartItem.product_id.author}</Typography>

            <Typography
              variant="body1"
              color="initial"
              component={"div"}
              sx={{
                display: "flex",
                fontSize: 15,
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              Rs. {cartItem.product_id.discountPrice}
              <Typography
                sx={{
                  fontSize: 12,
                  textDecoration: "line-through",
                  color: "#9D9D9D",
                  mx: 2,
                }}
              >
                Rs.{cartItem.product_id.price}
              </Typography>
            </Typography>

            <Typography
              variant="body1"
              color="initial"
              component={"div"}
              sx={{
                display: "flex",
                fontSize: 15,
                alignItems: "center",
                fontWeight: "bold",
                flexWrap: "nowrap",
              }}
            >
              Rs. {cartItem.product_id.discountPrice * cartItem.quantityToBuy}
             
            </Typography>
          </Box>

          <Box
            item
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: 1,
              flexWrap: "nowrap",
            }}
          >
            {!isOrderSummary && (
        <Box sx={{ margin: '10px' }}>
          <QuantityNo cartItem={cartItem} id={cartItem._id} />
        </Box>
      )}
            {/* <QuantityNo cartItem={cartItem} id={cartItem._id} /> */}
            {!isOrderSummary && (
            <Typography
              variant="body1"
              color="initial"
              sx={{ mx: { xs: 1, sm: 2 }, cursor: "pointer" }}
              onClick={handleRemove}
            >
              Remove
              </Typography>
              )}
          </Box>
        </Box>
        </Box>
    </Box>
  );
}
