

// import { Grid } from '@mui/material';
import React, { useMemo, useRef} from 'react'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUpload  from '../services/image/ImageUpload';
// import { ErrorToast } from 'utils';
// import '../../assets/css/richTextEditor.css' // just for custom css

export default function FormikRichText({ id, label, value, onChange }) {

  const quillRef = useRef();
  

  var icons = Quill.import("ui/icons");
  icons["undo"] =  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
</svg>`;
  icons["redo"] =  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg>`;

 const myUndo = () => {
    let myEditor = quillRef.current.getEditor();
    return myEditor.history.undo();
}



const myRedo = () => {
    let myEditor = quillRef.current.getEditor();
    return myEditor.history.redo();
}



  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    console.log(editor)
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    console.log(1);


    input.onchange = async (e) => {
     e.preventDefault();
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        console.log(file);
        console.log(2);
        // const formData = new FormData();
        // formData.append("image", file);
        const res = await ImageUpload.upload(file); // upload data into server or aws or cloudinary
        console.log(res);
        const url = `/blogImages/${res.data.originalname}`;
        editor.insertEmbed(editor.getSelection().index, "image", url);
      }
    //    else {
    //     ErrorToast('You could only upload images.');
    //   }
    };
  }
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', "strike"],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        ['image', "link",],
        ['video'],
        [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }],
        ['undo'],
        ['redo']
      ],
      handlers: {
        image: imageHandler,
        undo: myUndo,
        redo: myRedo
      }
    },
  }), [])



  return (
    <>
      {/* <Grid container>
        <Grid item md={3} xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', pr: 2 }}>
          <label htmlFor={id} className='text-end'>{label} :</label>
        </Grid>
        <Grid item md={9} xs={12}> */}

          <ReactQuill name="content" className="react-quill" theme="snow" ref={quillRef} value={value} modules={modules} onChange={value=> onChange(3, null,  'content' , value)} />
          {/* <div id="editorcontainer-container" >
   <div id="editorcontainer">
     <div id="editor"></div>
   </div>
</div> */}

          
        {/* </Grid>
      </Grid> */}
    </>

  )
}