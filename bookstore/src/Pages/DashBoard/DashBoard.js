import React, { useState, useEffect } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import BookCard from "../../Component/BookCard";
import NavBar from "../../Component/NavBar";
import { getBooks, getCartItems } from "../../Services/admin_service";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [cartItems, setCartItems] = useState();
  const location = useLocation(); // To check the current route
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/dashboard/bookDetails/${id}`);
  };

  useEffect(() => {
    // Fetch books only when the user is on the /dashboard route
    if (location.pathname === '/dashboard') {
      getAllBooks();
    }
    getAllCartItems();
  }, [location.pathname]);

  const getAllBooks = async () => {
    let response = await getBooks();
    setBooks(response.data.result);
    console.log("books--------------------->", response.data.result);
  };

  const getAllCartItems = async () => {
    let response = await getCartItems();
    console.log("cartItems in dashboard", response.data.result);
    setCartItems(response.data.result);
  };

  return (
    <>
      <NavBar cartItems={cartItems} />
      <div>
        <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Conditionally render books only on /dashboard */}
            {location.pathname === '/dashboard' && (
              <>
                <Box
                  style={{
                    padding: "15px",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontSize: 25, display: 'flex', alignItems: 'center' }}
                  >
                    Books
                    <Typography variant="body1" sx={{ fontSize: 12, color: '#9D9D9D', marginLeft: 1 }}>
                      ({books.length} items)
                    </Typography>
                  </Typography>

                  <Select
                    value="relevance"
                    displayEmpty
                    sx={{ marginBottom: "20px", width: "200px", height: '25px' }}
                  >
                    <MenuItem value="relevance">Sort by relevance</MenuItem>
                    <MenuItem value="price">Price: Low to High</MenuItem>
                    <MenuItem value="price">Price: High to Low</MenuItem>
                  </Select>
                </Box>

                <Box sx={{
                  marginLeft: '5vw',
                  display: "grid",
                  gridTemplateColumns: 'repeat(4, 1fr)', // 4 cards per row
                  gap: 2
                }}>
                  {books.length > 0 ? (
                    books.map((book) => (
                      <BookCard
                        key={book.id}
                        handleCardClick={handleCardClick}
                        books={book}
                        setBooks={setBooks}
                        getAllBooks={getAllBooks}
                      />
                    ))
                  ) : (
                    <Typography>No books available</Typography>
                  )}
                </Box>
              </>
            )}

            {/* This renders the nested routes like BookDetails */}
            <Outlet />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
