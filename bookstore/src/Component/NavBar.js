// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton, Badge } from '@mui/material';
import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import logoImage from '../Assets/logo.jpg'
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';





const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '90vw',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
        
      backgroundColor:'white'
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '35vw',
      },
    },
  }));
const Navbar = () => {
  return (
    <AppBar position="static" >
      <Toolbar sx={{backgroundColor:'#800000'}}>
        <Typography variant="h6" sx={{ marginLeft:'10vw' }}>
          <img src={logoImage} alt="Bookstore" style={{ width: '30px', marginRight: '10px',marginTop:'10px' }} />
          Bookstore
        </Typography>
        <div style={{ display:'flex',justifyContent:'start', position: 'relative', marginRight: '20vw', marginLeft: '40px', width: '300px' }}>
          
                  <Search sx={{ display: { xs: "none", sm: "flex",marginRight:'5vw' } }}>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#9D9D9D" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search..." }}
                  sx={{ color: "#9D9D9D" }}
                />
              </Search>

        </div>
        <IconButton color="inherit" sx={{marginLeft:'15vw'}} >
          <PersonOutlineOutlinedIcon />
        </IconButton>
        <IconButton color="inherit" sx={{marginLeft:'3vw'}}>
          <Badge badgeContent={4} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

