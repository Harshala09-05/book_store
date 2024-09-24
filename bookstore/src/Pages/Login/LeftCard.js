import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import OnlineShoppingImage from '../../Assets/OnlineShopping.png';
import Login from './Login';
import SignUp from './SignUp';
import { Link, useLocation } from 'react-router-dom';

export default function LeftCard() {
  const [page, setPage] = useState('login');

  const location = useLocation();

  const isLoginPage = location.pathname === '/' || location.pathname === '/signin';
  const isSignUpPage = location.pathname === '/signup';

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
      bgcolor='lightgrey'
      flexDirection={{ xs: 'column', sm: 'row' }}
    >
      {/* Left side with the image and title - hidden on mobile */}
      <Box
        display={{ xs: 'none', sm: 'flex' }}
        marginTop={2}
        flexDirection='column'
        boxShadow={3}
        justifyContent='center'
        alignItems='center'
        padding={3}
        bgcolor='white'
        height='40vh'
        width='18vw'
        borderRadius='10px 0 0 10px'
      >
        <img src={OnlineShoppingImage} alt="Online Book Shopping" width={100} />
        <Typography variant='h6' marginTop={2}>ONLINE BOOK SHOPPING</Typography>
      </Box>

      {/* Right side with the form (Login or SignUp) */}
      <Box item>
        <Paper
          sx={{
            width: { xs: '80vw', sm: '25vw' },
            height: { xs: 'auto', sm: '55vh' },
            boxShadow: '3px',
            borderRadius: '4px',
            mt: { xs: 2, sm: '10px' },
            p: { xs: 2, sm: 0 },
          }}
          elevation={5}
        >
          <Box
            display='flex'
            justifyContent='space-between'
            width='15vw'
            pt={5}
            ml={10}
            mt={3}
            sx={{
              width: { xs: '90%', sm: '15vw' },
              marginLeft: { xs: '49px', sm: '60px' },  // Shift left on mobile
              justifyContent: { xs: 'flex-start', sm: 'center' }, // Align left on mobile
            }}
          >
            {/* Login and SignUp text */}
            <Typography
              variant='h5'
              color={isLoginPage ? 'textPrimary' : 'textSecondary'}
              component={Link}
              to='/'
              sx={{ cursor: 'pointer', mx: 2 }}
            >
              Login
            </Typography>
            <Typography
              variant='h5'
              color={isSignUpPage ? 'textPrimary' : 'textSecondary'}
              component={Link}
              to='/signup'
              sx={{ cursor: 'pointer', mx: 2 }}
            >
              SignUp
            </Typography>
          </Box>

          {/* Conditional rendering based on current page */}
          {isLoginPage && <Login setPage={setPage} />}
          {isSignUpPage && <SignUp setPage={setPage} />}
        </Paper>
      </Box>
    </Box>
  );
}
