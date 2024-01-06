import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {URL} from  '../url'
import Footer from '../components/Footer'


const Register = () => {

  const [username,setusername] = useState('')
  const [email,setemail] = useState('')
  const [password,setpassword] = useState('')
  const [error,seterror] = useState(false);
  const navigate = useNavigate();

  

  const handleRegister = async()=>{
    
    try{
      const res = await axios.post(URL+"/api/auth/register",{email,username,password})
      setusername(res.data.username)
      setemail(res.data.email)
      setpassword(res.data.password)
      seterror(false);
      navigate("/login")


    }catch(err){
      seterror(true);
      console.log(err);
    }
  }
  return (
    <>
        <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-xl md:text-xl font-extrabold "><Link to ="/">DIPXOIT</Link></h1>
        <h3><Link to ="/login">Login</Link></h3>
    </div>
    <div className="w-full flex items-center justify-center  h-[80vh] ">
    <div className="flex flex-col justify-center items-center w-[80%] md:w-[25%] space-y-4">
      <h1 className="text-xl font-bold text-left">Create an account</h1>
      <input onChange={(e)=>setemail(e.target.value)} className= "w-full px-4 py-2 border-2 border-black rounded-lg outline-0" type="text" placeholder="Enter your email" />
      <input onChange={(e)=>setusername(e.target.value)} className= "w-full px-4 py-2 border-2 border-black rounded-lg outline-0" type="text" placeholder="Enter your username" />
      <input onChange={(e)=>setpassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black rounded-lg outline-0" type="password" placeholder="Set a password"/>
      <button onClick= {handleRegister}className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-700 hover:text-black">Register</button>
      {error && <h3 className='text-red-500 text-sm '>something went wrong</h3>}   
      <div className='flex justify-center items-center space-x-4'>
        <p>Already have an account?</p><Link className='text-gray-500 hover:text-black' to="/login">Login</Link>
      </div>
      </div>
      </div>
      <Footer/>

    </>
      )
}

export default Register
