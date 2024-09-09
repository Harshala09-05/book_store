import { Typography, TextField, Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userLogin } from "../../Services/user_service";
import { adminUserLogin } from "../../Services/admin_service";

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
        }
        else {
          console.log('Invalid')
        }
        
      } catch (err) {
        toast.error("Invalid credentials");
      }
    } else {
      toast.error("Please correct the errors before submitting");

      // Set error states to show specific messages
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
            width: "15vw",
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
            width: "15vw",
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
        sx={{ alignSelf: "flex-end", cursor: "pointer", marginBottom: 2 }}
      >
        Forgot Password?
      </Typography>

      <Button
        variant="contained"
        onClick={handleLogin} // Changed from onSubmit to onClick
        sx={{ bgcolor: "maroon", width: "15vw", mb: 2 }}
      >
        Login
      </Button>

      <Divider sx={{ width: "15vw", my: 2 }}>OR</Divider>

      <Box display="flex" justifyContent="space-between" width="15vw">
        <Button variant="contained" color="primary" sx={{ mr: 1, width: "7vw" }}>
          Facebook
        </Button>
        <Button variant="outlined" sx={{ ml: 1, width: "7vw" }}>
          Google
        </Button>
      </Box>
    </Box>
  );
}
