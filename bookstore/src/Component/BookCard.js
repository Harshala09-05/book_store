import React, { createContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardMedia, Typography, Rating, Button, CardActions } from '@mui/material';
import Book from '../Assets/Book.png';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import DataProvider from '../Context/DataProvider';


export default function BookCard({ books, setBooks, getAllBooks,handleCardClick }) {
  // const navigate = useNavigate();
  // const handleCardClick = () => {
  //   navigate(`/bookDetails/${books.id}`)
  // }
  // const { books, setBooks } = createContext(DataProvider);
  // const [books, setBooks] = useState({
  //   bookName: "",
  //   author: "",
  //   description: "",
  //   quantity: "",
  //   price: '',
  //   discountPrice: ''
  // });

  console.log('hellooo ',books);
  console.log(books.bookName);
  
    return (
      <Card onClick={() => handleCardClick(books._id)} sx={{
        marginLeft: {lg:'2vw',xs:'8vw'}, width: { xs: '80vw', sm: '40vw', md: '20vw', lg: '15vw' }, // Responsive width for different screens
        height: { xs: 'auto', sm: '45vh', md: '40vh' }, // Adjust height based on screen size,
        marginTop: '10vh'
      }}>
        <CardMedia
          component="img"
          alt='book'
          height="135"
          image={Book}
          sx={{
            objectFit:'contain',backgroundColor:'#F5F5F5',padding:'10px 00'
          }}
        />
        <CardContent >
          <Typography variant="body1" component="div" sx={{display:'flex',alignItems:'flex-start',fontWeight:'bold'}}>
            {books.bookName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary',display:'flex',alignItems:'flex-start',fontSize: { xs: '10px', md: '12px' } }}>
            by {books.author}
          </Typography >
          {/* <Rating value='4.5' readOnly /> */}
          <Typography variant="span" color="text.secondary" component="div" sx={{display:'flex',alignItems:'flex-start',marginBottom:'5px'}}>
            <span className='rating' style={{ backgroundColor: 'green', color: 'white', fontSize: { xs: '5px', md: '7px' } }} >
                        4.5
                        <StarIcon fontSize='sm'/>
                    </span>
                    <span className='rating-number' fontSize={{ xs: '5px', md: '7px' }} color="text.secondary">
                        (20)
                    </span>
                </Typography>

          <Typography variant="h6" component="div" sx={{fontWeight:'bold',
                           fontSize: { xs: '12px', md: '14px' },display:'flex',alignItems:'flex-start'}}>
            Rs. {books.discountPrice}
            <span color="text.secondary" style={{ textDecoration: 'line-through', fontSize: { xs: '10px', md: '12px' } ,marginLeft:'5px'}}>Rs.{books.price}</span>
          </Typography>
        </CardContent>
        
      </Card>
    
  )
}
