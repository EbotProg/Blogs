import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { GoKebabVertical } from 'react-icons/go'
import React, { useContext, useState, useEffect } from 'react';
import { BlogContext } from '../App';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/AxiosInstance';
import parse from 'html-react-parser';
import { Avatar } from '@mui/material';
import useAxios from 'api/UseAxios';
import BlogComment from 'components/BlogComment';
import { GrFormClose } from 'react-icons/gr';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
// import { RWebShare } from "react-web-share";
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    PinterestShareButton,
    PinterestIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon	
  } from "react-share";

const BlogDetails = () => {
    let {id} = useParams();
    const [accessToken, setAccessToken] = useState(JSON.parse(localStorage.getItem('accessToken')))
    // const {blogs, loading, error} = useContext(BlogContext);
    const {data:blog, loading, error} = useAxios(`/blogs/${id}`, accessToken)
    let navigate = useNavigate();
    const [loadedImage, setLoadedImage] = useState(null);
    const [deleteEditBtnsShown, setDeleteEditBtnsShown] = useState(false);
    // const [deleteAlertCloseBtnClicked, setDeleteAlertCloseBtnClicked] = useState(false);
    const [showAlertDiv, setShowAlertDiv] = useState(false);
    const [makeBlogBlur, setMakeBlogBlur] = useState(false);
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem('user')));
    console.log('blog blogdetailsjs', blog, id);

    async function getArrayBuffer(url){
     if(loadedImage !== null) return;
        setLoadedImage(await (await fetch(url)).arrayBuffer()); 
    }
    
    const {data:users, loading:userLoading} = useAxios('/users')

    function handleDelete(id){
        axios.delete(`/delete-blog/${id}`)
        .then(()=>{
            console.log('blog deleted');
         navigate('/main/dashboard');
        })
    }

    function editBlog(){
        navigate('/edit/'+id);
    }



    //handle like and disilike blog functionality

    function handleLikeDislike(btn){
        let l_arr = [...blog.likesArr];
        let d_arr = [...blog.dislikesArr];
        let likes = blog.likes;
        let dislikes = blog.dislikes;
    console.log('likes and dislikes array', l_arr.length === 0, d_arr.length === 0);

if(btn === 'likeBtn'){
      console.log('like btn clicked username, likesArr', username, l_arr, l_arr.includes(username));

      //edit likes when the arrays are empty
      if(l_arr.length === 0 && d_arr.length === 0){
        console.log('no likes yet for this blog')
        l_arr.push(username);
        likes = l_arr.length;
        dislikes = d_arr.length;
        return axios.post(`/edit-likes-and-dislikes/${id}`, {likesArr: l_arr, dislikesArr: d_arr, likes, dislikes})
      } 
      
    //   //check if username is found in likes arr
      else if(l_arr.includes(username)) return;
      //check username not found in likes arr
      else if(l_arr.includes(username) === false){
        console.log('user has already liked blog'); 
        
            
                if(d_arr.find((item)=> item === username) !== undefined){
                    let val = d_arr.find((item)=> item === username);
                    d_arr.forEach((element, index, arr) => {
                        if(element === val){
                        d_arr.splice(index, 1);
                        }     
                    });
    
                }
       
        l_arr.push(username);
        likes = l_arr.length;
        dislikes = d_arr.length;    
    
            
        return axios.post(`/edit-likes-and-dislikes/${id}`, {likesArr: l_arr, dislikesArr: d_arr, likes, dislikes})

      } 
    //   //check if user has already disliked blog
    //   else if(blog.dislikeArr.includes(username)){
    //     console.log('user has already disliked blog');
    //     return axios.post('/edit-likes-and-dislikes', {likesArr: l_arr, dislikesArr: d_arr, likes, dislikes})
    //   } 
      
    //   //then user has neither disliked nor liked blog
    //   console.log('user has neither disliked nor liked blog')
    
    //   return axios.post('/edit-likes-and-dislikes', {likesArr: l_arr, dislikesArr: d_arr, likes, dislikes});

}


else if(btn === 'dislikeBtn'){
            console.log('dislike btn clicked');

            //edit likes when the arrays are empty
      if(l_arr.length === 0 && d_arr.length === 0){
        console.log('no dislikes yet for this blog')
        d_arr.push(username);
        dislikes = d_arr.length;
        likes = l_arr.length;
        return axios.post(`/edit-likes-and-dislikes/${id}`, {likesArr: l_arr, dislikesArr: d_arr, likes, dislikes})
      }



          //   //check if username is found in dislikes arr
          else if(d_arr.includes(username)) return;
          //check username not found in dislikes arr
          else if(d_arr.includes(username) === false){
            console.log('user has already disliked blog'); 
            
                
                    if(l_arr.find((item)=> item === username) !== undefined){
                        let val = l_arr.find((item)=> item === username);
                        console.log('val blogdetails', val);
                        l_arr.forEach((element, index, arr) => {
                            if(element === val){
                            l_arr.splice(index, 1);
                            }     
                        });
        
                    }
           
            d_arr.push(username);
            dislikes = d_arr.length;
            likes = l_arr.length;                    
        
                
            return axios.post(`/edit-likes-and-dislikes/${id}`, {likesArr: l_arr, dislikesArr: d_arr, likes, dislikes})
    
          }


        }

    console.log('like or dislike btn clicked')



    }


    //function to show the delete and edit btns if clicked

    function handleShowEditDeleteBtns(){
      setDeleteEditBtnsShown(current=>!current);
    }

    //function to hide blog menu when any part of the blog is clicked
    function handleHideBlogMenu(){
      setDeleteEditBtnsShown(false);
    }

   //function to close delete alert div
   function handleCloseDeleteAlertDiv() {
    setShowAlertDiv(false);
    setMakeBlogBlur(false);
   }

  //function to show the delete alert div
  function handleShowAlertDiv() {
    setShowAlertDiv(true);
    setMakeBlogBlur(true);
  }


    return ( 
           
            
                            
          <>
          {loading && <div className="mb-5 w-100 h-100 d-flex flex-column align-items-center justify-content-center">

<div className="blog-details col-11 col-sm-10 col-md-9 col-lg-7 col-xl-6 placeholder-glow">

<div className="blog-details-header placeholder-glow">
    <img className="blog-details-header-image shadow-sm placeholder bg-secondary" src='...' alt="..." />
 <div className='title w-100'>
 <h5 className="placeholder bg-secondary title-line-1-placeholder rounded"></h5>
    <h5 className="placeholder bg-secondary title-line-2-placeholder rounded"></h5>
 
 </div>
 
    <div className="blog-details-header-other-info placeholder-glow">
      
      <Avatar 
       alt="..."
       src="..."
       sx={{width: 44, height: 44}}
       className="blog-avatar placeholder bg-secondary"
       /> 


        <div className='placeholder-glow w-100 h-100 d-flex flex-column row gy-2 gx-2'>
        <div className="blog-details-author placeholder bg-secondary col-2 h-100 rounded"></div>
        <div className="blog-details-date placeholder bg-secondary col-2 h-100 rounded"></div>
        </div>
        
    </div>
</div>
<div className="blog-details-content w-100 h-100">

<div className="col-12 placeholder bg-secondary rounded"></div>
<div className="col-12 placeholder bg-secondary rounded"></div>

<div className="col-11 placeholder bg-secondary rounded"></div>
<div className="col-11 placeholder bg-secondary rounded"></div>

<div className="col-10 placeholder bg-secondary rounded"></div>
<div className="col-10 placeholder bg-secondary rounded"></div>

<div className="col-9 placeholder bg-secondary rounded"></div>
<div className="col-9 placeholder bg-secondary rounded"></div>

<div className="col-8 placeholder bg-secondary rounded"></div>

<div className="col-7 placeholder bg-secondary rounded"></div>

<div className="col-6 placeholder bg-secondary rounded"></div>

</div>
</div>
</div>}

              {
                
                blog && 
                // blogs.map(blog=>{
                //         if(blog._id == id) {

                //         return (
                            <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">

                            <div className={makeBlogBlur? 'blog-details col-11 col-sm-10 col-md-9 col-lg-7 col-xl-6 blog-details-blur': 'blog-details col-11 col-sm-10 col-md-9 col-lg-7 col-xl-6'}>
                  
                            <div className="blog-details-header">
                                <img onClick={handleHideBlogMenu} className="blog-details-header-image shadow-sm" src={`${blog.mainPhotoPath}/${blog.mainPhotoName}`} alt="" />
                                <h1 onClick={handleHideBlogMenu} className="blog-details-header-title">{blog.title}</h1>
                                <div className="blog-details-header-other-info placeholder-glow">
                                    {/* <img className="blog-details-author-image" src={blog.} alt="" /> */}
                                    {
                                        !users &&  <Avatar 
                                        alt='...'
                                        src='...'
                                        sx={{width: 44, height: 44}}
                                        className="blog-avatar placeholder bg-secondary"
                                        /> 
                                    }
                                    
                                    {
                        users && users.map((user, index, arr)=>{
                        if(user.username === blog.author){
                            getArrayBuffer(user.profilePicPath);
                            return(
                                <>
                       {loadedImage === null && <Avatar 
                        alt='...'
                        src='...'
                        sx={{width: 44, height: 44}}
                        className="blog-avatar placeholder bg-secondary"
                        />} 
                       {loadedImage && <Avatar 
                        alt={user.username}
                        src={user.profilePicPath}
                        sx={{width: 44, height: 44}}
                        className="blog-avatar"
                        onClick={handleHideBlogMenu}
                        />}
           
                                </>
                            )
                        }
                        
                        }) 
                        // <img className='user-image-img' src={user.result.profilePicPath} alt="" />
                       
                        

                    }
                                    <div onClick={handleHideBlogMenu} className="blog-details-author-date">
                                    <div className="blog-details-author">{blog.author === username ? 'You': blog.author}</div>
                                    <div className="blog-details-date">{blog.createdDashDate}</div>
                                    </div>

                                    <div className="blog-menu-div">
                                      
                            <GoKebabVertical onClick={handleShowEditDeleteBtns} className="blog-menu md-icon" />
                            <div className={deleteEditBtnsShown ? 'blog-menu-content shadow':"d-none"}>
                             
                     

                              <div onClick={handleShowAlertDiv} className={username === blog.author? 'delete-btn-div delete-edit-div': 'delete-btn-div delete-edit-div disabledDiv'}>
                              <MdDelete className="blog-delete-btn md-icon" />
                              Delete
                              </div>

                              <div className={username === blog.author? 'edit-btn-div delete-edit-div': 'edit-btn-div delete-edit-div disabledDiv'}>
                              <BiEdit className="blog-edit-btn md-icon" />
                              Edit
                              </div>

                            </div>
                            
                                    </div>
                                </div>
                            </div>
                            <div onClick={handleHideBlogMenu} className="blog-details-content">
                                {parse(blog.content)}
                            </div>
                            <div className="like-dislike-btns-div">

                            <button 
                            onClick={()=> handleLikeDislike('likeBtn')}
                            className="like-btn like-dislike-btn">
                                
                                <div className="like-dislike-icon-and-txt">
                                <div className='like-dislike-txt like-txt'>Like</div>
                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                </svg>
      
                                </div>
                                
                                  

                                <div className='likes-dislikes likes'>{blog.likes}</div>

                                </button>


                                <button
                                onClick={()=> handleLikeDislike('dislikeBtn')} 
                                className='dislike-btn like-dislike-btn'>
                                 
                                <div className="like-dislike-icon-and-txt">
                                    
                                <div className='like-dislike-txt dislike-txt'>Dislike</div>
                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
  <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
</svg>

                                    </div>
                                 
 <div className='likes-dislikes dislikes'>{blog.dislikes}</div>
                                </button>


                                
{/* 
                                <RWebShare
        data={{
          url: `https://localhost:3000/main/blogs/${blog._id}`,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button className="share-btn like-dislike-btn share-btn">Share
                                <svg className="xl-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
</svg>
        </button>
         <button>Share 🔗</button> 
      </RWebShare> */}


                            </div>
                            
                            
                            
                            <div className="share-blog-via d-flex flex-row">
                            <p>Share blog via :</p>
                             <FacebookShareButton url={`http://localhost:3000/main/blogs/${blog._id}`}>
                                <FacebookIcon size={40} />
                             </FacebookShareButton>
                             
                             <WhatsappShareButton separator={' '} title={blog.title} url={`http://localhost:3000/main/blogs/${blog._id}`}>
                                <WhatsappIcon size={40} />
                             </WhatsappShareButton>
                             
                             <TwitterShareButton title={blog.title} url={`http://localhost:3000/main/blogs/${blog._id}`}>
                                <TwitterIcon size={40} />
                             </TwitterShareButton>
                             
                             <TelegramShareButton  title={blog.title} url={`http://localhost:3000/main/blogs/${blog._id}`}>
                                <TelegramIcon size={40} />
                             </TelegramShareButton>
                             
                             
                             <LinkedinShareButton separator={' '} title={blog.title} url={`http://localhost:3000/main/blogs/${blog._id}`}>
                                <LinkedinIcon size={40} />
                             </LinkedinShareButton>
                             
                             <EmailShareButton separator={' ----- '} body={`Hello there! This blog was sent to you from ${username}`} subject={`Blogz: ${blog.title}`} url={`http://localhost:3000/main/blogs/${blog._id}`}>
                                <EmailIcon size={40} />
                             </EmailShareButton>

                            </div>


                            <div className="bottom-blog-details w-100 px-3">
                            {/* <hr className='border w-100' /> */}
                            <BlogComment className="w-100 h-100" blogId={id} blogOwner={blog.author}/>
                            </div>
                            
                            </div>

                            <div className={showAlertDiv? 'delete-alert-div shadow': 'd-none'}>
                              
                              <div className="delete-alert-div-top">
                              <BsFillExclamationTriangleFill className="sm-icon delete-alert-div-icon" />
                              <div className="delete-alert-div-title fs-3">Delete Blog</div>
                              <GrFormClose onClick={handleCloseDeleteAlertDiv} className="delete-alert-close-btn md-icon" />
                              </div>
                              
                              <p className="delete-alert-content">Are you sure you want to delete this blog?</p>
                      
                              <div className="delete-alert-btn-div">
                                <button onClick={()=> handleDelete(id)} className="btn btn-danger delete-alert-btn btn-sm yes-btn">yes</button>
                                <button onClick={handleCloseDeleteAlertDiv} className="btn btn-outline-secondary btn-sm delete-alert-btn no-btn">no</button>
                                </div>                             

                            </div>
              </div>
                    //         )
                    //     }
                    //     })
                    }
                
    
    </>
                
                    
                
            
            
            
            
            
        
     );
}
 
export default BlogDetails;