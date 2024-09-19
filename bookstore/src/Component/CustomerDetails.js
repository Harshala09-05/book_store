import React, { useState } from 'react';
import { Box,Grid, Button, Radio, RadioGroup, FormControlLabel, TextField, Typography, FormControl, FormLabel } from '@mui/material';

export default function CustomerDetails({ toggleCustomerDetails, onContinue }) {
  const [selectedAddress, setSelectedAddress] = useState(''); // Set a default value
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [addresses, setAddresses] = useState({
    addressType: 'Home',
    fullAddress: 'HATIMI HOMES, A-WING, FLAT NO:-004, NEAR TELI SAMAJ HALL, TAPAL NAKA',
    city: 'PANVEL',
    state: 'MAHARASHTRA',
  });

  const handleAddressChange = (e) => {
    setAddresses((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleAddressTypeChange = (e) => {
    setAddresses((prev) => ({
      ...prev,
      addressType: e.target.value,
    }));
  };

  return (
    <Box sx={{ padding: '20px', border: '1px solid #ccc', width: '61%', margin: '2vw 10vw' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', p: 1, px: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Customer Details
        </Typography>
        {toggleCustomerDetails && (
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
        )}
      </Box>

      {/* Toggle for Customer Details */}
      {toggleCustomerDetails && (
        <>
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
          <Box>
            {/* Address Type */}
            <Grid item>
              <FormControl sx={{ width: '100%' }}>
                <FormLabel id="addressType" sx={{ color: '#666666' }}>
                  Type
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="addressType"
                  name="row-radio-buttons-group"
                  value={addresses.addressType}
                  onChange={handleAddressTypeChange}
                  id="addressType"
                >
                  <FormControlLabel value="Home" control={<Radio />} label="Home" />
                  <FormControlLabel value="Work" control={<Radio />} label="Work" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Address Input Fields */}
            <Box sx={{ paddingLeft: '15px', display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ paddingBottom: '1vh' }}>Address:</Typography>
              <TextField
                label="Address"
                variant="outlined"
                multiline
                rows={4}
                id="fullAddress"
                value={addresses.fullAddress}
                onChange={handleAddressChange}
                sx={{ width: '40vw', paddingBottom: '3vh' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                <TextField
                  label="City/Town"
                  variant="outlined"
                  id="city"
                  value={addresses.city}
                  onChange={handleAddressChange}
                  sx={{ width: '45%', marginRight: '2vw' }}
                />
                <TextField
                  label="State"
                  variant="outlined"
                  id="state"
                  value={addresses.state}
                  onChange={handleAddressChange}
                  sx={{ width: '45%' }}
                />
              </Box>
            </Box>
          </Box>

          {/* Continue Button */}
          <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '20px', marginLeft: '50vw' }}>
            <Button variant="contained" sx={{ textTransform: 'none' }} onClick={() => onContinue(addresses)}>
              CONTINUE
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
