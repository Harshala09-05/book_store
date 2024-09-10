import React from "react";
import { Box, Typography } from "@mui/material";
import Book from "../Assets/Book.png";
import QuantityNo from "../Component/QuantityNo";
import { removeCartItem, deleteWishList } from "../Services/admin_service";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartItem() {
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
            ></Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                fontSize: 12,
                color: "#9D9D9D",
                marginTop: 2,
                marginBottom: 1,
              }}
            ></Typography>

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
              Rs. {1500}
              <Typography
                sx={{
                  fontSize: 12,
                  textDecoration: "line-through",
                  color: "#9D9D9D",
                  mx: 2,
                }}
              >
                Rs.{300}
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
              Rs. {500 * 2000}
              <Typography
                sx={{
                  fontSize: 12,
                  textDecoration: "line-through",
                  color: "#9D9D9D",
                  mx: 2,
                }}
              >
                Rs.{500 * 2000}
              </Typography>
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
            {/* <QuantityNo /> */}
            <Typography
              variant="body1"
              color="initial"
              sx={{ mx: { xs: 1, sm: 2 }, cursor: "pointer" }}
            >
              Remove
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
