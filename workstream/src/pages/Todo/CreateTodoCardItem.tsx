import { useState } from 'react';
import test1 from '../../assets/img/example.jpg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface CreateTodoCardProps {
  onCancel: () => void;
}
const CreateTodoCardItem: React.FC<CreateTodoCardProps> = ({ onCancel }) => {
  const [newCardContent, setNewCardContent] = useState('');
  const cards = useSelector((state: RootState) => state.todo.cards);

  const handleNewCardContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCardContent(event.target.value);
  };

  const handleCancle = () => {
    if (!newCardContent.trim()) {
      onCancel();
    } else {
      const newCard = {
        id: (cards ? cards.length : 0) + 1,
        content: newCardContent,
        importance: '보통',
      };
      console.log('newCard', newCard);

      // dispatch(todoActions.addCardItem(newCard));
    }
  };
  return (
    <div className="_card">
      <span>
        <div className="todo-badge badge-success"></div>
        <i className="fa-solid fa-ellipsis"></i>
      </span>
      <div className="todo-content">
        <textarea
          placeholder="내용을 입력해 주세요"
          onChange={handleNewCardContentChange}
          onBlur={handleCancle}
          spellCheck={false}
          style={{ height: `${Math.max(25, newCardContent.split('\n').length * 20)}px` }}
        />
      </div>
      <div className="profile-box">
        <img src={test1} alt="" />
      </div>
    </div>
  );
};

export default CreateTodoCardItem;
