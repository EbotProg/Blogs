// import  Masonry from 'react-masonry-css'; 
import CategoryScroll from '../components/CategoryScroll';
import {RxDot} from 'react-icons/rx';
import { AiOutlineHeart } from 'react-icons/ai';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Tooltip from 'react-bootstrap/esm/Tooltip';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { BlogContext } from 'App';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';



const Dashboard = ({query}) => {

    let { blogs, error, status } = useContext(BlogContext); 
    let [blogTimeArr, setBlogTimeArr] = useState(null);
    let [middleBlogsArr, setMiddleBlogsArr] = useState(null);
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem('user')));

    const navigate = useNavigate();
    
   
    let obj = {value: false}

    
    useEffect(()=>{
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    
    if(accessToken === null) navigate('/auth/login');
    let decodedToken = jwt_decode(accessToken);
    let currentDate = new Date();
    if(decodedToken.exp *1000 < currentDate.getTime()) navigate('/auth/login');
    // console.log('dashboard check token', accessToken)
    }, [])

    function getBlogs(){
        // console.log('get blogs is running')
        // console.log('obj', obj.value);
        let blogsIsEmpty = blogs == null;
        if(blogsIsEmpty == false){
            // console.log('blog null', blogsIsEmpty)
           if(obj.value === false){
               let arr = [...blogs]

            arr.forEach((blog, index, arr)=>{
                let presentDate = new Date();

            arr[index].time = getTimeFromBlogCreation(blog.year, blog.month, blog.day, blog.hours, blog.minutes, blog.seconds, blog.milliseconds, presentDate);
            categSearch();
            generalSearch();
        })    
               setMiddleBlogsArr(arr);
               obj.value = true;
            //    console.log('middle arr has been changed');
            //    console.log('middle arr', middleBlogsArr)
           }
           
        }else if(obj.value === true){
         console.log('middle arr has not been changed')
        }

    }

    useEffect(()=>{
        getBlogs();

    }, [middleBlogsArr])


    //function to search for blogs using the search bar
    function generalSearch(){
        let arr = [...blogs];
        let arrNew = [];
        // let arrLength = {value: arr.length};
        console.log('arr dashboard', arr)
        //check title, category and author
    
        //for title
        if(query.length === 0){
            return;
        }
    
        arr.forEach((blog, index, arr)=>{
        if(blog.title.toLowerCase().includes(query.toLowerCase())){
            
            if(arrNew.length === 0) arrNew.push(blog);
            else if(arrNew.find((newBlog)=> blog._id === newBlog._id) === undefined) arrNew.push(blog);
            
            
            // arr.splice(index, 1);
            // arrLength.value = arrLength.value - 1;
            // console.log('arr dashboard', arr)
        // console.log('dashboard check title blog and index', blog, index, query)
        }
    })
    
    arr.forEach((blog, index, arr)=>{
    
        if(blog.category.toLowerCase().includes(query.toLowerCase())){
               
            if(arrNew.length === 0) arrNew.push(blog);
            else if(arrNew.find((newBlog)=> blog._id === newBlog._id) === undefined) arrNew.push(blog);

                // arr.splice(index, 1);
                // arrLength.value = arrLength.value - 1;
                // console.log('arr dashboard', arr)
                // console.log('dashboard check categ blog and index', blog, index, query)
            }
    })
    

    arr.forEach((blog, index, arr)=>{

                console.log('arr dashboard', arr)
            if(blog.author.toLowerCase().includes(query.toLowerCase())){
                
                if(arrNew.length === 0) arrNew.push(blog);
                else if(arrNew.find((newBlog)=> blog._id === newBlog._id) === undefined) arrNew.push(blog);

                // arr.splice(i, 1);
                // console.log('dashboard check author blog and index', arr, i, query, arr[i].author.toLowerCase().includes(query.toLowerCase()))
            }
            // console.log('dashbard check author', arr[i], arrLength.value, arr.length)
            // console.log(1 ,'arrNew and old arr dashboard', arrNew, arr,);

        })
    
        
        console.log(1 ,'arrNew and old arr dashboard', arrNew, arr);
        setBlogTimeArr(arrNew);
    }
        

   

    

    //states of all categ buttons
   let [categStates, setCategStates] = useState([
    {all: true},
   {food: false},
   {news: false},
    {business: false},
    {technology: false},
    {sport: false},
    {celebrity: false},
    {science: false},
    {entertainment: false},
    {style: false},
    {travel: false},
    {agriculture: false}
])


   function categSearch(){
    // console.log('categ search is running')
    let arr = [...categStates];
    let newBlogsArr = [];
    for(let i in arr){
        for(let propName in arr[i]){
          
            if(arr[i][propName] === true){

               if(propName === 'all'){
                // console.log('propname', propName);
                 blogs.map((blog, index, arr)=>{
                    newBlogsArr.push(blog)
                 })
                //  console.log('all was clicked');
                 setBlogTimeArr(newBlogsArr);
                //  console.log('new blogtimearr ', blogTimeArr);
                 return;
               }
            
               else if(propName !== 'all'){

                
                // newBlogsArr = middleBlogsArr.filter((blog, index, arr)=>blog.category === propName)
               
               
                // console.log('propName', propName);
                // console.log('new blogs arr',newBlogsArr)


                //get blogs whose category is equal to propname
                middleBlogsArr.forEach((blog, index, arr)=>{
                    if(blog.category.toLowerCase() === propName.toLowerCase()){
                        newBlogsArr.push(blog);
                         
                    }
                })

                setBlogTimeArr(newBlogsArr);
                // console.log('new blogtimearr ', blogTimeArr);
                return;
        }
            }
            
      
    }

   }


}



   function handleCategChange(indexCateg, categName){
    // console.log('handle change is running')
    let arr = [...categStates];
    if(arr[indexCateg][categName] === true){
        arr[indexCateg][categName] = false;
        arr[0]['all'] = true;
    }else{
        arr[indexCateg][categName] = true;
        
            for(let i in arr){
                for(let propName in arr[i]){

                if(propName !== categName){
                    arr[i][propName] = false;
                }
            }
            
        }

    }
     setCategStates(arr);
    //  console.log(categStates)
   }

       

        //     setInterval(() => {
        //         console.log('set interval is running')
        //    let arr1 = [...middleBlogsArr];
        //    arr1.forEach((blog, index, arr)=>{
        //     let presentDate = new Date();
            
        //     arr1[index].time = getTimeFromBlogCreation(blog.year, blog.month, blog.day, blog.hours, blog.minutes, blog.seconds, blog.milliseconds, presentDate);
            
            
        //    })
        //     setBlogTimeArr(arr1);
            

        // }, 6000)

        
    

   

    //get how much time has passed since blog was posted

    function getNumOfYears(time){
        return Math.floor(time / (1000 * 60 * 60 * 24 * 7 * 30 * 12))

    }

    function getNumOfMonths(time){
        return Math.floor(time / (1000 * 60 * 60 * 24 * 7 * 30))
    
    }

    function getNumOfWeeks(time){
        return Math.floor(time / (1000 * 60 * 60 * 24 * 7))
        
    }

    function getNumOfDays(time){
        return Math.floor(time / (1000 * 60 * 60 * 24))
       
    }

    function getNumOfHours(time){
        return Math.floor(time / (1000 * 60 * 60))
       
    }

    function getNumOfMinutes(time){
        return Math.floor(time / (1000 * 60))
        
    }

    function getNumOfSeconds(time){
        return Math.floor(time / (1000))
        
    }

    function getNumOfMilliseconds(time){
        return time;
    }


    function getTimeFromBlogCreation(postYear, postMonthIndex, postDay, postHours, postMinutes, postSeconds, postMilliseconds, currentDate) {
        let postDate = new Date(postYear, postMonthIndex, postDay, postHours, postMinutes, postSeconds, postMilliseconds);
        let currDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds(), Math.ceil(currentDate.getMilliseconds()/10) );
         let difference = Math.abs(postDate.getTime() - currDate.getTime());
        


        let years = getNumOfYears(difference);
        let months = getNumOfMonths(difference);
        let weeks = getNumOfWeeks(difference);
        let days = getNumOfDays(difference);
        let hours = getNumOfHours(difference);
        let minutes = getNumOfMinutes(difference);
        let seconds = getNumOfSeconds(difference);
        let milliseconds = getNumOfMilliseconds(difference);

        
        
        
        
        if(milliseconds < 60000){
        return 'now';
        }
        else if(seconds >= 1 && seconds < 60){
         
            if(seconds === 1){
               
                return '1 second ago'; 
            }
        
            
            return `${seconds} seconds ago`; 
        }else if(minutes >= 1 && minutes < 60){
        
            if(minutes === 1){
                
                return '1 minute ago'; 
            }
        
            
            return `${minutes} minutes ago`; 
        }else if(hours >= 1 && hours < 24){
        
            if(hours === 1){
               
                return '1 hour ago'; 
            }
        
            
            return `${hours} hours ago`; 
        }else if(days >= 1 && days < 7){
        
            if(days === 1){
                
                return '1 day ago'; 
            }
        
            
            return `${days} days ago`; 
        }else if(weeks>= 1 && weeks < 4){
        
            if(weeks === 1){
                
                return '1 week ago'; 
            }
        
            
            return `${weeks} weeks ago`; 
        }else if(months>= 1 && months < 12){
        
            if(months === 1){
                
                return '1 month ago'; 
            }
        
           
            return `${months} months ago`; 
        }else if(years >= 1){
        
            if(years === 1){
                
                return '1 year ago';
            }
            return `${years} years ago`;         
        }
    }
 





    

    return ( 
        <div className="page dashboard">

            <CategoryScroll className="category-scroll" categSearch={categSearch} handleCategChange={handleCategChange} categStates={categStates} />
            
            <button onClick={()=>{ navigate('/main/create')}} className='create-blog-btn create-blog-dash-btn-sm'><AiOutlinePlus/>New Blog</button>

            

                {/* <Masonry 
                breakpointCols={breakpointColumnsObj} 
                className="my-masonry-grid "
                columnClassName="my-masonry-grid_column dashcards"
                > */}

{!blogTimeArr && 
                <div className="container-fluid px-2">
                <div className="dashcards d-flex flex-row justify-content-center row gy-4 gx-5">

                        <div className="dashcard-placeholder text-wrap col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3 placeholder-glow">
                        
                    <div className="dashcard-category placeholder bg-secondary w-25 rounded"></div>
                    
                    <div className="dashcard-img-div placeholder bg-secondary rounded"><img className="dashcard-img shadow-sm" src='...' alt="" /></div>
                    <div className="dashcard-title placeholder bg-secondary w-75"></div>
                    <div className="bottom-dashcard placeholder bg-secondary w-75"></div>
                        </div>


                        <div className="dashcard-placeholder text-wrap col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3 placeholder-glow">
                        
                    <div className="dashcard-category placeholder bg-secondary w-25 rounded"></div>
                    
                    <div className="dashcard-img-div placeholder bg-secondary rounded"><img className="dashcard-img shadow-sm" src='...' alt="" /></div>
                    <div className="dashcard-title placeholder bg-secondary w-75"></div>
                    <div className="bottom-dashcard placeholder bg-secondary w-75"></div>
                        </div>

                        
                        <div className="dashcard-placeholder text-wrap col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3 placeholder-glow">
                        
                    <div className="dashcard-category placeholder bg-secondary w-25 rounded"></div>
                    
                    <div className="dashcard-img-div placeholder bg-secondary rounded"><img className="dashcard-img shadow-sm" src='...' alt="" /></div>
                    <div className="dashcard-title placeholder bg-secondary w-75"></div>
                    <div className="bottom-dashcard placeholder bg-secondary w-75"></div>
                        </div>


                        <div className="dashcard-placeholder text-wrap col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3 placeholder-glow">
                        
                    <div className="dashcard-category placeholder bg-secondary w-25 rounded"></div>
                    
                    <div className="dashcard-img-div placeholder bg-secondary rounded"><img className="dashcard-img shadow-sm" src='...' alt="" /></div>
                    <div className="dashcard-title placeholder bg-secondary w-75"></div>
                    <div className="bottom-dashcard placeholder bg-secondary w-75"></div>
                        </div>


                        <div className="dashcard-placeholder text-wrap col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3 placeholder-glow">
                        
                    <div className="dashcard-category placeholder bg-secondary w-25 rounded"></div>
                    
                    <div className="dashcard-img-div placeholder bg-secondary rounded"><img className="dashcard-img shadow-sm" src='...' alt="" /></div>
                    <div className="dashcard-title placeholder bg-secondary w-75"></div>
                    <div className="bottom-dashcard placeholder bg-secondary w-75"></div>
                        </div>


                        <div className="dashcard-placeholder text-wrap col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3 placeholder-glow">
                        
                    <div className="dashcard-category placeholder bg-secondary w-25 rounded"></div>
                    
                    <div className="dashcard-img-div placeholder bg-secondary rounded"><img className="dashcard-img shadow-sm" src='...' alt="" /></div>
                    <div className="dashcard-title placeholder bg-secondary w-75"></div>
                    <div className="bottom-dashcard placeholder bg-secondary w-75"></div>
                        </div>


                        <div className="dashcard-placeholder text-wrap col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3 placeholder-glow">
                        
                    <div className="dashcard-category placeholder bg-secondary w-25 rounded"></div>
                    
                    <div className="dashcard-img-div placeholder bg-secondary rounded"><img className="dashcard-img shadow-sm" src='...' alt="" /></div>
                    <div className="dashcard-title placeholder bg-secondary w-75"></div>
                    <div className="bottom-dashcard placeholder bg-secondary w-75"></div>
                        </div>


                        <div className="dashcard-placeholder text-wrap col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3 placeholder-glow">
                        
                    <div className="dashcard-category placeholder bg-secondary w-25 rounded"></div>
                    
                    <div className="dashcard-img-div placeholder bg-secondary rounded"><img className="dashcard-img shadow-sm" src='...' alt="" /></div>
                    <div className="dashcard-title placeholder bg-secondary w-75"></div>
                    <div className="bottom-dashcard placeholder bg-secondary w-75"></div>
                        </div>


                        <div className="dashcard-placeholder text-wrap col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3 placeholder-glow">
                        
                    <div className="dashcard-category placeholder bg-secondary w-25 rounded"></div>
                    
                    <div className="dashcard-img-div placeholder bg-secondary rounded"><img className="dashcard-img shadow-sm" src='...' alt="" /></div>
                    <div className="dashcard-title placeholder bg-secondary w-75"></div>
                    <div className="bottom-dashcard placeholder bg-secondary w-75"></div>
                        </div>



                        
                        </div>
                        </div>
                         }


                <div className="container-fluid px-2">
                <div className="dashcards d-flex flex-row justify-content-center row gy-0 gx-5">
               
                
                
                
                {blogTimeArr &&  [...blogTimeArr].reverse().map((blog, index, arr)=>{
                    return(
                        <>
                        <Link className="dashcard text-wrap col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3" key={blog._id} to={`/main/blogs/${blog._id}`}>
                        
                    <OverlayTrigger placement="top" overlay={<Tooltip>blog category</Tooltip>}>
                    <div className="dashcard-category">{blog.category}</div>
                    </OverlayTrigger>
                    
                    <div className="dashcard-img-div"><img className="dashcard-img shadow-sm" src={`${blog.mainPhotoPath}/${blog.mainPhotoName}`} alt="" /></div>
                    <h3 className="dashcard-title">{blog.title}</h3>
                    <div className="bottom-dashcard">
                    <div className="dashcard-author-info">
                        
                        <span className='dashcard-author'>{blog.author === username ? 'You': blog.author}<RxDot  className='dashcard-author-dot'/>  </span>
                        
                      
                        
                       
              
        <OverlayTrigger placement='top' overlay={<Tooltip>{blog.createdDashDate}</Tooltip>}>    

        <span className='dashcard-time'>{blog.time}</span>
        </OverlayTrigger>
   
                        


                    </div>
                    <OverlayTrigger placement='top' overlay={<Tooltip>like blog</Tooltip>}>
                    <button className='dashcard-like-btn'>
                    <AiOutlineHeart className="md-icon dashcard-like-btn" />
                    </button>
                    </OverlayTrigger>

                    
                    </div>
                
                        
                        </Link>
                        </> 
                    );
 
                })
              
            }










{/* 
                   <div className="dashcard col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3">
                    <OverlayTrigger placement="top" overlay={<Tooltip>blog category</Tooltip>}>
                    <div className="dashcard-category">News</div>
                    </OverlayTrigger>
                    
                    <div className="dashcard-img-div"><img className="dashcard-img shadow-sm" src="/img-2.webp" alt="" /></div>
                    <h3 className="dashcard-title">The Story Of Programming</h3>
                    <div className="bottom-dashcard">
                    <div className="dashcard-author-info">
                        
                        <span className='dashcard-author'>EbotProg<RxDot  className='dashcard-author-dot'/>  </span>
                    <OverlayTrigger placement='top' overlay={<Tooltip>1st January 2023</Tooltip>}>    
                        <span className='dashcard-time'>now</span>
                    </OverlayTrigger>
                    </div>
                    <OverlayTrigger placement='top' overlay={<Tooltip>like blog</Tooltip>}>
                    <button className='dashcard-like-btn'>
                    <AiOutlineHeart className="md-icon dashcard-like-btn" />
                    </button>
                    </OverlayTrigger>

                    
                    </div>
                </div>
                <div className="dashcard col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>blog category</Tooltip>}>
                    <div className="dashcard-category">Business</div>
                    </OverlayTrigger>                    <div className="dashcard-img-div"><img className="dashcard-img" src="/img-3.png" alt="" /></div>
                    <h3 className="dashcard-title">The Story Of Programming</h3>
                    <div className="bottom-dashcard">
                    <div className="dashcard-author-info">
                        
                        <span className='dashcard-author'>EbotProg<RxDot  className='dashcard-author-dot'/>  </span>
                    <OverlayTrigger placement='top' overlay={<Tooltip>1st January 2023</Tooltip>}>    
                        <span className='dashcard-time'>now</span>
                    </OverlayTrigger>
                    </div>
                    <OverlayTrigger placement='top' overlay={<Tooltip>like blog</Tooltip>}>
                    <button className='dashcard-like-btn'>
                    <AiOutlineHeart className="md-icon dashcard-like-btn" />
                    </button>
                    </OverlayTrigger>
                    </div>
                </div>
                <div className="dashcard col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>blog category</Tooltip>}>
                    <div className="dashcard-category">Technology</div>
                    </OverlayTrigger>
                    <div className="dashcard-img-div"><img className="dashcard-img" src="/img-5.webp" alt="" /></div>
                    <h3 className="dashcard-title">The Story Of Programming</h3>
                    <div className="bottom-dashcard">
                    <div className="dashcard-author-info">
                        
                        <span className='dashcard-author'>EbotProg<RxDot  className='dashcard-author-dot'/>  </span>
                    <OverlayTrigger placement='top' overlay={<Tooltip>1st January 2023</Tooltip>}>    
                        <span className='dashcard-time'>now</span>
                    </OverlayTrigger>
                    </div>
                    <OverlayTrigger placement='top' overlay={<Tooltip>like blog</Tooltip>}>
                    <button className='dashcard-like-btn'>
                    <AiOutlineHeart className="md-icon dashcard-like-btn" />
                    </button>
                    </OverlayTrigger>
                    </div>                
                    </div>
                <div className="dashcard col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>blog category</Tooltip>}>
                    <div className="dashcard-category">Sport</div>
                    </OverlayTrigger>
                    <div className="dashcard-img-div"><img className="dashcard-img" src="/img4.jpg" alt="" /></div>
                    <h3 className="dashcard-title">The Story Of Programming</h3>
                    <div className="bottom-dashcard">
                    <div className="dashcard-author-info">
                        
                        <span className='dashcard-author'>EbotProg<RxDot  className='dashcard-author-dot'/>  </span>
                    <OverlayTrigger placement='top' overlay={<Tooltip>1st January 2023</Tooltip>}>    
                        <span className='dashcard-time'>now</span>
                    </OverlayTrigger>
                    </div>
                    <OverlayTrigger placement='top' overlay={<Tooltip>like blog</Tooltip>}>
                    <button className='dashcard-like-btn'>
                    <AiOutlineHeart className="md-icon dashcard-like-btn" />
                    </button>
                    </OverlayTrigger>
                    </div>                </div>
                <div className="dashcard col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>blog category</Tooltip>}>
                    <div className="dashcard-category">Celebrity</div>
                    </OverlayTrigger>
                    <div className="dashcard-img-div"><img className="dashcard-img" src="/img-7.jfif" alt="" /></div>
                    <h3 className="dashcard-title">The Story Of Programming</h3>
                    <div className="bottom-dashcard">
                    <div className="dashcard-author-info">
                        
                        <span className='dashcard-author'>EbotProg<RxDot  className='dashcard-author-dot'/>  </span>
                    <OverlayTrigger placement='top' overlay={<Tooltip>1st January 2023</Tooltip>}>    
                        <span className='dashcard-time'>now</span>
                    </OverlayTrigger>
                    </div>
                    <OverlayTrigger placement='top' overlay={<Tooltip>like blog</Tooltip>}>
                    <button className='dashcard-like-btn'>
                    <AiOutlineHeart className="md-icon dashcard-like-btn" />
                    </button>
                    </OverlayTrigger>
                    </div>
                </div>
                <div className="dashcard col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>blog category</Tooltip>}>
                    <div className="dashcard-category">Science</div>
                    </OverlayTrigger>
                    <div className="dashcard-img-div"><img className="dashcard-img" src="/img-8.jpg" alt="" /></div>
                    <h3 className="dashcard-title">The Story Of Programming</h3>
                    <div className="bottom-dashcard">
                    <div className="dashcard-author-info">
                        
                        <span className='dashcard-author'>EbotProg<RxDot  className='dashcard-author-dot'/>  </span>
                    <OverlayTrigger placement='top' overlay={<Tooltip>1st January 2023</Tooltip>}>    
                        <span className='dashcard-time'>now</span>
                    </OverlayTrigger>
                    </div>
                    <OverlayTrigger placement='top' overlay={<Tooltip>like blog</Tooltip>}>
                    <button className='dashcard-like-btn'>
                    <AiOutlineHeart className="md-icon dashcard-like-btn" />
                    </button>
                    </OverlayTrigger>
                    </div>
                </div>
                <div className="dashcard col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>blog category</Tooltip>}>
                    <div className="dashcard-category">Entertainment</div>
                    </OverlayTrigger>
                    <div className="dashcard-img-div"><img className="dashcard-img" src="/img-9.jfif" alt="" /></div>
                    <h3 className="dashcard-title">The Story Of Programming</h3>
                    <div className="bottom-dashcard">
                    <div className="dashcard-author-info">
                        
                        <span className='dashcard-author'>EbotProg<RxDot  className='dashcard-author-dot'/>  </span>
                    <OverlayTrigger placement='top' overlay={<Tooltip>1st January 2023</Tooltip>}>    
                        <span className='dashcard-time'>now</span>
                    </OverlayTrigger>-6
                    <OverlayTrigger placement='top' overlay={<Tooltip>like blog</Tooltip>}>
                    <button className='dashcard-like-btn'>
                    <AiOutlineHeart className="md-icon dashcard-like-btn" />
                    </button>
                    </OverlayTrigger>
                    </div>
                </div>
                </div>

                <div className="dashcard col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3">
 <OverlayTrigger placement="top" overlay={<Tooltip>blog category</Tooltip>}>
                    <div className="dashcard-category">Style</div>
                    </OverlayTrigger>
                    <div className="dashcard-img-div"><img className="dashcard-img" src="/img-10.jpg" alt="" /></div>
                    <h3 className="dashcard-title">The Story Of Programming</h3>
                    <div className="bottom-dashcard">
                    <div className="dashcard-author-info">
                        
                        <span className='dashcard-author'>EbotProg<RxDot  className='dashcard-author-dot'/>  </span>
                    <OverlayTrigger placement='top' overlay={<Tooltip>1st January 2023</Tooltip>}>    
                        <span className='dashcard-time'>now</span>
                    </OverlayTrigger>
                    </div>
                    <OverlayTrigger placement='top' overlay={<Tooltip>like blog</Tooltip>}>
                    <button className='dashcard-like-btn'>
                    <AiOutlineHeart className="md-icon dashcard-like-btn" />
                    </button>
                    </OverlayTrigger>
                    </div>
                </div>
                <div className="dashcard col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3">
 <OverlayTrigger placement="top" overlay={<Tooltip>blog category</Tooltip>}>
                    <div className="dashcard-category">Food</div>
                    </OverlayTrigger>
                    <div className="dashcard-img-div"><img className="dashcard-img" src="/img-11.avif" alt="" /></div>
                    <h3 className="dashcard-title">The Story Of Programming</h3>
                    <div className="bottom-dashcard">
                    <div className="dashcard-author-info">
                        
                        <span className='dashcard-author'>EbotProg<RxDot  className='dashcard-author-dot'/>  </span>
                    <OverlayTrigger placement='top' overlay={<Tooltip>1st January 2023</Tooltip>}>    
                        <span className='dashcard-time'>now</span>
                    </OverlayTrigger>
                    </div>
                    <OverlayTrigger placement='top' overlay={<Tooltip>like blog</Tooltip>}>
                    <button className='dashcard-like-btn'>
                    <AiOutlineHeart className="md-icon dashcard-like-btn" />
                    </button>
                    </OverlayTrigger>
                    </div>
                </div>
                <div className="dashcard col-11 col-sm-10 col-md-6 col-lg-4 col-xl-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>blog category</Tooltip>}>
                    <div className="dashcard-category">Travel</div>
                    </OverlayTrigger>
                    <div className="dashcard-img-div"><img className="dashcard-img" src="/img-12.jpg" alt="" /></div>
                    <h3 className="dashcard-title">The Story Of Programming</h3>
                    <div className="bottom-dashcard">
                    <div className="dashcard-author-info">
                        
                        <span className='dashcard-author'>EbotProg<RxDot  className='dashcard-author-dot'/>  </span>
                    <OverlayTrigger placement='top' overlay={<Tooltip>1st January 2023</Tooltip>}>    
                        <span className='dashcard-time'>now</span>
                    </OverlayTrigger>
                    </div>
                    <OverlayTrigger placement='top' overlay={<Tooltip>like blog</Tooltip>}>
                    <button className='dashcard-like-btn'>
                    <AiOutlineHeart className="md-icon dashcard-like-btn" />
                    </button>
                    </OverlayTrigger>
                    </div>
                </div> */}

                </div>
                </div>
                {/* </Masonry> */}
                
        </div>
        
     );
}
 
export default Dashboard;