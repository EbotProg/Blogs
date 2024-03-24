import './App.css';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import {Routes, Route} from 'react-router-dom';
import Create from './pages/Create';
import BlogDetails from './pages/BlogDetails';
// import EditBlog from './pages/EditBlog';
import Login from './pages/Login';
import AuthNavbar from './pages/AuthNavbar';
import React, { 
  useEffect, 
  useState, 
  useRef 
} from 'react';
import useAxios from "./api/UseAxios";
import Registration from './pages/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Dashboard from './pages/Dashboard';
import Comment from './pages/Comment';

//axios interceptor example
// import axios from './api/AxiosInstance';

// axios.interceptors.request.use((request)=>{
//   request.headers.Authorization = 'Jwt_Authorization_Token';

//   return request;
// })

// axios.interceptors.response.use((response)=>{
//   console.log(response);
//   return response;
// })



export const BlogContext = React.createContext();


 function App() {

  const [navSearchVar, setNavSearchVar] = useState('');
  // const [username, setUsername] = useState(null);

function handleNavSearch(targetValue) {
   setNavSearchVar(targetValue);
   console.log('appjs search bar', navSearchVar)
}




  const [accessToken, setAccessToken] = useState(null)
  function setToken(){
    const token = JSON.parse(localStorage.getItem('accessToken'));
  setAccessToken(token)
  
  // console.log('set token function: ', token, accessToken)
  }

  useEffect(()=>{
    setToken()
  }, [accessToken])
  
  const {data:blogs, loading, error, status} = useAxios('/blogs', accessToken);
  
  function MainApplication(){
    return(
      <>
      <Navbar onChange={handleNavSearch} value={navSearchVar}>
        <Routes>
             <Route index element={<Home />} />
             <Route path="/dashboard/*" element={<BlogDashboard />} />
             <Route path="/comment" element={<Comment />} />
             <Route path="/create" element={<Create />} />
             <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </Navbar>
      </>
    );
  }
  
  function RegLog(){
    return(
      <>
      <AuthNavbar>
        <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/registration" element={<Registration />} />
        </Routes>
      </AuthNavbar>
      </>
    )
  }
  
  
  function BlogDashboard(){
    return(
      <>
      
        <Routes>
        <Route index element={<Dashboard query={navSearchVar} />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      
      </>
    )
  }

  return (
    <div className="App">
    <BlogContext.Provider value={{blogs, loading, error, status}}>
   
   
    
      <Routes>
        
       <Route path="/">
           <Route path="main/*" element={<MainApplication />}/>
           <Route path="auth/*" element={<RegLog />}/>
        </Route>
       
      </Routes>
      
      
    
    </BlogContext.Provider>
                    
    </div>
  );
}




export default App;
