import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import {Box,Typography,TextField,Button} from '@mui/material'
import toast from "react-hot-toast"
import axios from "axios"
function Register() {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({
        name:'',
        email:'',
        password:''
    })
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value,
        }));
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
 const {data} = await axios.post('/api/register',{username:inputs.name,email:inputs.email,password:inputs.password})
    if(data.success){
        toast.success("User Registered Successfully")
        navigate("/login")
    }
        } catch (error) {
            
        }
    }
  return (
    <>
    <form onSubmit={handleSubmit}>
    <Box
    maxWidth={450}
    display="flex"
    flexDirection={"column"}
    alignItems="center"
    justifyContent={"center"}
    margin= "auto"
    marginTop={5}
    boxShadow="10px 10px 20px #ccc"
    padding={3}
    borderRadius={5}
    >
        <Typography variant='h4'
        padding={3}
        textAlign="center"
        sx={{textTransform:"uppercase"}}
        >Register</Typography>
        <TextField placeholder='name' onChange={handleChange} value={inputs.name} name='name' margin='normal' type={"text"} required/>
        <TextField placeholder='email' onChange={handleChange} value={inputs.email} name='email' margin='normal' type={"email"} required/>
        <TextField placeholder='password' onChange={handleChange} value={inputs.password} name='password' margin='normal' type={"password"} required/>
        <Button type='submit' sx={{borderRadius:3,marginTop:3}} variant='contained' color='primary'>Submit</Button>
        <Button onClick={()=> navigate("/login")} sx={{borderRadius:3,marginTop:3}}>Already Registered?Please LogIn</Button>
    </Box>
    </form>
    </>
  )
}

export default Register