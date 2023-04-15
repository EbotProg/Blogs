import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../api/AxiosInstance';



const EditBlog = () => {
    let { id } = useParams();
    let [title, setTitle] = useState();
    let [body, setBody] = useState();
    let [author, setAuthor] = useState();
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(false);
    

    useEffect(()=>{

        axios.get(`/blogs/${id}`)
        .then((res)=>{
            console.log(res);
                  console.log(res.data);
                    setTitle(res.data.title);
                    setBody(res.data.body);
                    setAuthor(res.data.author);
                    setLoading(false);
                    setError(false);
        }).catch(err=>{
            if(err.name === 'AbortError'){
               console.log('fetch aborted')
            }
            else{
                              console.log('err message',err.message);
                              setLoading(false);
                              setError(err.message);
                          }
        })
    }, [id])

       




    
    let navigate = useNavigate();
    
    

    //run this when save changes btn is clicked
   function editBlog(e){
    e.preventDefault();

    axios.put(`/blogs/${id}`, {title, body, author})
        .then(()=>{
            console.log('blog editted');
            navigate(`/blogs/${id}`);
        })
    
   }
    

    return ( 
        
            <div className="form-content">
            <h2 className="form-title">Edit Blog</h2>
            {error && <p> {error} </p>}
            {loading && 
            <div className="skeleton-container w-100 p-inline-2">
                <div className="skeleton-text-container">
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text h-1"></div>
                </div>
                <div className="skeleton-text-container">
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text h-10"></div>
                </div>
                <div className="skeleton-text-container">
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text h-1"></div>
                </div>
                <div className="skeleton-text-container">
                <div className="skeleton skeleton-text"></div>
                </div>
                
            </div>
            }
            {!loading && 
              <form>
            
              <div className="form-input-div">
              <label htmlFor="">Title: </label>
              <input 
              
              type="text"
              value={title}
              onChange={(e)=> setTitle(e.target.value) } />
              </div>
              <div className="form-input-div">
              <label htmlFor="">Body: </label>
              <textarea 
              cols="30" 
              rows="5"
              value={body}
              onChange={(e)=> setBody(e.target.value) }></textarea>
              </div>
              <div className="form-input-div">
                  <label htmlFor="">Author: </label>
                  <input type="text"
                  value={author}
                  onChange={(e)=> setAuthor(e.target.value) } />
              </div>
              <div className="form-input-div form-btn-div">
                  <button className="edit-blog-btn btn" onClick={editBlog}>Save changes</button>
              </div>

          </form>
            }
      
            
        </div>
       
        
     );
}
 
export default EditBlog;