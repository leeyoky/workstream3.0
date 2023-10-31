import { useState } from "react";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from "react-redux";
import { textEditorActions } from "../store/textEditor-slice";

const TextEditor = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  dispatch(textEditorActions.setText(text));

  return (
    <ReactQuill 
      style={{ height: '600px'}}
      value={text}
      onChange={setText}/>
  )
}

export default TextEditor