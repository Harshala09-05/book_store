import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import OnlineShoppingImage from '../../Assets/OnlineShopping.png';
import Login from './Login';
import SignUp from './SignUp';
import { Link, useLocation } from 'react-router-dom';



export default function LeftCard({changePage}) {
  // State to manage the current page (login or signup)
  const [page, setPage] = useState('login');

  const location = useLocation();

  // Determine the current page based on the URL path
  const isLoginPage = location.pathname === '/' || location.pathname === '/signin';
  const isSignUpPage = location.pathname === '/signup';

  // Event handlers for switching pages
  const handleLoginClick = () => setPage('login');
  const handleSignUpClick = () => setPage('signup');

  return (
    <Box display='flex' justifyContent='center' alignItems='center' height='100vh' bgcolor='lightgrey'>
      {/* Left side with the image and title */}
      <Box display='flex' marginTop={2} flexDirection='column' boxShadow={3} justifyContent='center' alignItems='center' padding={3} bgcolor='white' height='40vh' width='18vw' borderRadius='10px 0 0 10px'>
        <img src={OnlineShoppingImage} alt="Online Book Shopping" width={100} />
        <Typography variant='h6' marginTop={2}>ONLINE BOOK SHOPPING</Typography>
      </Box>

      {/* Right side with the form (Login or SignUp) */}
      <Box item>
        <Paper sx={{ width: '25vw', height: '55vh', boxShadow: '3px', borderRadius: '4px', marginTop: '10px' }} elevation={5}>
          <Box display='flex' justifyContent='space-between' width='15vw' paddingTop={5} marginLeft={10} marginTop={5}>
            {/* Login and SignUp text with click handlers */}
            <Typography 
              variant='h5' 
              // color={page === 'login' ? 'textPrimary' : 'textSecondary'}
              color={ isLoginPage ? 'textPrimary' : 'textSecondary'}
              // onClick={handleLoginClick} 
              component={Link}
              to='/'
              sx={{ cursor: 'pointer' }}>
              Login
            </Typography>
            <Typography 
              variant='h5' 
              // color={page === 'signup' ? 'textPrimary' : 'textSecondary'} 
              color={isSignUpPage ? 'textPrimary' : 'textSecondary'} 
              // onClick={handleSignUpClick} 
              component={Link}
              to='/signup'
              sx={{ cursor: 'pointer' }}>
              SignUp
            </Typography>
          </Box>

          {/* Conditional rendering based on the state */}
          {/* {page === 'login' ? <Login setPage={setPage} /> : <SignUp setPage={setPage} />} */}
          {isLoginPage && <Login setPage={setPage}/>}
          {isSignUpPage && <SignUp setPage={setPage}/>}
        </Paper>
      </Box>
    </Box>
  );
}
