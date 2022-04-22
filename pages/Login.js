// import React from 'react'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsondata= {
      email: data.get('email'),
      pwd: data.get('password'),
    };

    fetch("http://localhost:3001/login",{
            method:"POST",
            headers:{
                "content-type":"application/json",
            },
            body: JSON.stringify(jsondata),
        })
        .then((response)=>response.json())
        .then((data)=>{
            if(data.status==='login success'){
                alert('Login successed');
                localStorage.setItem('token',data.token);
                window.location='/profile';
            }
            else{
                alert(data.message);
            }
        })
        .catch((err)=>{
            console.log(err);
        });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://ae01.alicdn.com/kf/H3794e1e49a5e47c490ce5e8c604f74d1C/Techwear-Hi-Street-Paratroopers-Jogger-Grunge.jpg)',
            backgroundColor: (t) =>
              t.palette.mode === 'dark' ? t.palette.bl[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField 
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button 
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item color="white">
                  <Link href="/register" variant="body2" >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
// class Login extends React.Component{
//     constructor(props){
//         super(props);
//         this.state ={
//             email:"",
//             pwd:""
//         };
//         this.handleChange= this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);

//     }

//     handleChange(e){
//         this.setState({[e.target.name]: e.target.value});
//     }

//     handleSubmit(e){
//         e.preventDefault();
//         alert(`Hello, ${this.state.email} ${this.state.pwd}`);
//     }
//     render(){
//         return(
//             <form onSubmit={this.handleSubmit}>
//             <div className="rectangle"><h1>Login</h1></div>
//             <label>EMAIL:</label><br/>
//             <input type="email" name="email"value={this.state.email} required onChange={this.handleChange}/><br/>
//             <label>PASSWORD:</label><br/>
//             <input type="password" name="pwd"value={this.state.pwd} required onChange={this.handleChange}/><br/>
//             <input type="submit" value="Submit"/>
//         </form>
//         );
//     }
// }
// export default Login;