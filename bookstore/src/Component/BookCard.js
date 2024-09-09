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
        <Card onClick={()=>handleCardClick(books._id)} sx={{  marginLeft:'2vw',width: '15vw',height:'40vh',marginTop:'10vh'}}>
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
          <Typography variant="body1" component="div">
            {books.bookName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            by {books.author}
          </Typography >
          {/* <Rating value='4.5' readOnly /> */}
          <Typography variant="span" color="text.secondary" component="div" sx={{display:'flex',alignItems:'flex-start'}}>
                    <span className='rating'>
                        4.5
                        <StarIcon fontSize='sm'/>
                    </span>
                    <span className='rating-number'>
                        (20)
                    </span>
                </Typography>

          <Typography variant="h6" component="div" sx={{fontWeight:'bold',
                           fontSize:'14px'}}>
            {books.price} <span style={{ textDecoration: 'line-through', fontSize: '10px' }}>{books.discountPrice }</span>
          </Typography>
        </CardContent>
        
      </Card>
    
  )
}
