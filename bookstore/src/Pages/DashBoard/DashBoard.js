import React, { useState, useEffect } from "react";
import { Box, Typography, Select, MenuItem, CircularProgress } from "@mui/material";
import BookCard from "../../Component/BookCard";
import NavBar from "../../Component/NavBar";
import { getBooks, getCartItems } from "../../Services/admin_service";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchBook, setSearchBook] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('relevance'); // New state for sort order
  const location = useLocation();
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/dashboard/bookDetails/${id}`);
  };

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      getAllBooks();
    }
    getAllCartItems();
  }, [location.pathname]);

  useEffect(() => {
    // Apply sorting when books or sortOrder changes
    applySorting();
  }, [books, sortOrder]);

  const getAllBooks = async () => {
    setLoading(true);
    try {
      let response = await getBooks();
      setBooks(response.data.result);
      setFilteredBooks(response.data.result);
      console.log("books--------------------->", response.data.result);
    } catch (error) {
      console.log('error fetching', error);
    } finally {
      setLoading(false);
    }
  };

  const getAllCartItems = async () => {
    let response = await getCartItems();
    console.log("cartItems in dashboard", response.data.result);
    setCartItems(response.data.result);
  };

  const handleSearch = (searchBook) => {
    setSearchBook(searchBook);
    if (searchBook === '') {
      getAllBooks();
    } else {
      const filtered = books?.filter((book) =>
        book.bookName?.toLowerCase().includes(searchBook.toLowerCase())
      );
      setBooks(filtered);
    }
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const applySorting = () => {
    let sortedBooks = [...books];
    if (sortOrder === 'relevance') {
      // Default order or any other relevance logic
      sortedBooks.sort((a, b) => a.bookName.localeCompare(b.bookName));
    } else if (sortOrder === 'priceLowToHigh') {
      sortedBooks.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'priceHighToLow') {
      sortedBooks.sort((a, b) => b.price - a.price);
    }
    setFilteredBooks(sortedBooks);
  };

  return (
    <>
      <NavBar cartItems={cartItems} onSearch={handleSearch} />
      <div>
        <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
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
                      ({filteredBooks.length} items)
                    </Typography>
                  </Typography>

                  <Select
                    value={sortOrder}
                    onChange={handleSortChange}
                    displayEmpty
                    sx={{ marginBottom: "20px", width: { xs: "100%", md: "200px" }, height: '25px' }}
                  >
                    <MenuItem value="relevance">Sort by relevance</MenuItem>
                    <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                    <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                  </Select>
                </Box>

                <Box sx={{
                  marginLeft: { xs: 0, md: "5vw" },
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  gap: 2,
                  padding: { xs: 1, md: 2 },
                }}>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    filteredBooks.length > 0 ? (
                      filteredBooks.map((book) => (
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
                    )
                  )}
                </Box>
              </>
            )}

            <Outlet />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
