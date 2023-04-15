import {AiOutlineDoubleLeft, AiOutlineDoubleRight} from 'react-icons/ai';
import { useRef, useState } from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const CategoryScroll = ({handleCategChange, categSearch, categStates}) => {

   let categs = useRef();

   


   //ref of all categ buttons
   let allBtnRef = useRef()
   let foodBtnRef = useRef()
   let businessBtnRef = useRef()
   let technologyBtnRef = useRef()
   let sportBtnRef = useRef()
   let celebrityBtnRef = useRef()
   let scienceBtnRef = useRef()
   let entertainmentBtnRef = useRef()
   let styleBtnRef = useRef()
   let travelBtnRef = useRef()
   let agricultureBtnRef = useRef()
   let newsBtnRef = useRef()

//    function clickCategBtn(categ){
//     if(categ === 'all'){
//     // allBtnRef.current.style.backgroundColor = '#29323C';
//     // allBtnRef.current.style.color = '#ffffff';

//     console.log('all categ')
//     }
//     else if(categ === 'food'){
//     // foodBtnRef.current.style.backgroundColor = '#29323C';
//     // foodBtnRef.current.style.color = '#ffffff';

//     console.log('food categ')
//     }
//     else if(categ === 'business'){
//     // businessBtnRef.current.style.backgroundColor = '#29323C';
//     // businessBtnRef.current.style.color = '#ffffff';

//     console.log('business categ')
//     }
//     else if(categ === 'technology'){
//     // technologyBtnRef.current.style.backgroundColor = '#29323C';
//     // technologyBtnRef.current.style.color = '#ffffff';

//     console.log('business categ')
//     }
//     else if(categ === 'sport'){
//     // sportBtnRef.current.style.backgroundColor = '#29323C';
//     // sportBtnRef.current.style.color = '#ffffff';

//     console.log('sport categ')
//     }
//     else if(categ === 'celebrity'){
//     // celebrityBtnRef.current.style.backgroundColor = '#29323C';
//     // celebrityBtnRef.current.style.color = '#ffffff';

//     console.log('celebrity categ')
//     }
//     else if(categ === 'science'){
//     // scienceBtnRef.current.style.backgroundColor = '#29323C';
//     // scienceBtnRef.current.style.color = '#ffffff';

//     console.log('science categ')
//     }
//     else if(categ === 'entertainment'){
//     // entertainmentBtnRef.current.style.backgroundColor = '#29323C';
//     // entertainmentBtnRef.current.style.color = '#ffffff';

//     console.log('entertainment categ')
//     }
//     else if(categ === 'style'){
//     // styleBtnRef.current.style.backgroundColor = '#29323C';
//     // styleBtnRef.current.style.color = '#ffffff';

//     console.log('style categ')
//     }
//     else if(categ === 'travel'){
//     // travelBtnRef.current.style.backgroundColor = '#29323C';
//     // travelBtnRef.current.style.color = '#ffffff';

//     console.log('travel categ')
//     }
//     else if(categ === 'agriculture'){
//     // agricultureBtnRef.current.style.backgroundColor = '#29323C';
//     // agricultureBtnRef.current.style.color = '#ffffff';

//     console.log('agriculture categ')
//     }
//     else if(categ === 'news'){
//     // newsBtnRef.current.style.backgroundColor = '#29323C';
//     // newsBtnRef.current.style.color = '#ffffff';

//     console.log('news categ')
//     }
   
//    }


    function scrollLeft(){

        categs.current.scrollBy(350, 0);
    }

    function scrollRight(){
        categs.current.scrollBy(-350, 0);

    }

    return ( 
        <div className="categ-scroll">
        <OverlayTrigger placement='top' overlay={<Tooltip>scroll left</Tooltip>}>
        <button className='filter-btn left-filter-btn'>
        <AiOutlineDoubleLeft className='lg-icon  ' onClick={scrollRight} />
        </button>
        </OverlayTrigger>
            
            <div className="cover">
            <div className="categs" ref={categs}>
                <div ref={allBtnRef} onClick={()=> {handleCategChange(0,'all'); categSearch()}} className={categStates[0]['all'] ? 'categ categ-active' : 'categ'}>All</div>
                <div ref={foodBtnRef} onClick={()=> {handleCategChange(1,'food'); categSearch()}} className={categStates[1]['food'] ? 'categ categ-active' : 'categ'}>Food</div>
                <div ref={newsBtnRef} onClick={()=> {handleCategChange(2,'news'); categSearch()}} className={categStates[2]['news'] ? 'categ categ-active' : 'categ'}>News</div>
                <div ref={businessBtnRef} onClick={()=> {handleCategChange(3,'business'); categSearch()}} className={categStates[3]['business'] ? 'categ categ-active' : 'categ'}>Business</div>
                <div ref={technologyBtnRef} onClick={()=> {handleCategChange(4,'technology'); categSearch()}} className={categStates[4]['technology'] ? 'categ categ-active' : 'categ'}>Technology</div>
                <div ref={sportBtnRef} onClick={()=> {handleCategChange(5,'sport'); categSearch()}} className={categStates[5]['sport'] ? 'categ categ-active' : 'categ'}>Sport</div>
                <div ref={celebrityBtnRef} onClick={()=> {handleCategChange(6,'celebrity'); categSearch()}} className={categStates[6]['celebrity'] ? 'categ categ-active' : 'categ'}>Celebrity</div>
                <div ref={scienceBtnRef} onClick={()=> {handleCategChange(7,'science'); categSearch()}} className={categStates[7]['science'] ? 'categ categ-active' : 'categ'}>Science</div>
                <div ref={entertainmentBtnRef} onClick={()=> {handleCategChange(8,'entertainment'); categSearch()}} className={categStates[8]['entertainment'] ? 'categ categ-active' : 'categ'}>Entertainment</div>
                <div ref={styleBtnRef} onClick={()=> {handleCategChange(9,'style'); categSearch()}} className={categStates[9]['style'] ? 'categ categ-active' : 'categ'}>Style</div>
                <div ref={travelBtnRef} onClick={()=> {handleCategChange(10,'travel'); categSearch()}} className={categStates[10]['travel'] ? 'categ categ-active' : 'categ'}>Travel</div>
                <div ref={agricultureBtnRef} onClick={()=> {handleCategChange(11,'agriculture'); categSearch()}} className={categStates[11]['agriculture'] ? 'categ categ-active' : 'categ'}>Agriculture</div>
                <div className="categ">Travel</div>
                <div className="categ">Travel</div>
                <div className="categ">Travel</div>
                <div className="categ">Travel</div>
                <div className="categ">Travel</div>
                <div className="categ">Travel</div>
                <div className="categ">Travel</div>
                <div className="categ">Travel</div>
                <div className="categ">Travel</div>
            </div>
            </div>
            <OverlayTrigger placement='top' overlay={<Tooltip>scroll right</Tooltip>}>
            <button className='filter-btn right-filter-btn'>
            <AiOutlineDoubleRight className='lg-icon' onClick={scrollLeft} />

            </button>
            
            </OverlayTrigger>
        </div>
     );
}
 
export default CategoryScroll;