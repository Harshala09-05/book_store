import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import LeftCard from './LeftCard'
import { userSignUp } from '../../Services/user_service';
import { adminUserSignup } from '../../Services/admin_service';
// import { useLocation, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const emailRegex = /^[a-z]{3,}(.[0-9a-z]*)?@([a-z]){2,}.[a-z]*$/;
    const passRegex = /^.*(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/
    const phoneRegex = /^(\+91|0)?[6789]\d{9}$/
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleMouseDownPassword = () => {

    }
    const [data,setData] = useState({
        fullName: '',
        email: '',
        password:'', 
        phone:'',
        service: "advance"
    })

    const [checkError, setCheckError] = useState({
        fullNameTrue: false,
        fullNameError:"",
        EmailTrue: false,
        EmailError: '',
        PasswordTrue: false,
        PasswordError: '',
        phoneTrue:false,
        phoneError:''
    })

    // const handleChange = (e) => {
    //     setData({
    //         ...data,
    //         [e.target.id]: e.target.value 
    //     })
    // }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState, [name]: value
        }));
  }
  const navigate = useNavigate();
  const onSignUp = async (e) => { 
    e.preventDefault();
        let emailTest = emailRegex.test(data.email)
        let passwordTest = passRegex.test(data.password)
    let phoneTest = phoneRegex.test(data.phone)
    if (emailTest && passwordTest && phoneTest) {
      try {
        let response = await userSignUp(data);
        console.log(data)
        console.log(response.data.result);
        navigate('/');
      } catch (err) {
        toast.error('User already exists');
      }
    } else {
      toast.error('Please correct the errors before submitting');
    }
    
        // localStorage.setItem('token',response.data.id)
        // if(emailTest === false) {
        //     setCheckError({
        //         EmailTrue:true,
        //         EmailError: 'Enter Valid Email'
        //     })
        // }   else if(passwordTest === false) {
        //     setCheckError({
        //         PasswordTrue:true,
        //         PasswordError: 'The Password must contain atleast 8 characters,One UppercaseLetter,One LowercaseLetter,One number and Special Character'
        //     })
        // } else if(phoneTest === false) {
        //     setCheckError({
        //         phoneTrue:true,
        //         phoneError: 'Please Enter Valid Phone number'
        //     })
        // }
        // if(emailTest && passwordTest && phoneTest === true) {
        //     if(window.location.href.includes('signup')) {
        //         let response = await userSignUp(data)
        //         console.log(response)
        //         // return window.location.reload();
        //     } else if(window.location.href.includes('admin-signup')) {
        //         let response = await adminUserSignup(data)
        //         console.log(response)
        //         // return window.location.reload();
        //     }
        // }
    }
    

  return (
      <div>
          <Box display='flex' flexDirection='column'boxShadow={3} justifyContent='center' alignItems='center' >
              {/* <Box display='flex' justifyContent='space-between' width='15vw'  marginTop={5} marginBottom={1}>
                  <Typography variant='h5' color={'textSecondary'}>Login</Typography>
                  <Typography variant='h5' fontWeight={'bold'}>SignUp</Typography>
              </Box> */}
              <TextField id="outlined-basic" label="Full Name" variant="outlined" margin='normal'
              value={data.fullName} onChange={handleChange}  name='fullName' sx={{
            '& .MuiOutlinedInput-root': {
              height: 30,  // Set the desired height here
              padding: '0 14px',  // Adjust padding if needed
              '& .MuiInputBase-input': {
                padding: '4px 3px',  // Adjust the input text padding
              },
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.6rem',  // Adjust the label font size
            }
          }} />
              <TextField id="outlined-basic" label="EmailId" variant="outlined" margin='normal'
              value={data.email} onChange={handleChange} name='email'  sx={{
            '& .MuiOutlinedInput-root': {
              height: 30,  // Set the desired height here
              padding: '0 14px',  // Adjust padding if needed
              '& .MuiInputBase-input': {
                padding: '4px 3px',  // Adjust the input text padding
              },
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.6rem',  // Adjust the label font size
            }
              }} />
              <TextField id="outlined-basic" label="Password" variant="outlined" margin='normal'
              value={data.password} onChange={handleChange} name='password' sx={{
            '& .MuiOutlinedInput-root': {
              height: 30,  // Set the desired height here
              padding: '0 14px',  // Adjust padding if needed
              '& .MuiInputBase-input': {
                padding: '4px 3px',  // Adjust the input text padding
              },
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.6rem',  // Adjust the label font size
            }
              }} />
              <TextField id="outlined-basic" label="Mobile Number" variant="outlined" margin='normal'
              value={data.phone}  onChange={handleChange} name='phone' sx={{
            '& .MuiOutlinedInput-root': {
              height: 30,  // Set the desired height here
              padding: '0 14px',  // Adjust padding if needed
              '& .MuiInputBase-input': {
                padding: '4px 3px',  // Adjust the input text padding
              },
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.6rem',  // Adjust the label font size
                  },
            mb:'2vh'
          }} />
              <Button variant="contained" onClick={onSignUp} sx={{bgcolor:'maroon',width:'15vw'}} >Login</Button>

              
          </Box>
    </div>
  )
}
