import { Link } from 'react-router-dom';
import { BlogContext } from '../App';
import React from 'react';
import { useContext } from 'react';
import {FaUserAlt} from 'react-icons/fa';

const displayBlogPlaceHolders = () => {
    for(let i = 0; i <= 6; i++) {
        return (
            <div className="dashcard-placeholder text-wrap col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3 placeholder-glow">
                <div className="dashcard-category placeholder bg-secondary w-25 rounded"></div>
                <div className="dashcard-img-div placeholder bg-secondary rounded"><img className="dashcard-img shadow-sm" src='...' alt="" /></div>
                <div className="dashcard-title placeholder bg-secondary w-75"></div>
                <div className="bottom-dashcard placeholder bg-secondary w-75"></div>
            </div>
        )
    }
}

const displayBlogs = ({blogs}) => {

   [...blogs].reverse().map(blog=>{
                            return(
                                <>
                                <Link className="blog" key={blog.id} to={`/blogs/${blog.id}`}>
                                    <div className="blog-img"><FaUserAlt className="blog-img-icon"/></div>
                                    <div className="blog-content">
                                    <h3 className="blog-title">{ blog.title }</h3>
                                    <p className="blog-author">written by { blog.author }</p>
                                    </div>
                                
                                </Link>
                                </> 
                            );
         
                        })
    
}

const Blogs = () => {
  
    let { blogs, loading } = useContext(BlogContext); 

    

    // return ( 
    //     <div className="blogs">
    //         {[...blogs].reverse().map(blog=>{
    //                 return(
    //                     <>
    //                     <Link className="blog" key={blog.id} to={`/blogs/${blog.id}`}>
    //                         <div className="blog-img"><FaUserAlt className="blog-img-icon"/></div>
    //                         <div className="blog-content">
    //                         <h3 className="blog-title">{ blog.title }</h3>
    //                         <p className="blog-author">written by { blog.author }</p>
    //                         </div>
                        
    //                     </Link>
    //                     </> 
    //                 );
 
    //             })
              
    //         }
                
                
    //         </div>
    //  );
     return (
        <div className="container-fluid px-2">
        <div className="dashcards d-flex flex-row justify-content-center row gy-4 gx-5">
            { 
              loading &&  displayBlogPlaceHolders
            }

            {
                !loading && !blogs && <p>No Blogs</p>
            }
                
            {
                !loading && blogs && displayBlogs({blogs})
            }  
        </div>
        </div>
     )
}


 
export default Blogs;