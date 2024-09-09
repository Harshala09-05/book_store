// Dashboard.js
import React from "react";
import { useState,useEffect,createContext } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import BookCard from "../../Component/BookCard";
import NavBar from "../../Component/NavBar";
import { getBooks } from "../../Services/admin_service";
import { Navigate, useNavigate } from 'react-router-dom';
import DataProvider from '../../Context/DataProvider';
const Dashboard = () => {
  const [books, setBooks] = useState({
      bookName: "",
   author: "",
  description: "",
    quantity: "",
  price: '',
    discountPrice: ''
  });

  const navigate = useNavigate();
  const handleCardClick = (id) => {
    console.log("called",id);
    
    // navigate(`/bookDetails`)
    navigate(`/bookDetails/${id}`)
    // return <Navigate to="/bookDetails" replace={true} />
  }
  useEffect(() => {
    getAllBooks()
    console.log('books',books);
  }, [])
  
  const getAllBooks = async() => {
    let response = await getBooks();
    
    setBooks(response.data.result);
    console.log("books--------------------->", response.data.result)
    }
  


  return (
    <>
      <NavBar />
      <div>
        <Box sx={{width:'100%',alignItems:'center',justifyContent:'center'}}>
          <Box sx={{width:'100%',alignItems:'center',justifyContent:'center' }}>
            <Box  style={{
          padding: "15px",
          display: "flex",
              justifyContent: "space-around",
              // backgroundColor: 'yellow'
        }}>
              <Typography
                variant="h5"
                component="div"
                // sx={{ marginBottom: "20px" }}
                sx={{fontSize:25,display:'flex',alignItems:'center'}}
              >
                Books
                <Typography variant="body1" color="initial" sx={{fontSize:12,color:'#9D9D9D'}}>
              ({books.length} items)
            </Typography>
              </Typography>
              <Select
                value="relevance"
                displayEmpty
                sx={{ marginBottom: "20px", width: "200px",height:'25px' }}
              >
                <MenuItem value="relevance">Sort by relevance</MenuItem>
                <MenuItem value="price">Price:Low to high</MenuItem>
                <MenuItem value="price">Price:high to Low</MenuItem>
             
              </Select>
            </Box>
            <Box sx={{marginLeft:'5vw',display:"flex",justifyContent:'center',
              // backgroundColor: 'yellow',
              width:'90vw',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)', // 4 cards per row
              // gap: '2px', // Adjust the gap between cards as needed
              // gap:2,flexWrap:'wrap',justifyContent:'center'
              }} >
              {books.length > 0 ? (
                books.map(book => (
                  // <BookCard key={book.id} book={book} />
                  <BookCard key={book.id} handleCardClick={handleCardClick} books={book} setBooks={setBooks} getAllBooks={ getAllBooks} />
             
                ))
              ) : (
                <Typography>No books available</Typography>
              )}

              </Box>
            </Box>
          
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
