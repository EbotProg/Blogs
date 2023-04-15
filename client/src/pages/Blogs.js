import { Link } from 'react-router-dom';
import { BlogContext } from '../App';
import React from 'react';
import { useContext } from 'react';
import {FaUserAlt} from 'react-icons/fa';



const Blogs = () => {
  
    let { blogs } = useContext(BlogContext); 

    

    return ( 
        <div className="blogs">
            {[...blogs].reverse().map(blog=>{
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
                
                
            </div>
     );
}
 
export default Blogs;