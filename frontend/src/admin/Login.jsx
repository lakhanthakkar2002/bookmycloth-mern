import React, { useEffect, useState } from 'react'
import {createTheme} from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react'
import { Alert, Avatar, Box, Container, CssBaseline, Snackbar, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Button from '@mui/material/Button'
import {useForm} from 'react-hook-form'
import { useAdminLogin } from '../query/AdminQuery'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
// import 'material-react-toastify/dist/React'
export const Login = () => {
const mutation=useAdminLogin()
const navigate=useNavigate();
const [open, setOpen] = useState(false)
useEffect(() => {

    if(mutation.isSuccess){
       console.log(mutation.data);
        toast.success(mutation.data.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

        console.log("data",mutation.data);
        sessionStorage.setItem("token",mutation.data.data.token)
        
        setTimeout(() => {
            navigate("/admin/home")
        }, 3500);
    
    }
    else if(mutation.isError){
        toast.error(mutation.error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        // console.log(mutation.error.response.data.message);
    }
    else if(mutation.isIdle){
        console.log("idle...");
    }
  
},[mutation.isLoading,mutation.isIdle])

    const defaultTheme=createTheme()

    const {register,handleSubmit} = useForm()

    const loginAdmin=(data)=>{
        console.log("local data... ",data);
        console.log("type : ",typeof data);
        setOpen(true);
        mutation.mutate(data)
    }
   return(
   <div>
<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
        sx={{marginTop:8,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
        
        }}
        >
            <Avatar sx={{m:1,bgcolor:'secondary.main'}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant='h5'>
                Sign in
            </Typography>
            <Box component="form" method='post' onSubmit={handleSubmit(loginAdmin)} noValidate sx={{mt:1}}>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='userEmail'
                    label="Email Address"
                    type='email'
                    autoComplete='userEmail'
                    autoFocus
                    {...register('userEmail')}

                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='userPassword'
                    label="Password"
                    type='password'
                    {...register('userPassword')}
                />
                <Button
                type="submit"
                fullWidth
                variant='contained'
                sx={{mt:3,mb:2}}
                >
                Sign In
                </Button>

            </Box>

        </Box>

      </Container>

    </ThemeProvider>
    
    </div>
   )
    }