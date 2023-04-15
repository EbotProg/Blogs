import { Link } from 'react-router-dom';
import { useRef } from 'react';




const AuthNavbar = ({children}) => {


//    const regLink = useRef();
//     const loginLink = useRef();

//     function toggle(link_1, link_2){
//         link_1.current.style.backgroundColor = "#757575";
//         link_1.current.style.fontWeight = "700";
//         link_2.current.style.backgroundColor = "#b3b2b2";
//         link_2.current.style.fontWeight = "400";
//     }

    return ( 
        <div>

        
        <nav className='auth-nav'>
        <div>
        <h1><Link className='nav-title' to="#">Blogz</Link></h1>
        </div>
        {/* <ul className='auth-nav-ul'>
        <li className="auth-nav-li"><Link ref={regLink} onClick={()=>toggle(regLink, loginLink)} className="auth-nav-link registration-toggle" to="/registration">Registration</Link><Link ref={loginLink} onClick={()=>toggle(loginLink, regLink)} className="auth-nav-link login-toggle" to="/login">Login</Link></li>
        </ul> */}
        
        </nav>
        <main>{children}</main>
        </div>
     );
}
 
export default AuthNavbar;