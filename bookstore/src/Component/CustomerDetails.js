import React, { useState } from 'react';
import { Box, Button, Radio, RadioGroup, FormControlLabel, TextField, Typography } from '@mui/material';

export default function CustomerDetails() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [fullName, setFullName] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [addresses, setAddresses] = useState({
    work: {
      type: 'WORK',
      address: 'BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore',
      city: 'Bengaluru',
      state: 'Karnataka',
    },
    home: {
      type: 'home',
      // address: 'BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore',
      // city: 'Bengaluru',
      // state: 'Karnataka',
    },
  });

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  // Function to handle address changes in TextField
  const handleAddressFieldChange = (event, key, field) => {
    setAddresses((prevAddresses) => ({
      ...prevAddresses,
      [key]: {
        ...prevAddresses[key],
        [field]: event.target.value,
      },
    }));
  };

  return (
    <Box sx={{ padding: '20px', border: '1px solid #ccc', width: '61%', margin: '2vw 10vw' }}>
      <Box item sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', p: 1, px: 3 }}>
        <Typography variant="h6" color="initial" sx={{ fontWeight: 'bold' }} component={'div'}>
          Customer Details
        </Typography>
        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
            color: '#A03037',
            borderColor: '#A03037',
            '&:hover': { color: '#A03037', borderColor: '#A03037' },
          }}
        >
          Add New Address
        </Button>
      </Box>

      {/* Full Name and Mobile Number */}
      <Box sx={{ display: 'flex', justifyContent: 'start', marginBottom: '20px', marginTop: '20px' }}>
        <TextField
          label="Full Name"
          variant="outlined"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          sx={{ width: '30%', marginLeft: '3vw', marginRight: '2vw' }}
        />
        <TextField
          label="Mobile Number"
          variant="outlined"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          sx={{ width: '30%' }}
        />
      </Box>

      {/* Address Section */}
      <RadioGroup value={selectedAddress} onChange={handleAddressChange}>
        {Object.keys(addresses).map((key, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: '10px',
              // borderBottom: '1px solid #ccc',
              paddingBottom: '10px',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'start',
              flexDirection: 'column',
            }}
          >
            <FormControlLabel
              value={key}
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'start' }}>
                  <Typography variant="h6" component="span">
                    {index + 1}. {addresses[key].type}
                  </Typography>
                  <Button variant="text" sx={{ marginLeft: '10px', color: 'red' }}>
                    Edit
                  </Button>
                </Box>
              }
            />
            <Box sx={{ paddingLeft: '15px', display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ marginRight: '33vw', paddingBottom: '1vh' }}>Address:</Typography>
              <TextField
                label="Address"
                variant="outlined"
                multiline
                rows={4}
                value={addresses[key].address}
                onChange={(e) => handleAddressFieldChange(e, key, 'address')}
                sx={{ width: '40vw', paddingBottom: '3vh' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                <TextField
                  label="City/Town"
                  variant="outlined"
                  value={addresses[key].city}
                  onChange={(e) => handleAddressFieldChange(e, key, 'city')}
                  sx={{ width: '45%', marginRight: '2vw' }}
                />
                <TextField
                  label="State"
                  variant="outlined"
                  value={addresses[key].state}
                  onChange={(e) => handleAddressFieldChange(e, key, 'state')}
                  sx={{ width: '45%' }}
                />
              </Box>
            </Box>
            <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '20px'
          // borderBottom: '1px solid #ccc',
        }}
      >
      
      </Box>

      {/* Address Details */}
      {/* <Box sx={{ paddingLeft: '40px', marginTop: '10px',display:'flex',justifyContent:'start' }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', paddingBottom: '10px' }}>
          Address
              </Typography>
        <Box>
        <Typography variant="body2" sx={{ }}>
          BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom
          restaurant, HSR Layout, Bangalore
                </Typography>
                </Box>
      </Box> */}

     
          </Box>
        ))}
      </RadioGroup>
 {/* Continue Button */}
 <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '20px' ,marginLeft:'50vw'}}>
        <Button variant="contained" sx={{ textTransform: 'none' }}>
          CONTINUE
        </Button>
      </Box>
     
    </Box>
  );
}
