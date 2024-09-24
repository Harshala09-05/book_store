import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton, Badge, Menu, MenuItem,Box } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import logoImage from '../Assets/logo.jpg';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import InfoIcon from '@mui/icons-material/Info';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
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
      width: '20ch',
    },
  },
}));

const Navbar = ({ cartItems, onSearch }) => {
  const navigate = useNavigate();
  const [anchorE2, setAnchorE2] = useState(null);
  const [searchBook, setSearchBook] = useState('');
  const cartCount = useSelector((state) => state.cartCount);

  const handleClickLog = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE2(null);
  };

  const handleClick = () => {
    navigate(`/dashboard/cart`);
  };

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const handleSearchChange = (event) => {
    setSearchBook(event.target.value);
    onSearch(event.target.value);
  };

  const onSignOut = () => {
    localStorage.removeItem('token');
    toast(() => (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <InfoIcon color='primary' />You have Logged Out
      </span>
    ), { duration: 2000 });
    navigate('/signup');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: '#800000', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography variant="h6" onClick={handleLogoClick} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={logoImage} alt="Bookstore" style={{ width: '30px', marginRight: '10px' }} />
          Bookstore
        </Typography>

        {/* Search Bar */}
        <Search sx={{ flexGrow: 1, maxWidth: { xs: '60vw', md: '35vw' }, marginRight: '2vw' }}>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "#9D9D9D" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            sx={{ color: "#9D9D9D" }}
            onChange={handleSearchChange}
            value={searchBook}
          />
        </Search>

        {/* Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Account Icon */}
          <IconButton color="inherit" onClick={handleClickLog} sx={{ marginRight: { xs: '1vw', sm: '2vw' } }}>
            <PersonOutlineOutlinedIcon />
          </IconButton>
          <Menu
            anchorEl={anchorE2}
            open={Boolean(anchorE2)}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          >
            <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
          </Menu>

          {/* Cart Icon */}
          <IconButton color="inherit" onClick={handleClick}>
            <Badge badgeContent={cartItems?.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
