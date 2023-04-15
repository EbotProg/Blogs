// import { BsFillGrid3X3GapFill, BsFillMenuButtonWideFill, BsFillMenuButtonFill } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef} from 'react';
import { RxDashboard } from 'react-icons/rx';//dashboard icon
import { FaRegCommentAlt } from 'react-icons/fa';// comment menu icon
import { MdLogout } from 'react-icons/md';//logout 
//import { TfiHome } from 'react-icons/tfi';//home
import { GrMenu } from 'react-icons/gr';
import { VscHome } from 'react-icons/vsc';//default account info
import { BiEdit } from 'react-icons/bi';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { BsSearch } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from '../api/AxiosInstance';
import useAxios from 'api/UseAxios';
import { Avatar } from '@mui/material';




const Navbar = ({children, onChange, value}) => {

    let username = JSON.parse(localStorage.getItem('user'));
    let accessToken = JSON.parse(localStorage.getItem('accessToken'));
    const {data:user, error, loading, status} = useAxios(`/user/${username}`, accessToken)
    const [homeNavItemClicked, setHomeNavItemClicked] = useState(false);
    const [dashboardNavItemClicked, setDashboardNavItemClicked] = useState(false);
    const [commentNavItemClicked, setCommentNavItemClicked] = useState(false);
    const [loadedImage, setLoadedImage] = useState(null);
    const [count, setCount] = useState(0);


    async function getArrayBuffer(url){
     if(loadedImage !== null) return;
        setLoadedImage(await (await fetch(url)).arrayBuffer()); 
    }
    useEffect(()=>{
        if(user) getArrayBuffer(user.result.profilePicPath)
        // console.log('loaded image and user navbar', loadedImage, user)
        setCount(current=> current+1)
    }, [count])
    // const [logoutNavItemClicked, setLogoutNavItemClicked] = useState(false);
    
    // const [profilePic, setProfilePic] = useState(null);

    //code to make search bar to be focus each time the query is changed
    const searchBarRef = useRef();

    useEffect(()=>{
        searchBarRef.current.focus();

    }, [value])

    


    // console.log('user navbar', user);

    const profilePicInputRef = useRef();

    const changeProfilePic = (e, pic)=>{
        e.preventDefault();
        let formData = new FormData();
        console.log('profile pic path navbar', pic);
        formData.append("file", pic, pic.name)
        formData.append("username", JSON.parse(localStorage.getItem('user')))

        return axios.post("/change-profile-picture", formData ,{
            headers: {"content-type": "multipart/form-data"}
          });
    }
    function handleChangeImageClick (){
        profilePicInputRef.current.click();


    }

    const navigate = useNavigate();

const currentRoute = useLocation();
//this useeffect is for changing the color of the nav item depending on the route
useEffect(()=>{
  if(currentRoute.pathname == '/main/'){
  setHomeNavItemClicked(true);
  }else if(currentRoute.pathname == '/main/dashboard'){
  setDashboardNavItemClicked(true);
  }else if(currentRoute.pathname == '/main/comment'){
  setCommentNavItemClicked(true);
  }
//   else if(currentRoute.pathname == '/main/logout'){
//   setLogoutNavItemClicked(true);
//   }

}, [])
// //function for checking the route which is entered
// function handleNavItemClick(){
//     console.log(currentRoute);
// }

const [navbarIsShown, setNavbarIsShown] = useState(false);
    

    function handleMenuMobile(e){
      setNavbarIsShown(current => !current);
    }


   const menuItems = [
    {
        path:"/main/",
        name: "Home",
        icon: <VscHome className='md-icon'/>,
        className: homeNavItemClicked ? 'nav-item-link-clicked nav-item-link' : 'nav-item-link',
        onClick: ()=>{//when a nav item is clicked, change its color
            setHomeNavItemClicked(true);
            setDashboardNavItemClicked(false);
            setCommentNavItemClicked(false);
            // setLogoutNavItemClicked(false);
        }
    },
    {
        path:"/main/dashboard",
        name: "Dashboard",
        icon: <RxDashboard className='md-icon' />,
        className: dashboardNavItemClicked ? 'nav-item-link-clicked nav-item-link' : 'nav-item-link',
        onClick: ()=>{
            setHomeNavItemClicked(false);
            setDashboardNavItemClicked(true);
            setCommentNavItemClicked(false);
            // setLogoutNavItemClicked(false);
        }
    },
    {
        path:"/main/comment",
        name: "Comment",
        icon: <FaRegCommentAlt className='md-icon' />,
        className: commentNavItemClicked ? 'nav-item-link-clicked nav-item-link' : 'nav-item-link',
        onClick: ()=>{
            setHomeNavItemClicked(false);
            setDashboardNavItemClicked(false);
            setCommentNavItemClicked(true);
            // setLogoutNavItemClicked(false);
        }
    }
    // ,
    // {
    //     path:"/main/logout",
    //     name: "Logout",
    //     icon: <MdLogout className='md-icon' />,
    //     className: logoutNavItemClicked ? 'nav-item-link-clicked nav-item-link' : 'nav-item-link',
    //     onClick: ()=>{
    //         setHomeNavItemClicked(false);
    //         setDashboardNavItemClicked(false);
    //         setCommentNavItemClicked(false);
    //         setLogoutNavItemClicked(true);
    //         localStorage.removeItem('accessToken');
    //         navigate('/auth/login')
    //     }
    // }
   ]

   const handleSubmit = e =>{
    e.preventDefault();
    console.log('submitted navbar form');
   }

    return ( 
        <div className='body'>
          <div className="body-container">

          <div className="main-top-div">
            <div className="top-div shadow-sm d-flex flex-row">

                <div className="top-top-div flex-grow-1">
                <GrMenu onClick={handleMenuMobile}  className="nav-menu lg-icon mobile-view-menu-btn"  />
                 <h2 className="top-div-title"><Link className='nav-link nav-link-top-title' to="#">Blogz</Link></h2>
                </div>

             <form onSubmit={handleSubmit} 
             className="search-form"
              role="search"
              >
               <input
               ref={searchBarRef}
                value={value}
                onChange={(e)=> onChange(e.target.value)}
                className="form-control me-1" 
                type="search" 
                placeholder="find blog" 
                aria-label="Search" 
                />
               <button className="btn btn-outline-dark" type="button">Search</button>
             </form>

             <BsSearch className="lg-icon search-icon" />
            </div>

            
            <div className={navbarIsShown ? 'open-navbar nav-class shadow' : 'close-navbar nav-class'}>

      <div className="navbar-content">
      <div className="user-info">
             
             <div className="user-info-content placeholder-glow">
                 <div className="user-image placeholder-glow">
                    
{loadedImage === null && <Avatar 
                        alt='...'
                        src='...'
                        sx={{width: 110, height: 110}}
                        className="avatar placeholder bg-secondary"
                        />} 

                    {
                        loadedImage && 
                        // <img className='user-image-img' src={user.result.profilePicPath} alt="" />
                        <Avatar 
                        alt={user.result.username}
                        src={user.result.profilePicPath}
                        sx={{width: 110, height: 110}}
                        className="avatar"
                        /> 
      
                    }
                     
                     
                 </div>
                 <input 
                           
                           ref={profilePicInputRef} 

                           onChange={(e) =>  changeProfilePic(e, e.target.files[0])}
                           type="file"
                           accept='image/*'
                           className="d-none" />
                 <OverlayTrigger placement='top' overlay={<Tooltip>Change profile picture</Tooltip>}>
                 
                 <button className='change-pic-btn' 
                 onClick={handleChangeImageClick}
                 ><BiEdit className='md-icon' />Change</button>

                    </OverlayTrigger> 
                 {loading && <div class="placeholder username-placeholder bg-secondary rounded"></div>}
                 <div className="username">{user && user.result.username}</div>

                 <button className='create-blog-btn create-blog-nav-btn shadow-sm' onClick={()=>{ navigate('/main/create')}}><AiOutlinePlus/>New Blog</button>
             </div>

      </div>

      {/* <div className="border"></div> */}


      <ul className="nav-list-items">

        {
             menuItems.map((item, index)=>{
                return(
                     <li key={index} className="nav-item">
                         <Link className={item.className} to={item.path} onClick={item.onClick}>
                              <div className='link-icon'>{item.icon}</div>
                              <div className='link-name'>{item.name}</div>
                         </Link> 
                     </li>
     )
     

 })
}

<li className="nav-item">
                         <button className="nav-item-link logout-btn" onClick={()=>{
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('user');
                            navigate('/auth/login');
                         }}>
                              <div className='link-icon'><MdLogout className='md-icon' /></div>
                              <div className='link-name'>Logout</div>
                         </button> 
                     </li>

</ul>

</div>



</div>
            </div>
            

            <div className="bottom-div">


                 <main onClick={()=>{
                    if(navbarIsShown){
                        setNavbarIsShown(false);
                    }
                 }}>{children}</main>

            </div>
            </div>
        </div>
     );
}
 
export default Navbar;