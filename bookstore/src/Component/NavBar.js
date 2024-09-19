import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton, Badge, Popover, Box,Menu, MenuItem } from '@mui/material';
import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import logoImage from '../Assets/logo.jpg';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import InfoIcon from '@mui/icons-material/Info';
import MyCart from '../Component/MyCart' // Make sure the path is correct

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '90vw',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    backgroundColor: 'white'
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '35vw',
    },
  },
}));

const Navbar = ({cartItems,onSearch}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const cartCount = useSelector((state) => state.cartCount);
  const [searchBook, setSearchBook] = useState('');
  const [anchorE2, setAnchorE2] = useState(null);
  
  const handleClickLog = (event) => {
    setAnchorE2(event.currentTarget);
  };
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate(`/dashboard/cart`)
    
  };
  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const handleClose = () => {
    setAnchorE2(null);
  };
  const handleSearchChange = (event) => {
    setSearchBook(event.target.value);
    onSearch(event.target.value); // Pass search term to parent component
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onSignOut = () => {
    localStorage.removeItem('token');
    toast(() => (
      <span style={{ display: 'flex', alignItems: 'center' }}><InfoIcon color='primary' />You have Logged Out</span>
    ), { duration: 2000 });
    navigate('/signup');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: '#800000' }}>
        <Typography variant="h6" onClick={handleLogoClick} sx={{ marginLeft: '10vw' }}>
          <img src={logoImage} alt="Bookstore" href='/dashboard' style={{ width: '30px', marginRight: '10px', marginTop: '10px' }} />
          Bookstore
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'start', position: 'relative', marginRight: '20vw', marginLeft: '40px', width: '300px' }}>
          <Search sx={{ display: { xs: "none", sm: "flex", marginRight: '5vw' } }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#9D9D9D" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search..." }}
              sx={{ color: "#9D9D9D" }}
              onChange={handleSearchChange}
              value={searchBook}
            />
          </Search>
        </div>
        <IconButton color="inherit" sx={{ marginLeft: '15vw' }}
         onClick={handleClickLog}>
          <PersonOutlineOutlinedIcon />
        </IconButton>
        <Menu
            id="basic-menu"
            anchorEl={anchorE2}
            open={Boolean(anchorE2)}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
          </Menu>
        <IconButton color="inherit" sx={{ marginLeft: '3vw' }} onClick={handleClick} >
          <Badge badgeContent={cartItems?.length} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
