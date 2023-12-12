import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';

import './TextEditor.css'
import { useDispatch } from 'react-redux';
import { selectedActions } from '../store/Approval/approval-slice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface TextEditorProps {
  textValue?: string | undefined; // TextEditor에 전달되는 내용
}

const TextEditor: React.FC<TextEditorProps> = ({ textValue }) => {
  const [editorData, setEditorData] = useState(textValue || '');
  const dispatch = useDispatch();
  const isEdit = useSelector((state:RootState) => state.approval.isEditMode);

  useEffect(()=> {
    if(textValue !== undefined ) {
      setEditorData(textValue);
    }
  }, [textValue, dispatch]);

  const handleChange = (_event: any, editor: any) => {
    const data = editor.getData();
    dispatch(selectedActions.setContent(data));
  };

  useEffect(() => {
    setEditorData(textValue || ''); // CKEditor의 setData 메서드를 통해 초기값 업데이트
  }, [textValue]);

  const editorConfig = isEdit
    ? {
        language: 'ko',
      }
    : {
        language: 'ko',
        isReadOnly: true,
        toolbar: [],
      };

  useEffect(() => {
    const toolbarElement = document.querySelector('.ck.ck-toolbar') as HTMLElement;
    if (toolbarElement && !isEdit) {
      toolbarElement.style.border = 'none';
    }
  
    // .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused)의 border를 없애기
    const editableElement = document.querySelector('.ck.ck-editor__main > .ck-editor__editable:not(.ck-focused)') as HTMLElement;
    if (editableElement && !isEdit) {
      editableElement.style.borderColor = 'transparent';
    }
  });

  return (
    <CKEditor
      key={isEdit ? 'editable' : 'read-only'} // 여기서 key를 추가
      editor={ClassicEditor}
      data={editorData}
      onChange={handleChange as any}
      config={editorConfig}
      disabled={isEdit? false : true}
      />
  );
}

export default TextEditor;
