
const MainTitle = ({onChange, value}) => {


    return ( 
        <div className="form-floating mb-3 w-100">
          <input 
            name="title"
            value={value}
            onChange={(e) => onChange(0, null, e.target.name, e.target.value)}
            className="form-control" type="text" placeholder="Enter your name..." />
             <label >Main Title</label>
                                
             </div>
     );
}
 
export default MainTitle;