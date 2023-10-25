import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import 'quill/modules/toolbar';
import 'quill/themes/snow';

const TextEditor = () => {

  return (
    <ReactQuill 
      style={{ height: '600px'}}/>
  )
}

export default TextEditor