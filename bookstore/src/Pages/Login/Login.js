import { Typography, TextField, Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userLogin } from "../../Services/user_service";

export default function Login() {
  const navigate = useNavigate();
  const emailRegex = /^[a-z]{3,}(.[0-9a-z]*)?@([a-z]){2,}.[a-z]+(.in)*$/;
  const passwordRegex = /^.*(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [checkError, setCheckError] = useState({
    EmailTrue: false,
    EmailError: "",
    PasswordTrue: false,
    PasswordError: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let emailTest = emailRegex.test(data.email);
    let passwordTest = passwordRegex.test(data.password);

    if (emailTest && passwordTest) {
      try {
        let response = await userLogin(data);
        console.log(response.data.result)
        if (response?.data?.result?.accessToken){
         localStorage.setItem("token", response.data.result.accessToken)
          navigate("/dashboard");
        } else {
          console.log('Invalid')
        }
      } catch (err) {
        toast.error("Invalid credentials");
      }
    } else {
      toast.error("Please correct the errors before submitting");

      setCheckError({
        EmailTrue: !emailTest,
        EmailError: !emailTest ? "Please enter a valid email" : "",
        PasswordTrue: !passwordTest,
        PasswordError: !passwordTest ? "Incorrect password" : "",
      });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={3}
      boxShadow={3}
      // bgcolor='pink'
      sx={{
        width: { xs: '73vw', sm: 'auto' }, // Adjust width for mobile view
        padding: { xs: 2, sm: 3 }, // Adjust padding for mobile view
      }}
    >
      <Box>
        <TextField
          id="email"
          label="Email Id"
          variant="outlined"
          name="email"
          value={data.email}
          onChange={handleChange}
          sx={{
            width: { xs: '80vw', sm: '15vw' }, // Responsive width
            "& .MuiOutlinedInput-root": {
              height: 40,
              padding: "0 14px",
              "& .MuiInputBase-input": {
                padding: "8px 6px",
              },
            },
            "& .MuiInputLabel-root": {
              fontSize: "0.9rem",
            },
          }}
          error={checkError.EmailTrue}
          helperText={checkError.EmailError}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          margin="normal"
          name="password"
          value={data.password}
          onChange={handleChange}
          sx={{
            width: { xs: '80vw', sm: '15vw' }, // Responsive width
            "& .MuiOutlinedInput-root": {
              height: 40,
              padding: "0 14px",
              "& .MuiInputBase-input": {
                padding: "8px 6px",
              },
            },
            "& .MuiInputLabel-root": {
              fontSize: "0.9rem",
            },
          }}
          error={checkError.PasswordTrue}
          helperText={checkError.PasswordError}
        />
      </Box>

      <Typography
        variant="body2"
        align="right"
        color="primary"
        sx={{
          alignSelf: "flex-end",
          cursor: "pointer",
          marginBottom: 2,
          width: { xs: '80vw', sm: 'auto' }, // Responsive width
        }}
      >
        Forgot Password?
      </Typography>

      <Button
        variant="contained"
        onClick={handleLogin}
        sx={{
          bgcolor: "maroon",
          width: { xs: '80vw', sm: '15vw' }, // Responsive width
          mb: 2,
        }}
      >
        Login
      </Button>

      <Divider sx={{ width: { xs: '80vw', sm: '15vw' } }}>OR</Divider>

      <Box display="flex" justifyContent="space-between" width={{ xs: '80vw', sm: '15vw' }} mt={2}>
        <Button variant="contained" color="primary" sx={{ width: "48%" }} href='https://www.facebook.com/'>
          Facebook
        </Button>
        <Button variant="outlined" sx={{ width: "48%" }} href='https://myaccount.google.com/'>
          Google
        </Button>
      </Box>
    </Box>
  );
}
