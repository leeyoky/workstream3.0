import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../store/Approval/approval-slice';
import 'quill-better-table/dist/quill-better-table.css';

interface TextEditorProps {
  textValue?: string | undefined; // TextEditor에 전달되는 내용
}

const TextEditor: React.FC<TextEditorProps> = ({ textValue }) => {
  const [text, setText] = useState(textValue || '');
  const dispatch = useDispatch();

  useEffect(() => {
    if (textValue !== undefined) {
      setText(textValue);
    }
  }, [textValue]);

  const textChangeHandler = (newText: string) => {
    setText(newText);
    dispatch(selectedActions.setContent(newText));
  }

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'align' ],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
    },

  };

  const formats = [
    'header', 'font', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'link', 'image', 'table',
  ];

  return (
    <ReactQuill
      style={{ height: '600px' }}
      value={text}
      onChange={textChangeHandler}
      modules={modules}
      formats={formats}
    />
  );
}

export default TextEditor;
