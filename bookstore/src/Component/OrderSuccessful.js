import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import ordersuccess from '../Assets/ordersuccess.png';
import { Link } from 'react-router-dom';

export default function OrderSuccessful() {
    return (
        <Grid
            container
            sx={{ flexDirection: 'column', alignItems: 'center', m: 2, textAlign: 'center' }}
        >
            <Grid item xs={12}>
                <img
                    src={ordersuccess}
                    alt='order-success'
                    style={{ width: '100%', maxWidth: '300px' }} // Image will adjust based on screen size
                />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: 16, sm: 18 },
                        fontWeight: 'bold',
                        mb: 1,
                    }}
                >
                    Hurray!!! Your order is confirmed
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: 14, sm: 16 },
                    }}
                >
                    The order ID is #123456. Save the order ID for
                    further communication.
                </Typography>
            </Grid>

            <Grid item xs={12} sx={{ my: 3 }}>
                <Box
                    component="table"
                    sx={{
                        width: '100%',
                        maxWidth: { xs: '100%', sm: '90%', md: '80%' },
                        borderCollapse: 'collapse',
                        borderColor: '#DCDCDC',
                        border: '1px solid #DCDCDC',
                        textAlign: 'center',
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', border: '1px solid #DCDCDC' }}>Email us</th>
                            <th style={{ padding: '10px', border: '1px solid #DCDCDC' }}>Contact us</th>
                            <th style={{ padding: '10px', border: '1px solid #DCDCDC' }}>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '10px', border: '1px solid #DCDCDC' }}>
                                admin@bookstore.com
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #DCDCDC' }}>
                                +918163475881
                            </td>
                            <td
                                style={{
                                    padding: '10px',
                                    border: '1px solid #DCDCDC',
                                    wordBreak: 'break-word', // To ensure long text breaks on smaller screens
                                }}
                            >
                                42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, Near Kumarakom
                                Restaurant, HSR Layout, Bangalore 560034
                            </td>
                        </tr>
                    </tbody>
                </Box>
            </Grid>

            <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" sx={{ width: { xs: '90%', sm: '50%' } }}>
                    Continue Shopping
                </Button>
            </Link>
        </Grid>
    );
}
