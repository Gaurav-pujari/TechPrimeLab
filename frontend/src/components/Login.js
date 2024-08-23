import React, { useState,useEffect} from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setemail] = useState("");
const [password, setpassword] = useState("");
const navigate = useNavigate();
const[error,setError]=useState(false);
const[invalidcredential,setinvalidcredential]=useState(false);
const [windowWidth, setWindowWidth] = useState(window.innerWidth);
useEffect(() => {

  const handleResize = () => {setWindowWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);}})



const Onsubmit = async (e) => {

  
    e.preventDefault();
     if(!email ||!password)
     {
      setError(true)
      return false;

     }
  
  console.log(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email,password}),
      headers: {
        "Content-type": "application/json",
      },
    });

    result = await result.json();
    console.warn(result);


    if (result.auth) {
     localStorage.setItem("user",JSON.stringify(result));
     localStorage.setItem("token",JSON.stringify(result.auth));
    navigate("/dashboard");
    } else {

      setinvalidcredential(true);
      return false;
    }
  };

 
  return (
    <>
   
    <body className="body"> 
      <div className="header-bg">
   <div className="oval"></div>
      <div className="image">
        <img  src="./Logo.svg" className="logO"></img>
      </div>
      </div>
      <div className="titles ">
        <p >Online Project Management</p>
      </div>


      <form>
        <div className="login-container">
          <div className="mbs">
            <p className="headingss">Login to get started</p>
          </div>
          <div className="mb  my-1">
          <label htmlFor="exampleInputEmail1"className={`form-label ${error && !email ? 'error' : ''}`} >
                Email
              </label>

            <input
              type="email"
              className={`form-control ${error && !email ? 'error' : ''}`}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            {error && !email &&<div className="invalid-input">Email is required </div>}
          </div>
          <div className="mb">
            <label forname="exampleInputPassword1"className={`form-label ${error && !password ? 'error' : ''}`}>
              Password
            </label>
            <input
              type="password"
              className={`form-control ${error && !password ? 'error' : ''}`}
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
             {error && !password &&<div className="invalid-input">Password is required </div>}
          </div>
          <div className="mb">
            <a href="#">ForgetPassword?</a>
          </div>
          <div className=" mb-3 d-grid gap-2 col-6 mx-auto ">
          
          {windowWidth < 730 && invalidcredential && <span className="invalid-inputs">Invalid Credential</span>}
       
            <button type="submit" id="submit"className="login-button"onClick={Onsubmit}>Login</button>
      
          </div>
        </div>
      </form>

      { windowWidth > 730 && invalidcredential && <span className="invalid-inputs">Invalid Credential</span>}
      
      
      </body>
    </>
  );
}
