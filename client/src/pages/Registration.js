import { useState, useEffect, useRef } from "react";
import useAxios from "../api/UseAxios";
import axios from "../api/AxiosInstance";
import { useNavigate, Link } from "react-router-dom";

 

const Registration = () => {

    const url = '/users';
    const {data:users, loading, error} = useAxios(url);

    let navigate = useNavigate();
    let [email, setEmail] = useState('');
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [errMsg, setErrMsg] = useState('');
    // const [userImage, setUserImage] = useState('');

    let validInput = null;
     let errInput = useRef();
// this useeffect is here so that when the component reloads, the first input field will be focused
let firstInput = useRef();

useEffect(()=>{
    firstInput.current.focus();
}, [])

//////////////////////

//useeffect for changing error messages
useEffect(()=>{
    setErrMsg('');
}, [email, username, password])



async function handleSubmit(e) {
    e.preventDefault();
    // const emailIsValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const emailIsValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

   //authenticate user
    if(users.length === 0){//if database is empty
         
        if(email.length === 0 || !(emailIsValid.test(email))){
    console.log("email is valid", emailIsValid.test(email))
            setErrMsg('Incorrect email');
        return;     
        }if(username.split(" ").join("").length < 4 ){
        
            setErrMsg('Incorrect username');
        return;
        }if(password.length < 5){
        
            setErrMsg('Incorrect password');
        return;
        }if(password !== confirmPassword){
            setErrMsg("Passwords do not match");
        }
        else{
            await axios.post('/auth/register', {email, username: username.split(" ").join(""), password})
                .then(()=>{
                 console.log('Registered successfully'); 
                 
                 navigate('/auth/login');
                })
        }



    }else if(users.length >= 1){//if db is not empty
     
            await users.forEach( user => {

        if(user.email === email || !(emailIsValid.test(email)) || email.length == 0){//for email
               
            setErrMsg('Incorrect email');
            validInput = false;
            console.log('validInput2', validInput, user.id);
            return;

       }if(user.username === username || username.length < 4){

           setErrMsg('Incorrect username');
           validInput = false;
           console.log('validInput3', validInput, user.id);
           return;

       }if(user.password === password){

           setErrMsg('Incorrect password');
           validInput = false;
           console.log('validInput4', validInput, user.id);
           return;

       }if(password.length < 5){
        setErrMsg('password is weak');
        validInput = false;
        console.log('validInput4', validInput, user.id);
        return;
       }
       if(password !== confirmPassword){
        setErrMsg('passwords do not match');
        validInput = false;
        return;
       }
       else{
               validInput = true;                  
               console.log('validInput5', validInput, user.id);
           }
       });
}

if(validInput == true){

    // const formData = new FormData();

    // formData.append('email', email);
    // formData.append('username', username);
    // formData.append('password', password);
            axios.post('/auth/register', {email, username: username.split(" ").join(""), password})
            .then(()=>{
             console.log('Registered successfully'); 
             navigate('/auth/login');
            })
        }
    }
  


    return ( 
  


<form className="text-center d-flex flex-column align-items-center justify-content-center">
    <div className="row g-0 w-100 d-flex flex-column align-items-center justify-content-center">
        <div className="mb-2">
        <h2 className="form-title">Registration</h2>
        <p className="error-message" ref={errInput}>{errMsg}</p>
        </div>
        
        
            <div className="form-floating mb-3 col-11 col-sm-9 col-md-7 col-lg-5">
                <input
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                ref={firstInput}
                 type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" />
                <label for="floatingEmail" className="">Email address</label>
            </div>
            <div className="form-floating mb-3 col-11 col-sm-9 col-md-7 col-lg-5">
                <input
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                 type="text" className="form-control" id="floatingUsername" placeholder="name@example.com" />
                <label for="floatingUsername">Username</label>
            </div>
            <div className="form-floating mb-3 col-11 col-sm-9 col-md-7 col-lg-5">
                <input
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                 type="password" className="form-control" id="floatingPassword" placeholder="name@example.com" />
                <label for="floatingPassword">password</label>
            </div>
            <div className="form-floating mb col-11 col-sm-9 col-md-7 col-lg-5">
                <input 
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
                type="password" className="form-control" id="floatingConfirmPassword" placeholder="Password" />
                <label for="floatingConfirmPassword">confirm password</label>
            </div>
            
            <div className="form-group my-4 col-11 col-sm-9 col-md-7 col-lg-5">
            <button className="btn btn-primary w-100" onClick={handleSubmit} >Register</button>
            <p className="text-start mt-1">Already have an account? <Link className='login-link' to="/auth/login" >click here to login</Link></p>
            </div>
        
            
            
    </div>
</form>




     );
}
 
export default Registration;