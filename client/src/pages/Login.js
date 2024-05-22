import { useState, useRef, useEffect } from "react";
import useAxios from "../api/UseAxios";
import axios from "api/AxiosInstance";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';



const Login = ({setToken}) => {

    let url = '/users';
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [errMsg, setErrMsg] = useState('');
    let [successMsg, setSuccessMsg] = useState('');
    let { data:users } = useAxios(url);
    let navigate = useNavigate();

    let errElement = useRef(0);
    let successElement = useRef(0);
    let firstInput = useRef(0);

    useEffect(()=>{
        firstInput.current.focus();
    }, [])

    useEffect(()=>{
        setErrMsg('');
        setSuccessMsg('');
    }, [username, password])

// //function to check credential(username and/or password)
//  function validCredential(users, credential, inputName){
//    for(let i=0; i < users.length; i++){
//            if(credential !== users[i][inputName] || credential.length === 0){//if credential is not found in db
//                   if(i === users.length-1){// if this is the last element in db
//                   console.log(`Invalid ${inputName}`);
//                   return false;
//                   }
//                   console.log(i, credential, users[i][inputName])
//                   continue;//leave this element and check the next element
                  
//            }
//            else if(credential === users[i][inputName]){//if credentail is found in db
            
//                 console.log(`valid ${inputName}`);
//                 return true;
//            }
//    }

//  }



    //function to handle submit of login form
    async function handleSubmit(e){
        console.log('hello');
        console.log('username', username);
        e.preventDefault();
        // let validUsername = cb(users, username, 'username');
        // let validPassword = cb(users, password, 'password');
        // if(!validUsername){
        // console.log(validUsername);
        // setErrMsg('Invalid username')
        //  return;
        // }if(!validPassword){
        //     console.log(validPassword);
        //     setErrMsg('Invalid password');
        //  return;
        // }else{
        //     console.log('everything is ok');
        //     navigate('/');
        // }
        if(username.length === 0){
            setErrMsg("username field must be filled")
            return;
        }else if(password.length === 0){
            setErrMsg("password field must be filled");
            return;
        }else{
        

        await axios.post('/auth/login', {username, password},{
            headers:{ "content-type": "application/x-www-form-urlencoded" }
        }).then((result)=>{
            console.log('res from axios', result)
             if(result.status === 200){
                localStorage.setItem('accessToken', result.data.accessToken)
                const user = jwt_decode(result.data.accessToken, {payload: true})
                localStorage.setItem('user', JSON.stringify(user.name))
                
                setToken(result.data.accessToken)
                // setToken(JSON.parse(localStorage.getItem('accessToken')))
                navigate('/main/dashboard')
             }
        })



        }

    
    }


    
    return ( 
        <div className="form-content">
            <form className="text-center d-flex flex-column align-items-center justify-content-center">
    <div className="row g-0 w-100 d-flex flex-column align-items-center justify-content-center">
        <div className="mb-2">
        <h2 className="form-title">Login</h2>
        <p className="error-message" ref={errElement}>{errMsg}</p>
        <p ref={successElement}>{successMsg}</p>

        </div>
        

            <div className="form-floating mb-3 col-11 col-sm-9 col-md-7 col-lg-5">
                <input
                ref={firstInput}
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
            
            <div className="form-group my-4 col-11 col-sm-9 col-md-7 col-lg-5">
            <button className="btn btn-primary w-100" onClick={handleSubmit} >Login</button>
            <p className="text-start mt-1">Don't have an account? <Link className='login-link' to="/auth/registration" >click here to register</Link></p>
            </div>
        
            
            
    </div>
</form>

        </div>
     );
}
 
export default Login;