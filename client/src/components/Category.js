import { useState} from "react";

const Category = ({onChange, value}) => {

  const [newCategShown, setNewCategShown] = useState(false);

  function hideOrShowNewCategory(val){
    if(val === 'other'){
      setNewCategShown(true);
    }else{
      setNewCategShown(false);
    }
console.log('hello', val)
  
  }

  const options = [
    {
      label: 'Category',
      value: 'Category'
    },
    {
      label: 'Agriculture',
      value: 'agriculture'
    },    
    {
      label: 'News',
      value: 'news'
    },
    {
      label: 'Entertainment',
      value: 'entertainment'
    },
    {
      label: 'Health',
      value: 'health'
    },
    {
      label: 'Science',
      value: 'science'
    },
    {
      label: 'Other',
      value: 'other'
    }
  ]


  const [categOtherValue, setCategOtherValue] = useState(null);
  const [categOptions, setCategOptions] = useState(options);
  function addOtherCateg(e){

  options.push({label: categOtherValue, value: categOtherValue})
  setCategOptions(options);
  onChange(2, categOtherValue);
  setNewCategShown(false);
  }

  // function displayNewCategory(){
  // setNewCategShown(true);
  // }




    return ( 
      <div className={newCategShown ? 'form-select-outer-div w-100': 'w-100'}>
        <select name="category" className="form-select mb-3" value={value} onChange={(e)=> {onChange(2, null, e.target.name, e.target.value); hideOrShowNewCategory(e.target.value)}} >
                             
                             {categOptions.map((option, index)=>(
                              <option key={index} value={option.value} onFocus={()=>console.log('hi')} >{option.label}</option>
                             ))}
                           </select>
         <div className={newCategShown ? 'form-floating mb-3': 'd-none'}>
          <input 
          value={categOtherValue}
          onChange={(e)=> setCategOtherValue(e.target.value)}
            className="form-control" type="text" placeholder="Enter your name..." />
             <label >Enter blog category here</label>
             </div>
             <button type='button' onClick={addOtherCateg} className={newCategShown ? "btn btn-primary btn-sm": 'd-none'}>choose category</button>
      </div>
     );
}
 
export default Category;