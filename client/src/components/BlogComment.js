import { useState, useEffect } from "react";
import axios from "api/AxiosInstance";
import useAxios from "api/UseAxios";
import { Avatar } from "@mui/material";

const BlogComment = ({blogId, blogOwner}) => {

    const [comment, setComment] = useState('');
    const [commentIsEmpty, setCommentIsEmpty] = useState(true);
    // const [canComment, setCanComment] = useState('true');
    const username = JSON.parse(localStorage.getItem('user'));
    const {data:comments, loading:commentLoading} = useAxios(`/get-comments-by-blog/${blogId}`, username)
    // const [commentsArr, setCommentsArr] = useState(null);
    const {data:users, loading:userLoading} = useAxios('/users', username)


    // useEffect(()=>{
    //     if(blogOwner === username) setCanComment(false);

    // }, [canComment])


    // useEffect(()=>{
    //     console.log('comments', comments, commentsArr);
    //     let commentsIsEmpty = comments == null
    //     if(commentsIsEmpty == false){
    //         let arr = [...comments];
    //         setCommentsArr(arr)
    //         console.log('comments not null', comments, commentsArr);

    //     }
        
    // }, [commentsArr])

    useEffect(()=>{
        if(comment.length > 0) setCommentIsEmpty(false);
        else if(comment.length === 0) setCommentIsEmpty(true);
        console.log('blogcomment.js', username, comment, blogId, blogOwner === username)
    }, [comment])

   async function handleCommentSubmit(){

        let formData = new FormData();
        formData.append('comment', comment)
        formData.append('commenter', username)
        formData.append('blogId', blogId)
        await axios.post('/post-comment', {comment, commenter: username, blogId: blogId},{
            headers:{ "content-type": "application/x-www-form-urlencoded" }
        })
    }

    return ( 
        <div className="comment w-100">
            <h2 className="text-center py-2">Comments</h2>
           <div className='send-comment w-100'>
            <form className='w-100'>
            <div className="form-floating mb-3 w-100">
                                <textarea
                                value={comment}
                                onChange={(e)=> setComment(e.target.value)}
                                className='form-control' id="comment" type="text" placeholder="Enter your message here..." style={{height: '10rem'}} ></textarea>
                                <label htmlFor="comment">Comment</label>
                                <div className="invalid-feedback">A message is required.</div>
                            </div>
                            <button type="button" onClick={handleCommentSubmit} className={commentIsEmpty? 'send-comment-btn btn btn-primary disabled': 'send-comment-btn btn btn-primary'}>Post comment</button>
            </form>
           </div>
            <hr className='border w-100' />
           <div className="view-comments">
           {commentLoading && <div className="blog-comment placeholder-glow">

 <Avatar 
 alt='...'
 src='...'
 sx={{width: 37, height: 37}}
 className="commenter-avatar placeholder bg-secondary"
/>

<div className="comment-block placeholder-glow">

<div className="commenter-name placeholder bg-secondary"></div>
<div className="comment-block-comment placeholder bg-secondary"></div>
</div>

</div>}
            {comments && comments.length === 0 && <p className="font-italic fs-3 text-secondary">No Comments</p>}
           {comments && [...comments].reverse().map((item, index, arr)=>{
            return(
<div className="blog-comment">

            {/* {comments.length === 0 && <p className="font-italics">No Comments</p>} */}
            {users && users.map((user, index, arr)=>{
             if(user.username === item.commenter){
                return(
                    <>
             <Avatar 
             alt={item.commenter}
             src={user.profilePicPath}
             sx={{width: 37, height: 37}}
             className="commenter-avatar"
            />
            </>
                )
             }
            })}
            
    
       
            <div className="comment-block">

            <div className="commenter-name">{item.commenter}</div>
            <div className="comment-block-comment">{item.comment}</div>
            </div>
            
           </div>
            )
           })}
           
           
           </div>
        </div>
     );
}
 
export default BlogComment;