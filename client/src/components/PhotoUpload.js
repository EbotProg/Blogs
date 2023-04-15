import { BsCloudUpload } from 'react-icons/bs';
import { useRef } from 'react';

const PhotoUpload = ({onChange, value}) => {

   const fileInputRef = useRef();

   function selectFile(){
   fileInputRef.current.click();
   }

    return ( 
        <div onClick={selectFile} className="photo-upload-btn d-flex flex-column align-items-center justify-content-center mb-3 w-100">
                           <BsCloudUpload className="xxl-icon" />
                           <p>Browse to upload photo</p>
                           <p>{value.name}</p>
                           <input 
                           name="photo"
                           ref={fileInputRef} 
                           onChange={(e) => 
                            {onChange(1, null, e.target.name, e.target.files[0]);
                             value = e.target.files[0]                 
                             }}
                           type="file" className="d-none" />
                           </div>
     );
}
 
export default PhotoUpload;