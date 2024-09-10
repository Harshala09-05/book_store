import React from 'react'
import { Box, Typography, TextField, MenuItem, Button, InputAdornment} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CartItem from './CartItem';



export default function MyCart() {
  return (
    <Box container sx={{flexDirection:'column',border:'1px solid #DCDCDC',py:{xs:0,sm:2},px:{xs:0,sm:3},minWidth:360}}>
        <Box item sx={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',p:1,px:2}}>
            <Typography variant="h6" color="initial" sx={{fontWeight:'bold',whiteSpace: 'nowrap'}}>My Cart({4})</Typography>
            <TextField
              id="location"
              select
              InputProps={{
                startAdornment: <InputAdornment position="start"><LocationOnIcon sx={{color:'#A03037'}}/></InputAdornment>,
                style:{margin:0,padding:0},
            }}
            value={"Use Current Location"}
            >
                <MenuItem value={"Use Current Location"}>Use Current Location</MenuItem>
            </TextField>
        </Box>
        <Box item sx={{display:'flex',p:1,px:3}}>
            <Box container sx={{flexDirection:'column',gap:1}}>
                <Box item sx={{display:'flex',flexDirection:'column'}}>
                    <CartItem/>
                </Box>
                <Box item sx={{alignSelf:'end'}}>
                    <Button variant="contained" sx={{width:150}} >
                        Place Order
                    </Button>
                </Box>
            </Box>            
        </Box>
    </Box>


  )
}
