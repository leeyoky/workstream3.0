import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './TextEditor.css';
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
  const isEdit = useSelector((state: RootState) => state.approval.isEditMode);

  useEffect(() => {
    if (textValue !== undefined) {
      setEditorData(textValue);
    }
  }, [textValue, dispatch]);

  const handleChange = (_event: any, editor: any) => {
    const data = editor.getData();
    const newLength = data.length;

    console.log('newLength', newLength);

    if (newLength > 2000) {
      alert('내용은 2000자를 초과할 수 없습니다.');
      const trimmedData = data.substring(0, 2000);
      editor.setData(trimmedData);
      dispatch(selectedActions.setContent(trimmedData));
      return;
    }

    dispatch(selectedActions.setContent(data));

    const editable = editor.ui.view.editable;

    if (editable && editable.clientHeight > 500) {
      // 에디터에서 마지막 엔터를 찾아서 제거
      editor.model.change((writer: any) => {
        const lastPosition = editor.model.document.selection.getLastPosition();
        writer.remove(writer.createRangeOn(lastPosition), 'end');
      });
    }
  };

  const handleLimitHeight = (editor: any) => {
    const document = editor.editing.view.document;

    document.on('change:data', () => {
      const body = document.getRoot().getDocument().getBody();

      const isOverflowed = body.scrollHeight > body.clientHeight;
      console.log('body.scrollHeight', body.scrollHeight);

      if (isOverflowed) {
        // 에디터에서 마지막 엔터를 찾아서 제거
        editor.model.change((writer: any) => {
          const lastPosition = editor.model.document.selection.getLastPosition();
          if (lastPosition) {
            writer.remove(writer.createRangeOn(lastPosition), 'end');
          }
        });
      }
    });
  };

  useEffect(() => {
    setEditorData(textValue || ''); // CKEditor의 setData 메서드를 통해 초기값 업데이트
  }, [textValue]);

  const editorConfig = isEdit
    ? {
        language: 'ko',
        toolbar: {
          items: [
            'undo',
            'redo',
            'heading',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'alignment',
            'insertTable',
            'numberedList',
            'bulletedList',
            'indent',
            'outdent',
            '|',
            'link',
            'blockQuote',
            'imageUpload',
          ],
        },
      }
    : {
        language: 'ko',
        isReadOnly: true,
        toolbar: [],
      };

  useEffect(() => {
    /* content 윗 본문 border 삭제 */
    const toolbarElement = document.querySelector('.ck.ck-toolbar') as HTMLElement;
    if (toolbarElement && !isEdit) {
      toolbarElement.style.border = 'none';
    }

    /**
     * @description TextEditor Border를 없애는 코드였으나 사용하지 않기로 함
     * @date 2023/12/15
     */

    // .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused)의 border를 없애기
    // const editableElement = document.querySelector(
    //   '.ck.ck-editor__main > .ck-editor__editable:not(.ck-focused)',
    // ) as HTMLElement;
    // if (editableElement && !isEdit) {
    //   editableElement.style.borderColor = 'transparent';
    // }
  });

  return (
    <CKEditor
      key={isEdit ? 'editable' : 'read-only'} // 여기서 key를 추가
      editor={ClassicEditor}
      data={editorData}
      onChange={handleChange as any}
      onReady={editor => {
        handleLimitHeight(editor);
      }}
      config={editorConfig}
      disabled={isEdit ? false : true}
    />
  );
};

export default TextEditor;
