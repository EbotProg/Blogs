

import FormikRichText from '../components/TextEditor';
import React, { useState } from 'react'
// import {CgRedo, CgUndo} from 'react-icons/cg';
import MainTitle from '../components/MainTitle';
import PhotoUpload from '../components/PhotoUpload';
import Category from '../components/Category';
import axios from '../api/AxiosInstance'

const Create = () => {
    const [inputFields, setInputFields] = useState([
      {title: ''},
      {photo: ''},
      {category: 'Category'},
      {content: ''}
    ])

//show date when blog was created
    let date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let seconds = date.getSeconds();
    let millisecs = Math.ceil(date.getMilliseconds()/10)
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year  = date.getFullYear();

    //function to generate the time from when it was added
    // function generateDate() {

    // }

    const handleSubmit = (e)=>{
      e.preventDefault();
      console.log('form submitted');
      
      //function to capitalize first letter of each word in title
      let arr = inputFields[0]['title'].split(" ");
      for(let i = 0; i < arr.length; i++){
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }

      let title = arr.join(" ");

      //change date from numbers to words
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      
      function convertDate(day, month, year) {
        return `${day} ${months[Number(month)-1]} ${year}`;
      }

      let username = JSON.parse(localStorage.getItem('user'));
      console.log('username creatjs', username);
      let formData = new FormData();
      formData.append("title", title)
      formData.append("file", inputFields[1]['photo'], inputFields[1]['photo'].filename)
      formData.append("category", inputFields[2]['category'])
      formData.append("content", inputFields[3]['content'])
      formData.append("author", username)
      formData.append("day", day)
      formData.append("month", month)
      formData.append("year", year)
      formData.append("seconds", seconds)
      formData.append("milliseconds", millisecs)
      formData.append("hours", hours)
      formData.append("minutes", mins)
      formData.append("createdSlashDate", `${day}/${month}/${year}`)
      formData.append("createdDashDate", convertDate(day, month, year))
      formData.append("createdTime", `${hours}:${mins}:${seconds}.${millisecs}`)
      // formData.append("likes", 0)
      // formData.append("dislikes", 0)
      // formData.append("likesArr", null)
      // formData.append("dislikesArr", null)

      // const submitObj = {
      //   title: inputFields[0]['title'],
      //   photo: inputFields[1]['photo'],
      //   category: inputFields[2]['category'],
      //   content: inputFields[3]['content'],
      //   author: 'EbotProg',
      //   createdSlashDate: `${day}/${month}/${year}`,
      //   createdDashDate: `${day}-${month}-${year}`,
      //   createdTime: `${hours}:${mins}:${seconds}.${millisecs}`
      // }

    console.log(formData.entries());
    return axios.post("/create-blog", formData ,{
      headers: {"content-type": "multipart/form-data"}
    });
     
    }


    const handleFormChange = (index , value, targetName, targetValue) => {
      let data = [...inputFields];
      if(value != null){
      data[index]['category'] = value;
      }else{
        data[index][targetName] = targetValue;
      }
      setInputFields(data);
      console.log('bloginputs',inputFields)
   }

    return (
        <>

<div className="create">

             <div className="row justify-content-center mb-5 w-100 h-100">

                 <div className="col-11 col-sm-11 col-md-11 col-lg-10 col-xl-9 d-flex flex-column align-items-center">
                 <h2 className="form-title mb-3">Create New Blog</h2>
                 <form id="contact-form" className="d-flex flex-column align-items-center">
                
                 <MainTitle onChange={handleFormChange} value={inputFields[0].title} className="w-100"/>
                 
                 <PhotoUpload onChange={handleFormChange} value={inputFields[1].photo} className="w-100" />

                 <Category onChange={handleFormChange} value={inputFields[2].category} />

                 <FormikRichText
                id="content"
                name="content"
                label="Content"
                onChange={handleFormChange}
                value={inputFields[3].content}
            />




                {/* <EditorBox theme="snow" /> */}
                 <button type='submit' onClick={handleSubmit} className="btn btn-sm btn-outline-primary">Create</button>
                
                </form>
                
                </div>
            </div>

        </div>
          

          
        </>
    )
}

export default Create;